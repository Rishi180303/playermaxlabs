"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ViewToggle from "./ViewToggle";

const content = {
  athlete: {
    line1: "Workout tracking",
    line2: "for athletes.",
    subtitle:
      "Log sets, reps, weight, and post-session feedback.",
    cta: "Join the waitlist",
  },
  coach: {
    line1: "Team training",
    line2: "for coaches.",
    subtitle:
      "Assign workouts, review logs, and monitor player feedback in one place.",
    cta: "Join the waitlist",
  },
};

export default function Hero({ view, setView }) {
  const c = content[view];

  return (
    <section className="relative flex min-h-[calc(100svh-4.5rem)] items-center pt-44 pb-32 md:pt-52 md:pb-40">
      {/* bg glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[-300px] left-1/2 h-[700px] w-[1000px] -translate-x-1/2 rounded-full bg-[#1a2060]/40 blur-[150px]" />
        <div className="absolute top-[-100px] left-1/3 h-[300px] w-[400px] rounded-full bg-accent/[0.03] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="mb-8 flex justify-center">
          <ViewToggle view={view} setView={setView} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <h1 className="font-display text-[clamp(2.8rem,7vw,5.5rem)] font-extrabold leading-[1.05] tracking-tight text-fg">
              {c.line1}
              <br />
              <span className="bg-gradient-to-r from-accent to-[#6ee7b7] bg-clip-text text-transparent">
                {c.line2}
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-lg font-body text-base leading-relaxed text-muted-light md:text-lg">
              {c.subtitle}
            </p>

            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/waitlist"
                className="group flex cursor-pointer items-center gap-2 rounded-xl bg-accent px-7 py-3.5 font-display text-sm font-semibold text-bg transition-all hover:shadow-lg hover:shadow-accent/20 hover:brightness-110"
              >
                {c.cta}
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a href="#journey" className="font-body text-sm text-muted transition-colors hover:text-fg">
                See how it works
              </a>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
