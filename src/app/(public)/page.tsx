import { Metadata } from "next";
import { HeroSection } from "./_components/HeroSection";
import { ServicesSection } from "./_components/ServicesSection";
import { StatsSection } from "./_components/StatsSection";
import { WhyChooseSection } from "./_components/WhyChooseSection";
import { CTASection } from "./_components/CTASection";

export const metadata: Metadata = {
  title: "Inspire Global Access - Bridging Africa & China",
  description:
    "Your trusted partner for cross-border opportunities between Africa and China. Education, employment, travel, and trade solutions.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <WhyChooseSection />
      <CTASection />
    </>
  );
}
