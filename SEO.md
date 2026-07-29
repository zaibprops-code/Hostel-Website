# SEO Guide — Riwaq Boys Hostel (riwaqhostels.com)

This file explains what was done in the code and, more importantly, the
**off-site steps only you can do** to get the site ranking for searches like
**"riwaq boys hostel"**.

> **Read this first:** A brand-new website does **not** appear on Google
> automatically, no matter how good the code is. Google has to *discover*,
> *crawl* and *index* it — that usually takes a few days to a few weeks after
> you submit it. The steps in "Do these now" below are what actually gets you
> onto Google. The code changes make sure that once you're indexed, you rank
> for the right terms.

---

## ✅ What was improved in the code

- **Exact-match title tag.** The homepage title is now
  *"Riwaq Boys Hostel Islamabad — Secure Student Accommodation in G-11"* so it
  matches what people type.
- **Brand names in structured data.** Added `alternateName`
  (*Riwaq Boys Hostel*, *Riwaq Boys Hostel Islamabad*, *Riwaq Boys Hostel
  G-11*) to the `Organization`, plus a `WebSite` schema, so Google links those
  searches to this site.
- **Richer LocalBusiness schema** — address, geo-coordinates, opening hours,
  price, rating, and `sameAs` links to your Instagram/Facebook (a key trust
  signal).
- **Breadcrumb structured data** on every interior page.
- **Social share image.** An auto-generated branded Open Graph image
  (`/opengraph-image`) so links look professional on WhatsApp, Facebook, X.
- **Keyword-aware copy** — "Riwaq Boys Hostel" now appears in the homepage
  hero text and in page titles/descriptions across the site.
- **Google Search Console verification hook** — ready for your token (see
  step 1 below).
- Sitemap (`/sitemap.xml`) and robots (`/robots.txt`) are correct and live.

---

## 🚀 Do these now (in order) — this is what gets you on Google

### 1. Verify the site in Google Search Console  ⭐ most important
1. Go to <https://search.google.com/search-console> and add a property for
   `riwaqhostels.com` (use the **URL prefix** method with
   `https://riwaqhostels.com`).
2. Choose the **"HTML tag"** verification method. It gives you a tag like
   `<meta name="google-site-verification" content="ABC123..." />`.
3. Copy **only the `content` value** (`ABC123...`) into
   `src/data/site.ts` → `googleSiteVerification: "ABC123..."`.
4. Redeploy the site, then click **Verify** in Search Console.

### 2. Submit your sitemap
In Search Console → **Sitemaps**, submit: `sitemap.xml`
(full URL: `https://riwaqhostels.com/sitemap.xml`).

### 3. Request indexing of the homepage
In Search Console → **URL Inspection**, paste
`https://riwaqhostels.com`, then click **Request Indexing**. Repeat for the
`/rooms`, `/contact` and `/about` pages. This nudges Google to crawl now
instead of waiting.

### 4. Create a Google Business Profile  ⭐ this is how you win "riwaq boys hostel"
For a *local* business name search, the single biggest factor is a **Google
Business Profile** (the map/box that shows on the right of search results).
1. Go to <https://www.google.com/business/> and create a profile named
   **"Riwaq Boys Hostel"**.
2. Category: **Hostel** (or *Student housing centre*).
3. Enter the **real** address, phone number and hours (see the warning below).
4. Add photos, and set the website to `https://riwaqhostels.com`.
5. Complete Google's verification (postcard/phone/video). Once verified and
   approved, searching "riwaq boys hostel" will show your business directly.

### 5. Ask a few residents to leave Google reviews
Reviews on your Business Profile strongly boost local ranking and trust.

---

## ⚠️ Important: replace the placeholder contact details

The site currently ships with **placeholder** contact info that must be
replaced with your real details — Google cross-checks these against your
Business Profile, and mismatches hurt ranking and trust. Edit
`src/data/site.ts` and `src/data/branches.ts`:

- **Phone / WhatsApp:** currently `+923001234567` → your real number.
- **Street address:** currently *"Street 12, Sector G-11/3"* → your exact
  street address.
- **Map coordinates (`geo`) and `mapEmbedUrl`** in `src/data/branches.ts` →
  point to your actual location.
- **Email:** confirm `hello@riwaqhostels.com` is a real, monitored inbox.

Keep the **name, address and phone identical** everywhere (site, Google
Business Profile, Instagram, Facebook) — consistency is a ranking signal.

---

## 📈 Ongoing tips

- **Add real photos.** Replace the SVG placeholders in `public/images/…`
  (referenced from `src/data/gallery.ts` and `src/data/rooms.ts`) with real
  `.jpg`/`.webp` photos. Real, unique images help a lot for a hostel.
- **Link your profiles.** Put the `riwaqhostels.com` link in your Instagram
  and Facebook bios — these backlinks help Google trust the brand.
- **Be patient.** Even done perfectly, ranking for a new brand typically
  takes 1–4 weeks after Search Console submission and Business Profile
  approval. Check Search Console → **Performance** to watch impressions grow.
