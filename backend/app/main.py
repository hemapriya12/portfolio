import json
import os
from datetime import datetime, timezone
from typing import Optional

import gspread
import requests
from anthropic import Anthropic, APIConnectionError, APIStatusError
from dotenv import load_dotenv
from fastapi import BackgroundTasks, FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from google.oauth2.service_account import Credentials
from pydantic import BaseModel

from .resume_context import SYSTEM_PROMPT

load_dotenv()

app = FastAPI(title="Hema Priya Portfolio Chatbot")

allowed_origins = os.environ.get("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_methods=["POST"],
    allow_headers=["*"],
)

client = Anthropic()
MODEL = os.environ.get("CLAUDE_MODEL", "claude-opus-4-8")
MAX_HISTORY_MESSAGES = 20

_questions_sheet = None


def _get_questions_sheet():
    global _questions_sheet
    if _questions_sheet is not None:
        return _questions_sheet

    creds_json = os.environ.get("GOOGLE_SERVICE_ACCOUNT_JSON")
    sheet_id = os.environ.get("GOOGLE_SHEET_ID")
    if not creds_json or not sheet_id:
        return None

    creds = Credentials.from_service_account_info(
        json.loads(creds_json),
        scopes=["https://www.googleapis.com/auth/spreadsheets"],
    )
    _questions_sheet = gspread.authorize(creds).open_by_key(sheet_id).sheet1
    return _questions_sheet


def _lookup_location(ip: str) -> str:
    try:
        resp = requests.get(
            f"http://ip-api.com/json/{ip}",
            params={"fields": "status,country,city"},
            timeout=3,
        )
        data = resp.json()
        if data.get("status") == "success":
            return ", ".join(p for p in (data.get("city"), data.get("country")) if p)
    except Exception:
        pass
    return "Unknown"


def _parse_user_agent(user_agent: str) -> str:
    ua = user_agent.lower()

    if "edg" in ua:
        browser = "Edge"
    elif "firefox" in ua:
        browser = "Firefox"
    elif "chrome" in ua and "chromium" not in ua:
        browser = "Chrome"
    elif "safari" in ua and "chrome" not in ua:
        browser = "Safari"
    else:
        browser = "Unknown browser"

    if "iphone" in ua or "ipad" in ua:
        os_name = "iOS"
    elif "android" in ua:
        os_name = "Android"
    elif "mac os" in ua:
        os_name = "macOS"
    elif "windows" in ua:
        os_name = "Windows"
    elif "linux" in ua:
        os_name = "Linux"
    else:
        os_name = "Unknown OS"

    return f"{browser} on {os_name}"


def _log_question(question: str, conversation_id: str, ip: str, user_agent: str) -> None:
    try:
        sheet = _get_questions_sheet()
        if sheet is None:
            return
        sheet.append_row([
            datetime.now(timezone.utc).isoformat(),
            question,
            conversation_id,
            _lookup_location(ip),
            _parse_user_agent(user_agent),
        ])
    except Exception:
        pass  # a logging failure should never break the chat response


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessage]
    conversation_id: Optional[str] = None


@app.post("/chat")
def chat(request: ChatRequest, http_request: Request, background_tasks: BackgroundTasks):
    history = [m for m in request.messages if m.role in ("user", "assistant")]
    while history and history[0].role != "user":
        history.pop(0)
    history = history[-MAX_HISTORY_MESSAGES:]

    if not history:
        raise HTTPException(status_code=400, detail="No user message provided")

    if history[-1].role == "user":
        forwarded_for = http_request.headers.get("x-forwarded-for", "")
        client_host = http_request.client.host if http_request.client else ""
        ip = forwarded_for.split(",")[0].strip() or client_host
        user_agent = http_request.headers.get("user-agent", "")
        background_tasks.add_task(
            _log_question,
            history[-1].content,
            request.conversation_id or "unknown",
            ip,
            user_agent,
        )

    try:
        response = client.messages.create(
            model=MODEL,
            max_tokens=512,
            system=SYSTEM_PROMPT,
            messages=[{"role": m.role, "content": m.content} for m in history],
        )
    except APIStatusError as e:
        raise HTTPException(status_code=502, detail=f"Claude API error: {e.message}")
    except APIConnectionError:
        raise HTTPException(status_code=502, detail="Could not reach Claude API")

    reply = "".join(block.text for block in response.content if block.type == "text")
    return {"reply": reply}


class ContactRequest(BaseModel):
    name: str
    email: str
    message: str
    company_website: Optional[str] = None  # honeypot — real visitors leave this blank


@app.post("/contact")
def contact(request: ContactRequest):
    if request.company_website:
        # Honeypot tripped — silently accept without sending anything.
        return {"status": "ok"}

    if not request.name.strip() or not request.email.strip() or not request.message.strip():
        raise HTTPException(status_code=400, detail="Name, email, and message are required")

    resend_api_key = os.environ.get("RESEND_API_KEY")
    if not resend_api_key:
        raise HTTPException(status_code=500, detail="Email sending is not configured")

    contact_to = os.environ.get("CONTACT_TO_EMAIL", "hemapriya12t@gmail.com")
    resend_from = os.environ.get("RESEND_FROM", "Portfolio Contact Form <onboarding@resend.com>")

    try:
        resp = requests.post(
            "https://api.resend.com/emails",
            headers={
                "Authorization": f"Bearer {resend_api_key}",
                "Content-Type": "application/json",
            },
            json={
                "from": resend_from,
                "to": [contact_to],
                "reply_to": request.email,
                "subject": f"Portfolio contact from {request.name}",
                "text": f"From: {request.name} <{request.email}>\n\n{request.message}",
            },
            timeout=10,
        )
        resp.raise_for_status()
    except requests.RequestException as e:
        raise HTTPException(status_code=502, detail="Could not send the message") from e

    return {"status": "ok"}


@app.get("/health")
def health():
    return {"status": "ok"}
