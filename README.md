# Riwaq Hostels

The digital foundation of **Riwaq Hostels** — a premium student & co-living
hospitality brand in Islamabad, Pakistan. Built to feel like the website of an
entire hospitality company, not a single building: professional today, and
architected to scale into a multi-branch, multi-city chain without a redesign.

> _Riwaq_ (رواق) is the shaded arcade of a traditional courtyard — shelter,
> calm and belonging. That idea shapes the brand and the design.

---

## Tech stack

| Concern        | Choice                                             | Why                                                         |
| -------------- | -------------------------------------------------- | ----------------------------------------------------------- |
| Framework      | **Next.js 15** (App Router)                        | First-class SEO, static generation, image optimisation      |
| Language       | **TypeScript** (strict)                            | A typed domain model that documents and enforces the schema |
| Styling        | **Tailwind CSS v4** with an `@theme` design system | Fast, consistent, tiny CSS, no config sprawl                |
| Fonts          | `next/font` — Fraunces (display) + Inter (body)    | Self-hosted, zero layout shift                              |
| Content        | Typed data modules in `src/data`                   | CMS-ready; add content without touching components          |
| Deps           | Zero runtime UI libraries                          | Own icon set, own components — lean and fast                |

Every page is statically prerendered. First-load JS is ~102 kB shared.

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

---

## On-site assistant & live seat availability

Instead of only bouncing visitors to WhatsApp, the site answers the common
questions itself — instantly, on the page — and reserves WhatsApp for the
actual booking conversation.

**What it does**

- A floating **assistant** (bottom-right, above the WhatsApp button) answers
  seat availability, pricing, facilities, location and booking questions using
  the site's own data (`src/data/*`) plus **live availability**.
- It's deterministic and dependency-free (no external AI call, no cost, no data
  leaves the page). Anything it can't answer confidently is handed off to
  WhatsApp with the question pre-filled — never a dead end.
- The front desk updates vacancies from **`/admin/availability`** — a
  password-gated panel. Saved numbers appear in the assistant immediately; no
  redeploy needed.

**How the pieces fit**

