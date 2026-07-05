# ToolsWorld Backend

An **independent** API service for the handful of ToolsWorld tools that genuinely
need a server. The main site stays a static export; only these tools call this API.

## Endpoints

| Tool | Endpoint | Works out of the box? |
|------|----------|-----------------------|
| URL Shortener | `POST /api/shorten`, `GET /:code` | ✅ Yes (file-backed store) |
| Grammar Checker | `POST /api/grammar` | ✅ Yes (LanguageTool free API; self-host for production) |
| Paraphraser | `POST /api/paraphrase` | ⚙️ Needs an LLM provider (`LLM_API_URL` + `LLM_API_KEY`) |
| Plagiarism Checker | `POST /api/plagiarism` | ⚙️ Needs a search API (`SEARCH_API_URL` + `SEARCH_API_KEY`) |

Paraphrase and plagiarism return a clear `503` until you configure a provider —
by design. There is no honest fully-local version of those two.

## Run locally
```bash
cd backend
cp .env.example .env      # edit as needed
npm install
npm start                 # -> http://localhost:8787
```

## Connect the frontend
Set `NEXT_PUBLIC_API_BASE` for the Next.js app to this service's URL, e.g.
`NEXT_PUBLIC_API_BASE=https://api.yourdomain.com`. Tools that need the backend
read this; if it's unset, they show a friendly "not configured" message.

Also add the backend origin to the frontend CSP `connect-src` in `public/_headers`.

## Deploy
Any Node host works (Render, Railway, Fly.io, a VPS). The store is a JSON file;
for scale, swap `src/store.js` for Redis / Cloudflare KV / Postgres — same interface.
