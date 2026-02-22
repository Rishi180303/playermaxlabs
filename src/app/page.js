"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import Showcase from "@/components/Showcase";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  const [view, setView] = useState("athlete");

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <Hero view={view} setView={setView} />
      <Journey view={view} />
      <Showcase view={view} />
      <CTA view={view} />
      <Footer />
    </div>
  );
}
