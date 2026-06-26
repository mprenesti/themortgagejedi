# The Mortgage Jedi — themortgagejedi.com

Marketing and lead-generation website for **Mike Prenesti, The Mortgage Jedi**,
a Las Vegas mortgage broker (NMLS #1033445, C2 Financial Corporation).

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**,
**Framer Motion**, and **React Hook Form + Zod**. Blog posts are authored as
Markdown/MDX in `content/blog/`.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in webhook + analytics values
npm run dev                  # http://localhost:3000
```

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Project structure

```
content/blog/            Markdown/MDX blog posts (frontmatter + body)
public/downloads/        first-time-buyer-guide.pdf (swappable, see below)
public/images/           logo, headshot, OG image, blog covers (see README there)
src/app/                 App Router pages, API routes, sitemap, robots
src/components/          layout, homepage, forms, tools, blog, ui
src/lib/                 constants, data, ghl integration, blog loader, utils
```

## Environment variables

Set these in `.env.local` for local dev and in the Vercel dashboard for
production. See `.env.example` for the full list.

- `GHL_*_WEBHOOK` — GoHighLevel inbound webhook URLs for each form. If a webhook
  is not set, the form still returns success (it just skips the POST), so the
  site works before integrations are wired up.
- `NEXT_PUBLIC_GA_ID` — Google Analytics 4 measurement ID. Scripts load only
  when present.
- `NEXT_PUBLIC_FB_PIXEL_ID` — Meta (Facebook) Pixel ID. Loads only when present.

## Forms → GoHighLevel

All forms POST to internal API routes which forward to GHL:

| Form | API route | Webhook key |
| --- | --- | --- |
| Contact | `/api/lead` | `contact` |
| Get Started quiz | `/api/lead` | `getStarted` |
| Guide opt-in | `/api/lead` | `guideOptIn` |
| Newsletter | `/api/lead` | `newsletter` |
| Realtor partners | `/api/lead` | `realtor` |
| Second opinion (file upload) | `/api/second-opinion` | `secondOpinion` |

## Updating the First-Time Buyer Guide PDF

1. Replace `public/downloads/first-time-buyer-guide.pdf` with the new PDF
   (keep the exact filename).
2. `git add . && git commit -m "Update buyer guide PDF" && git push`
3. Vercel auto-deploys. The download link never changes.

## Images

The hero headshot and blog covers fall back to styled placeholders until you
add the real files. See `public/images/README.md` for the expected filenames
and sizes.

## Deployment (Vercel)

1. Push to GitHub and import the repo into Vercel.
2. Add all environment variables in the Vercel project settings.
3. Point the `themortgagejedi.com` domain (GoDaddy) at Vercel.

---

Brand colors and fonts (Star Wars gold theme) live in `tailwind.config.ts`.
Site-wide content (phone, email, booking URL, socials) lives in
`src/lib/constants.ts`.
