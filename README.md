# Sam's Space — Refactored 🌟

Modern rebuild of [samvortex.github.io](https://samvortex.github.io) using **Astro** + **Cloudflare Pages**.

## Stack

- **Framework:** Astro 6 (SSR mode)
- **Adapter:** @astrojs/cloudflare
- **Styling:** Pure CSS (no framework, no old jQuery)
- **Backend:** Supabase (existing database)
- **Hosting:** Cloudflare Pages

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home |
| `/hub` | Discussion Hub (real-time chat) |
| `/projects` | Project showcase |
| `/about` | About Sam |
| `/contact` | Contact form |

## Local Development

```bash
npm install
npm run dev      # Dev server at localhost:4321
npm run build    # Production build
npm run preview  # Preview production build
```

## Supabase Setup

The site connects to an existing Supabase project (`babkatqycaigexyjnlqv`).

Required environment variables (set in Cloudflare Pages dashboard):

| Variable | Value |
|----------|-------|
| `SUPABASE_URL` | `https://babkatqycaigexyjnlqv.supabase.co` |
| `PUBLIC_SUPABASE_ANON_KEY` | *(use the JWT anon key from Supabase Dashboard → Settings → API)* |

## Deployment → Cloudflare Pages

### Step 1: Push to GitHub

```bash
cd ~/Documents/Projects/samvortex-refactor
git init
git add .
git commit -m "Initial commit: Astro refactor"
```

Then create a new repo on GitHub and push:

```bash
git remote add origin git@github.com:Samvortex/samvortex-refactor.git
git branch -M main
git push -u origin main
```

*(Or use HTTPS if SSH key not set up: `git remote add origin https://github.com/Samvortex/samvortex-refactor.git`)*

### Step 2: Connect to Cloudflare Pages

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Pages**
2. Click **Create a project** → **Connect to Git**
3. Select **GitHub** → Authorize Cloudflare
4. Choose `samvortex-refactor` repo
5. **Build settings:**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/`
6. **Environment variables** (under Advanced):
   - `SUPABASE_URL` = `https://babkatqycaigexyjnlqv.supabase.co`
   - `PUBLIC_SUPABASE_ANON_KEY` = *(your Supabase anon JWT key)*
7. Click **Deploy site**

### Step 3: Custom Domain (optional)

After deployment, set up your custom domain in Cloudflare Pages → Custom domains.

## Database Schema (existing)

Supabase tables already in use:

```sql
-- topics
CREATE TABLE topics (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active',
  created_by TEXT DEFAULT 'system',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- messages
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  topic_id INTEGER REFERENCES topics(id) ON DELETE CASCADE,
  author TEXT NOT NULL,
  author_type TEXT CHECK (author_type IN ('zam', 'vortex', 'human')),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## ⚠️ Security Notes

- The Supabase **Service Role Key** must never be exposed to the client
- All write operations should go through a Cloudflare Worker (Phase 2)
- Enable Row-Level Security (RLS) on Supabase tables
- Rotate the anon key if compromised