| Piece | File |
| ----- | ---- |
| Answer engine (intents + FAQ matching) | `src/lib/assistant/engine.ts` |
| Assistant widget | `src/components/assistant/Assistant.tsx` |
| Availability model & helpers | `src/lib/availability/shared.ts` |
| Seed defaults (from each room's `availability`) | `src/data/availability.ts` |
| Persistence (Vercel KV or dev fallback) | `src/lib/availability/store.ts` |
| Public + admin API | `src/app/api/availability/route.ts` |
| Admin sign-in | `src/app/api/admin/{login,logout}/route.ts` |
| Admin panel | `src/app/admin/availability/` |

### Configuration (environment variables)

Set these in the Vercel dashboard (**Project → Settings → Environment
Variables**), or in a local `.env.local` for development. See `.env.example`.

| Variable | Required | Purpose |
| -------- | -------- | ------- |
| `ADMIN_PASSWORD` | Yes, to use the admin panel | The front-desk password for `/admin/availability`. |
| `KV_REST_API_URL` | For durable saves | Vercel KV (Upstash Redis) REST URL. Create via **Storage → KV**; Vercel injects this automatically once linked. |
| `KV_REST_API_TOKEN` | For durable saves | Vercel KV REST token (injected alongside the URL). |
| `ADMIN_SESSION_SECRET` | Optional | Signs the admin session cookie. Falls back to `ADMIN_PASSWORD` if unset; set a separate random value in production. |

Without the `KV_*` vars the feature still works, but admin edits are held in
memory only and reset on redeploy/cold-start (a banner in the panel warns you).
Add a KV store before going live. Until the front desk saves anything, the
assistant shows the catalog defaults from `src/data/rooms.ts` (`availability`).

---

## Design philosophy

The site is deliberately restrained — premium, spacious, trustworthy — because
the goal is conversion through confidence, not decoration. Key decisions:

- **A rich homepage + focused inner pages.** The homepage answers _who / what /
  where / why / how_ in one scroll (the way high-intent visitors actually
  browse), while each topic has a dedicated page for depth and SEO.
- **Trust signals everywhere.** Security, cleanliness, ratings, location,
  transparent pricing and multiple contact routes are surfaced repeatedly,
  because those are the real decision factors for a hostel.
- **WhatsApp-first conversion.** In Pakistan, WhatsApp is the highest-intent
  enquiry channel. A persistent action and pre-filled deep links turn interest
  into a trackable lead instantly. The enquiry form is ready to POST to an API
  or CRM later — only one function changes.
- **Mobile-first.** Every layout is designed for phones first; the mobile
  experience is the primary experience.
- **Accessible & fast.** Semantic landmarks, skip link, keyboard-friendly
  disclosures, `prefers-reduced-motion` support, lazy-loaded map, and honoured
  focus states.

---

## The scalable architecture

Everything the brand will grow into is **data, not markup**. Components render
whatever the data modules describe, so growth is a content edit.

```
src/
├── app/                 # Routes (home + about/rooms/facilities/gallery/reviews/faq/contact)
│   ├── sitemap.ts       # Auto-generated sitemap
│   ├── robots.ts        # robots.txt
│   ├── manifest.ts      # PWA manifest
│   └── icon.svg         # Favicon (the Riwaq arch mark)
├── components/
│   ├── brand/           # Logo / arch mark
│   ├── layout/          # Header, Footer, floating WhatsApp
│   ├── sections/        # Composed page sections (Hero, Reviews, EnquiryForm…)
│   └── ui/              # Primitives (Button, Section, RoomCard, FaqAccordion…)
├── data/                # ← THE SOURCE OF TRUTH
│   ├── site.ts          # Brand identity, contact, navigation
│   ├── branches.ts      # Branch registry (the multi-branch backbone)
│   ├── rooms.ts         # Room categories & pricing
│   ├── facilities.ts    # Facilities catalogue
│   ├── reviews.ts       # Testimonials (Google-Reviews-ready)
│   ├── faqs.ts          # FAQs (grouped, structured-data-ready)
│   └── gallery.ts       # Gallery (category + future video support)
├── lib/                 # seo.ts (metadata + JSON-LD), cn.ts
└── types/               # The domain model
```

### How to grow it

**Add a new branch** (e.g. a girls hostel, or a new city) — append one object
to `src/data/branches.ts`. Set `status: "opening-soon"` to collect a waitlist
before launch; the footer, contact form and About roadmap pick it up
automatically.

**Add a room type** — append to `src/data/rooms.ts`. It appears on the Rooms
page and in the enquiry form instantly.

**Add a facility** — append to `src/data/facilities.ts` with an icon from the
in-house set and a category. It flows into the relevant grids.

**Add reviews / FAQs / gallery items** — append to the matching module. FAQs and
reviews are emitted as JSON-LD for search engines automatically.

**Publish a blog post / guide** — drop a new `.mdx` file into
`src/content/blog/` with frontmatter (`title`, `excerpt`, `date`, `author`,
`category`, `tags`, `cover`). It's picked up automatically — listed on `/blog`,
statically rendered at `/blog/<filename>`, added to the sitemap, and given
`BlogPosting` structured data. No code changes required.

**Add a team member / announcement / tour stop** — append to `src/data/team.ts`,
`src/data/announcements.ts`, or `src/data/tour.ts` respectively.

### Ready for the future

The structure anticipates, without prematurely building:

- **Real photography** — drop a `.jpg/.png/.webp` at an asset's `src` and the
  `Frame` component renders an optimised `next/image`; until then it draws an
  on-brand arch placeholder. No layout rework.
- **Per-branch pages** — the `Branch` model is complete; a `/branches/[slug]`
  route can be added over the existing data.
- **A booking engine / CRM** — the enquiry form's submit handler is the only
  thing that changes to POST to `/api/enquiry`, a CMS, or a booking system.
- **A headless CMS** — the typed `src/data` modules map 1:1 to CMS collections.

---

## SEO & performance

- Per-page `Metadata` (titles, canonicals, Open Graph, Twitter) via `lib/seo.ts`
- **JSON-LD structured data**: `LodgingBusiness` + `Organization` (site-wide),
  `Review`/`AggregateRating`, and `FAQPage`
- `sitemap.xml`, `robots.txt`, and a web manifest
- Semantic HTML, security headers, and statically prerendered pages

---

## Configuration

Update brand-wide details (name, phone, WhatsApp, email, address, socials,
navigation, production URL) in a single place: **`src/data/site.ts`**. Set the
canonical `url` there before deploying.
