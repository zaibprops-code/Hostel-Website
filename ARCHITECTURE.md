# Riwaq Hostels — Architecture

This site is built **brand-first**: it represents the *Riwaq Hostels* brand,
and each hostel is a **branch** — a data record. Opening a new hostel is a data
edit, not a redesign. This document explains the model, where things live, and
how to extend it.

---

## Core principle: brand vs. branch

| Brand-level (evergreen, one of each)        | Branch-level (per hostel, many)                 |
| ------------------------------------------- | ----------------------------------------------- |
| Story, mission, values (`/about`)           | Name, address, geo, maps                        |
| Company standards (`/facilities`, `/rooms`) | Contacts, manager, WhatsApp                     |
| Brand testimonials (`/reviews`)             | Rooms offered, pricing, availability            |
| Brand FAQs (`/faq`)                         | Facilities, gallery, videos, virtual tour       |
| Parents, guides/blog, updates               | Reviews, FAQs, nearby, transport                |
| `Organization` + `WebSite` structured data  | `LodgingBusiness` structured data, OG image     |
| HQ / bookings contact (`/contact`)          | Per-branch contact + branch page (`/branches/*`)|

Brand pages describe *"what to expect at any Riwaq"*; the **branch page is the
source of truth** for that location's specifics. This avoids duplication and
stays honest as branches diverge.

---

## The branch registry (single source of truth)

`src/data/branches.ts` is the **data-provider boundary**. Everything downstream
reads branches only through this module's accessors:

- `branches` — the array of `Branch` records.
- `getBranch(slug)`, `getAllBranchSlugs()`
- `flagshipBranch` — the open branch featured on the homepage and used as the
  brand's primary physical location in `Organization` schema. Change the
  "featured branch" here in one place.
- Aggregates: `openBranches`, `upcomingBranches`, `openBranchCount`,
  `brandAreas`, `brandCities`, `brandFacilityIds`.

The `Branch` type (`src/types/index.ts`) has a small required core plus many
**optional** fields (manager, contacts, postalCode, videos, virtualTourUrl,
transport, openedOn, seo, …) — a branch fills these in over time with **zero
component changes**.

### How to add a branch

1. Copy an existing object in `branches` and edit its fields (a unique `id` and
   `slug` are required).
2. Optionally give it a `gallery` (`src/data/gallery.ts` shape) and tag
   per-branch reviews / FAQs with its `id` in `src/data/reviews.ts` /
   `src/data/faqs.ts`.

That's it. The following generate **automatically** from the record:

- `/branches/<slug>` page (`src/app/branches/[slug]/page.tsx`,
  `generateStaticParams`)
- Per-branch `LodgingBusiness` JSON-LD (`branchJsonLd` in `src/lib/seo.ts`)
- Per-branch Open Graph image (`src/app/branches/[slug]/opengraph-image.tsx`)
- Sitemap entry (`src/app/sitemap.ts`)
- A card in the `/branches` locator (with gender/status filtering) and on
  `/contact`

---

## SEO at scale

- **Brand anchor:** `organizationJsonLd` + `websiteJsonLd` (emitted site-wide in
  `src/app/layout.tsx`) establish the Riwaq brand entity and its alternate names.
- **Per-branch local SEO:** each branch page emits a `LodgingBusiness` with its
  own `@id` (`…/branches/<slug>#branch`), NAP, `geo`, `hasMap`, opening hours,
  amenities, and `parentOrganization` → the brand `#organization`. This lets
  each branch rank independently in local search (the model modern
  multi-location brands use).
- **Breadcrumbs** on every interior/branch page (`PageHero path=…`).
- **FAQ schema:** brand FAQs power `/faq`; a branch emits its own `FAQPage`
  only when it has branch-specific FAQs (avoids duplicate structured data).
- **Ratings are earned:** a branch only claims an `aggregateRating` once it has
  its **own** reviews (`hasOwnReviews`), never borrowed brand numbers.

---

## Reviews & FAQs (shared system, dual scope)

`Review` and `FaqItem` carry an optional `branchId`. Untagged = brand-level.

- `brandReviews()` / `reviewsForBranch(id)` (falls back to brand while a branch
  is new), `reviewStats(list)`, `hasOwnReviews(id)`.
- `brandFaqs()` / `faqsForBranch(id)`.

The same `ReviewCard` / `FaqAccordion` components serve both brand and branch
pages.

---

## Media

Each branch owns its media: `gallery` (images) today, plus optional
`videos: MediaAsset[]` and `virtualTourUrl`. Nothing is global, so one branch's
media never affects another.

---

## Roadmap / seams (declared, not built)

These are intentionally scaffolded so they become **additive** later:

- **Per-branch pricing** — `Branch.pricingOverrides` (type-declared, unused).
  Pricing is global in `src/data/rooms.ts` today; when a branch needs different
  rates, populate `pricingOverrides` and have the rooms UI prefer it. No
  component redesign.
- **Booking** — `Branch.booking` (`BranchBookingConfig`) and the `BranchInquiry`
  type. Today the CTA is WhatsApp/enquiry; a request/instant flow can be added
  per branch as data + one form.
- **CMS / admin** — because all branch reads go through `src/data/branches.ts`,
  swapping the local array for a headless CMS or admin API is a change in that
  one module. Pages, components and SEO stay untouched. This is what makes a
  future "add/edit branches, upload photos, change prices" dashboard viable
  without developer edits.
- **City-level routes** — data already carries `city`/`area`; `/branches`
  filters can grow into `/branches/<city>/<branch>` if scale warrants it.

---

## Where things live

```
src/
  data/
    branches.ts     ← branch registry + data-provider boundary (add branches here)
    rooms.ts        ← shared room catalog (global pricing today)
    facilities.ts   ← shared facility catalog
    reviews.ts      ← reviews (brand + branch-scoped helpers)
    faqs.ts         ← FAQs (brand + branch-scoped helpers)
    site.ts         ← brand identity, HQ contacts, nav, verification
  lib/
    seo.ts          ← organizationJsonLd, websiteJsonLd, branchJsonLd, faq/reviews/breadcrumb
  app/
    page.tsx        ← brand homepage (features the flagship)
    branches/       ← locator + [slug] branch pages + per-branch OG image
    about|rooms|facilities|gallery|reviews|faq|parents|contact|…  ← brand pages
    layout.tsx      ← brand-wide Organization + WebSite JSON-LD, metadata
```
