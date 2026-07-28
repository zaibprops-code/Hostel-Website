import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { BranchLocator } from "@/components/sections/BranchLocator";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { branches } from "@/data/branches";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Our Branches",
  description:
    "Find your Riwaq hostel. Our flagship boys hostel is open in E-11/2, Islamabad, with more branches — boys, girls and executive — opening across the city.",
  path: "/branches",
});

export default function BranchesPage() {
  return (
    <>
      <PageHero
        breadcrumb="Branches"
        eyebrow="Our branches"
        title="One standard, growing across the city."
        lede="Riwaq is expanding branch by branch — each held to the same standard of safety, cleanliness and care. Find the one that fits you, or join a waitlist for what's coming."
      />
      <Section>
        <BranchLocator branches={branches} />
      </Section>
      <ClosingCTA />
    </>
  );
}
