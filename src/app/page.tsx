import { Hero } from "@/components/landing/hero";
import MainNav from "@/components/main-nav";
import Features from "@/components/landing/about";
import { Metadata } from "next";
import HeroSection from "@/components/landing/hero-section";
import LogoCloudSection from "@/components/landing/customer";
import CtaSection from "@/components/landing/contact";
import FooterBlock from "@/components/landing/footer";
export const metadata: Metadata = {
  title: "Snapcheck",
  description: "Snapcheck",
};

export default function DashboardPage() {
  return (
    <>
      <MainNav />
      <HeroSection />
      <Features/>
      <LogoCloudSection/>
      <CtaSection />
      <FooterBlock />
    </>
  );
}
