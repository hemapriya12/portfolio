import json
import os
import smtplib
from datetime import datetime, timezone
from email.message import EmailMessage
from typing import Optional

import gspread
from anthropic import Anthropic, APIConnectionError, APIStatusError
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
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


def _log_question(question: str) -> None:
    try:
        sheet = _get_questions_sheet()
        if sheet is None:
            return
        sheet.append_row([datetime.now(timezone.utc).isoformat(), question])
    except Exception:
        pass  # a logging failure should never break the chat response


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessage]


@app.post("/chat")
def chat(request: ChatRequest):
    history = [m for m in request.messages if m.role in ("user", "assistant")]
    while history and history[0].role != "user":
        history.pop(0)
    history = history[-MAX_HISTORY_MESSAGES:]

    if not history:
        raise HTTPException(status_code=400, detail="No user message provided")

    if history[-1].role == "user":
        _log_question(history[-1].content)

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

    smtp_user = os.environ.get("SMTP_USER")
    smtp_password = os.environ.get("SMTP_PASSWORD")
    if not smtp_user or not smtp_password:
        raise HTTPException(status_code=500, detail="Email sending is not configured")

    smtp_host = os.environ.get("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.environ.get("SMTP_PORT", "587"))
    contact_to = os.environ.get("CONTACT_TO_EMAIL", smtp_user)

    email_msg = EmailMessage()
    email_msg["Subject"] = f"Portfolio contact from {request.name}"
    email_msg["From"] = smtp_user
    email_msg["To"] = contact_to
    email_msg["Reply-To"] = request.email
    email_msg.set_content(
        f"From: {request.name} <{request.email}>\n\n{request.message}"
    )

    try:
        with smtplib.SMTP(smtp_host, smtp_port, timeout=10) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(email_msg)
    except (smtplib.SMTPException, OSError) as e:
        raise HTTPException(status_code=502, detail="Could not send the message") from e

    return {"status": "ok"}


@app.get("/health")
def health():
    return {"status": "ok"}
