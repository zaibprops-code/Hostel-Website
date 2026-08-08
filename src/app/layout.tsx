import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { ScrollReveal } from "@/components/layout/ScrollReveal";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { BackToTop } from "@/components/layout/BackToTop";
import { PointerFX } from "@/components/layout/PointerFX";
import { site } from "@/data/site";
import { organizationJsonLd, websiteJsonLd, jsonLdScript } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Riwaq Boys Hostel Islamabad — Student Accommodation in E-11/2",
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Riwaq Boys Hostel",
    "Riwaq Boys Hostel Islamabad",
    "Riwaq Boys Hostel E-11",
    "Riwaq Hostels",
    "Riwaq hostel",
    "boys hostel Islamabad",
    "boys hostel E-11 Islamabad",
    "hostel Islamabad",
    "student accommodation Islamabad",
    "hostel near NUST",
    "hostel near FAST Islamabad",
    "hostel near Air University",
    "hostel near NDU",
    "hostel near Bahria University",
    "hostel E-11 Islamabad",
    "co-living Islamabad",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: site.url },
  formatDetection: { telephone: true, address: true },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: "Riwaq Boys Hostel Islamabad — Secure Living in E-11/2",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Riwaq Boys Hostel Islamabad — Secure Living in E-11/2",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...(site.googleSiteVerification
    ? { verification: { google: site.googleSiteVerification } }
    : {}),
  category: "hospitality",
};

export const viewport: Viewport = {
  themeColor: "#123a30",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-dvh antialiased">
        {/* Mark JS as available before paint so scroll-reveal elements start
            hidden without a flash — and stay visible if JS never loads. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(organizationJsonLd())}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(websiteJsonLd())}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-forest-800 focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-ivory"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingContact />
        <BackToTop />
        <ScrollReveal />
        <PointerFX />
      </body>
    </html>
  );
}
