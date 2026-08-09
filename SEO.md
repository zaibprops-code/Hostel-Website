# SEO Guide — Riwaq Boys Hostel (riwaqhostels.com)

This explains what the code does for SEO and, more importantly, the
**off-site steps only you can do** to get the site ranking for searches like
**"riwaq boys hostel"**.

> **Read this first:** A website does **not** appear on Google automatically,
> no matter how good the code is. Google has to *discover*, *crawl* and
> *index* it — that usually takes a few days to a few weeks after you submit
> it. The "Do these now" steps below are what actually gets you onto Google.
> The code makes sure that once you're indexed, you rank for the right terms.

---

## ✅ What the code already does

- **Exact-match title tag** — the homepage is titled
  *"Riwaq Boys Hostel Islamabad — Student Accommodation in E-11/2"*, matching
  what people type.
- **Brand names in structured data** — `alternateName`
  (*Riwaq Boys Hostel*, *… Islamabad*, *… E-11*) on the `Organization`, plus a
  `WebSite` schema, so Google connects those searches to this site.
- **Rich LocalBusiness schema** — real address, geo-coordinates, price,
  rating, area served, map link, and `sameAs` link to your Instagram.
- **Breadcrumb structured data** on every interior page.
- **Branded social share image** (`/opengraph-image`) so links preview nicely
  on WhatsApp, Instagram, Facebook and X.
- **Keyword-aware copy** — "Riwaq Boys Hostel" and "E-11/2, Islamabad" appear
  in the hero and across page titles/descriptions.
- **Sitemap** (`/sitemap.xml`, includes every page, branch and blog post) and
  **robots** (`/robots.txt`) are correct and live.
- **A verification hook** ready for your Search Console token.

---

## 🚀 Do these now (in order) — this is what gets you on Google

### 1. Verify the site in Google Search Console  ⭐ most important
1. Go to <https://search.google.com/search-console> and add a **URL prefix**
   property for `https://riwaqhostels.com`.
2. Choose the **"HTML tag"** method. It gives a tag like
   `<meta name="google-site-verification" content="ABC123..." />`.
3. Copy **only the `content` value** into `src/data/site.ts` →
   `googleSiteVerification: "ABC123..."`.
4. Redeploy, then click **Verify** in Search Console.

### 2. Submit your sitemap
Search Console → **Sitemaps** → submit `sitemap.xml`
(`https://riwaqhostels.com/sitemap.xml`).

### 3. Request indexing
Search Console → **URL Inspection** → paste `https://riwaqhostels.com` →
**Request Indexing**. Repeat for `/rooms`, `/contact` and `/about`. This
nudges Google to crawl now instead of waiting.

### 4. Create a Google Business Profile  ⭐ this is how you win "riwaq boys hostel"
For a *local business name* search, the single biggest factor is a **Google
Business Profile** (the map/info box on the right of the results).
1. Go to <https://www.google.com/business/> and create a profile named
   **"Riwaq Boys Hostel"**.
2. Category: **Hostel** (or *Student housing centre*).
3. Address: **House No. 241, Street 70B, E-11/2 Services Society, Islamabad**.
4. Phone: **+92 314 6144997**. Website: `https://riwaqhostels.com`.
5. Add real photos, then complete Google's verification (postcard/phone/
   video). Once approved, searching "riwaq boys hostel" shows your business
   directly — usually the fastest path to appearing on Google.

### 5. Ask a few residents for Google reviews
Reviews on your Business Profile strongly boost local ranking and trust.

---

## 📈 Keep it consistent & growing

- **Keep name, address & phone identical everywhere** — the website, Google
  Business Profile and Instagram. Consistency is a ranking signal.
- **Add real photos.** Replace the SVG placeholders in `public/images/…`
  (referenced from `src/data/gallery.ts` and `src/data/rooms.ts`) with real
  `.jpg`/`.webp` photos of the hostel — a big help for a listing like this.
- **Link the site from your Instagram bio** (@riwaq_hostels) — that backlink
  helps Google trust the brand.
- **Be patient.** Even done perfectly, ranking a newer site for its brand
  typically takes 1–4 weeks after Search Console submission and Business
  Profile approval. Watch progress in Search Console → **Performance**.
