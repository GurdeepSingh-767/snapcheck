import { About } from "@/components/landing/about";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { MainNav } from "@/components/main-nav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Snapcheck",
  description: "Snapcheck",
};

export default function DashboardPage() {
  return (
    <>
      <MainNav />
      <Hero />
      <About />
      <Footer />
    </>
  );
}
