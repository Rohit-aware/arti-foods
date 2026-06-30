# Cloudflare Pages Deployment

## One-time Setup

1. Push project to GitHub
2. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → Pages → Create a project → Connect to Git
3. Select your repo

## Build Settings (copy exactly)

| Field | Value |
|---|---|
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `20` |

Set Node version under **Settings → Environment Variables**:
```
NODE_VERSION = 20
```

## Custom Domain

Pages → your project → Custom domains → Add domain → `aartifood.in`

Add these DNS records in Cloudflare DNS:

| Type | Name | Value |
|---|---|---|
| CNAME | @ | `<your-project>.pages.dev` |
| CNAME | www | `<your-project>.pages.dev` |

## Every deploy after that

Just push to `main` — Cloudflare auto-deploys.

## QR Code

Point QR to `https://aartifood.in` after domain is live.
Generate free at [qr-code-generator.com](https://www.qr-code-generator.com)
