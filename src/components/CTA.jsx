"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTA({ view }) {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl border border-card-border bg-card px-8 py-16 text-center md:px-16 md:py-24"
        >
          <div className="pointer-events-none absolute top-0 left-1/2 h-56 w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.06] blur-[100px]" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-40 rounded-full bg-[#1a2060]/60 blur-[80px]" />

          <h2 className="relative font-display text-3xl font-bold tracking-tight text-fg md:text-5xl">
            {view === "athlete" ? (
              <>Ready to train<span className="text-accent">?</span></>
            ) : (
              <>Ready to coach smarter<span className="text-accent">?</span></>
            )}
          </h2>
          <p className="relative mx-auto mt-4 max-w-sm font-body text-base text-muted">
            {view === "athlete"
              ? "Join your team and start logging today."
              : "Set up your team in minutes."}
          </p>
          <div className="relative mt-8">
            <Link
              href="/waitlist"
              className="group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-accent px-6 py-3 font-display text-sm font-semibold text-bg transition-all hover:shadow-lg hover:shadow-accent/20 hover:brightness-110"
            >
              Join the waitlist
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
