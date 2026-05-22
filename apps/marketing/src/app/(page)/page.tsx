//import Clients from "@/components/HomePage/Clients";
import FAQ from "@/components/HomePage/FAQ";
import Features from "@/components/HomePage/Features";
import Hero from "@/components/HomePage/Hero";
import Solution from "@/components/HomePage/Solution";
import Pricing from "@/components/Pricing";
import Problems from "@/components/HomePage/Problems";
import { CTA } from "@/components/HomePage/CTA";
import { getPricingComponentContent } from "@/sanity/queries/pricingComponent";
import {
  CtaProps,
  //ClientsProps,
  FeatureItems,
  HomePageFaqProps,
  HeroProps,
  ProblemsProps,
  SolutionProps,
} from "@/lib/props";

export default async function Home() {
  const pricingComponentContent = await getPricingComponentContent();

  return (
    <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-5 pt-24 md:gap-6">
      <Hero {...HeroProps} />
      <Problems {...ProblemsProps} />
      {/** <Clients {...ClientsProps} /> */}
      <Solution {...SolutionProps} />
      <Features {...FeatureItems} />
      <Pricing content={pricingComponentContent} />
      <FAQ {...HomePageFaqProps} />
      <CTA {...CtaProps} />
    </main>
  );
}
