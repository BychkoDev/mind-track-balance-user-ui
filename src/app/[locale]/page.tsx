"use client";

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { EmotionTracking } from "@/components/EmotionTracking";
import { PauseBeforeScroll } from "@/components/PauseBeforeScroll";
import { WeeklyInsights } from "@/components/WeeklyInsights";
import { Community } from "@/components/Community";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors overflow-x-hidden">
      <Header />
      <Hero />
      <EmotionTracking />
      <PauseBeforeScroll />
      <WeeklyInsights />
      <Community />
      <Testimonials />
      <Footer />
    </div>
  );
}
