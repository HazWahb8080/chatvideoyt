"use client";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Tabs from "@/components/Tabs";
import CTA from "@/components/CTA";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQs from "@/components/FAQs";

export default function Home() {
  return (
    <div className="w-full min-h-screen items-start justify-start flex flex-col bg-white py-6">
      <div className="w-full items-start justify-start flex flex-col h-full">
        <Header />
        <Hero />
        <Tabs />
        <CTA />
        <Testimonials />
        <Pricing />
        <FAQs />
      </div>
    </div>
  );
}
