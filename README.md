# Hema Priya — Portfolio

A personal portfolio site with a video intro hero, resume-driven content sections, light/dark mode, and an AI chat widget that answers visitor questions about Hema's background.

## Structure

```
Portfolio/
  frontend/   Next.js + TypeScript + Tailwind CSS (the site)
  backend/    FastAPI + Anthropic Claude API (the chatbot)
```

## Frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local   # set API_URL if backend isn't on localhost:8000
npm run dev
```

Open http://localhost:3000.

**Adding the real intro video:** drop your video file at `frontend/public/videos/intro.mp4`. Until then, the hero shows your photo as a poster frame with a video player that has no source.

**Colors / theme:** all colors live as CSS variables in `frontend/src/app/globals.css` (dusty teal accent, light/dark variants). Edit there to retheme.

**How the chat widget and contact form reach the backend:** the browser never calls the FastAPI backend directly. It calls same-origin Next.js routes (`frontend/src/app/api/chat/route.ts` and `.../api/contact/route.ts`), which run server-side and forward the request to the real backend URL read from the private `API_URL` env var. This keeps the backend URL out of the browser-visible JS bundle entirely (unlike a `NEXT_PUBLIC_*` var, which gets baked into the static bundle at build time) and avoids needing CORS between Vercel and Render, since the only cross-origin call is server-to-server.

**Resume content:** all text (experience, skills, education, certifications) lives in `frontend/src/lib/resumeData.ts` — edit that file to update the site without touching components.

## Backend (chatbot)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # add your ANTHROPIC_API_KEY
uvicorn app.main:app --reload --port 8000
```

The chatbot answers only from the resume context baked into `backend/app/resume_context.py` (RAG-lite — no hallucinated job history). Get an API key at https://console.anthropic.com.

- `CLAUDE_MODEL` env var controls the model (default `claude-opus-4-8`). For a cheaper/faster bot on a low-traffic personal site, set it to `claude-haiku-4-5`.
- `ALLOWED_ORIGINS` env var is a comma-separated list of allowed frontend origins for CORS.

## Deploying

**Frontend → Vercel:** import the repo, set the root directory to `frontend`, and add the env var `API_URL` (no `NEXT_PUBLIC_` prefix — it's read server-side only, in the `/api/*` routes) pointing at your deployed backend URL. Changing it later requires a redeploy to take effect — that's a Vercel platform behavior for all env vars, not specific to this one.

**Backend → Render:** `backend/render.yaml` is a ready-to-use Render blueprint. Push the repo, create a new Blueprint on Render pointed at `backend/`, and set the `ANTHROPIC_API_KEY` and `ALLOWED_ORIGINS` (your Vercel URL) secrets when prompted.

### Connecting the `hemapriya.tech` domain (GoDaddy)

1. Deploy `frontend/` to Vercel first (import repo → root directory `frontend`) if you haven't already.
2. In the Vercel project → **Settings → Domains**, add `hemapriya.tech` and `www.hemapriya.tech`.
3. Vercel shows the DNS records it needs. In GoDaddy → **My Products → DNS** for `hemapriya.tech`, add:
   - `A` record, host `@`, value `76.76.21.21` (Vercel's apex IP — use whatever Vercel displays, it can change)
   - `CNAME` record, host `www`, value `cname.vercel-dns.com`
   - Delete GoDaddy's default parked-domain `A`/`CNAME` records for `@`/`www` first, or the new ones will conflict.
4. DNS propagation can take a few minutes to a few hours. Vercel auto-issues an SSL cert once it verifies the records.
5. Deploy `backend/` to Render, then optionally give it a subdomain too: add a `CNAME` record `api` → `<your-render-service>.onrender.com` in GoDaddy, and add `api.hemapriya.tech` as a custom domain in Render's dashboard.
6. Update env vars to match:
   - Vercel: `API_URL=https://api.hemapriya.tech`
   - Render: `ALLOWED_ORIGINS=https://hemapriya.tech,https://www.hemapriya.tech` (mostly a formality now — see note above on how the two talk to each other)
