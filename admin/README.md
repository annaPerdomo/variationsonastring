# Crafts admin (`/admin`)

The handmade gallery is now data-driven. Cards live in [`/data/crafts.json`](../data/crafts.json)
and are rendered by `main.js`. You edit them through **Sveltia CMS** at
`https://www.variationsonastring.com/admin` — upload a photo, fill a short form,
hit **Publish**. Sveltia commits to GitHub, Vercel redeploys, and it's live in ~1 min.
No code editing, works from your phone.

## One-time setup (~10 min)

Sveltia needs a tiny OAuth relay to log you into GitHub. The official one runs
free on Cloudflare Workers.

### 1. Deploy the auth worker
- Repo: <https://github.com/sveltia/sveltia-cms-auth> (has a "Deploy to Cloudflare" button),
  or locally: `git clone`, `npm i`, `npx wrangler deploy`.
- Copy the deployed Worker URL, e.g. `https://variationsonastring-auth.<you>.workers.dev`.

### 2. Create a GitHub OAuth App
GitHub → Settings → Developer settings → **OAuth Apps** → New OAuth App:
- **Homepage URL:** `https://www.variationsonastring.com`
- **Authorization callback URL:** `https://variationsonastring-auth.<you>.workers.dev/callback`
- Generate a client secret. Keep the **Client ID** and **Client secret**.

> Note: this is an *OAuth App*, not a GitHub App.

### 3. Give the worker its secrets
In the Cloudflare Worker settings, add environment variables:
- `GITHUB_CLIENT_ID` — from step 2
- `GITHUB_CLIENT_SECRET` — from step 2 (mark as encrypted)
- `ALLOWED_DOMAINS` — `www.variationsonastring.com,variationsonastring.com,*.vercel.app`

### 4. Point the CMS at the worker
In [`config.yml`](./config.yml), set `base_url` to your Worker URL (no trailing slash):

```yaml
backend:
  name: github
  repo: annaPerdomo/variationsonastring
  branch: main
  base_url: https://variationsonastring-auth.<you>.workers.dev
```

Commit, then visit `/admin`, click **Login with GitHub**, and you're in.

## Adding a craft
1. Go to `/admin` → **Handmade Crafts** → **Craft Gallery**.
2. **Add Craft** (new ones go at the top = newest first, matching the site).
3. Title, Category, Completed (free text — "October 30th, 2022" or just "2014"),
   then upload one or more **Photos** (first photo is the grid thumbnail).
4. **Publish**.

## Don't want Cloudflare?
Alternative: **Pages CMS** (<https://pagescms.org>) handles auth for you via a GitHub
App — no worker, no OAuth app. Trade-off: the admin lives on `pagescms.org` instead
of your own domain. It edits the same `data/crafts.json`, so you can switch later.

## Affiliate links (later)
Each craft already carries a `materials` array in the data model and a field in the
CMS form. When you're ready to monetize, fill in `{ name, url }` per supply and we'll
render a "Made with →" list on each card. See the note in the project handoff for
which affiliate programs fit (Amazon Associates, LoveCrafts, Etsy via Awin, etc.)
plus the required FTC disclosure + `rel="sponsored"`.
