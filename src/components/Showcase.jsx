"use client";

import { motion } from "framer-motion";
import { CalendarCheck2, ClipboardCheck, ShieldAlert, Users, Dumbbell, MessageSquareText } from "lucide-react";

const content = {
  coach: {
    eyebrow: "Coach View",
    title: "Coaching workflow, one screen.",
    subtitle:
      "Plan assignments, track execution, and respond to player recovery feedback without jumping between tools.",
    lanes: [
      {
        title: "Roster + Invites",
        detail: "Create your roster and share a single team link.",
        Icon: Users,
      },
      {
        title: "Weekly Assignments",
        detail: "Schedule recurring workouts with clear end dates.",
        Icon: CalendarCheck2,
      },
      {
        title: "Feedback Response",
        detail: "Review pain flags and adjust the next session quickly.",
        Icon: ShieldAlert,
      },
    ],
  },
  athlete: {
    eyebrow: "Athlete View",
    title: "Training loop, kept simple.",
    subtitle:
      "Open your assignment, log lifts as you train, then send a short recovery check-in after the session.",
    lanes: [
      {
        title: "Open Assignment",
        detail: "Your coach plan is ready when you log in.",
        Icon: ClipboardCheck,
      },
      {
        title: "Log The Workout",
        detail: "Track sets, reps, and weight in-session.",
        Icon: Dumbbell,
      },
      {
        title: "Recovery Check-In",
        detail: "Mark body part discomfort and add a quick note.",
        Icon: MessageSquareText,
      },
    ],
  },
};

function LaneRow({ lane, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.35, delay: index * 0.08, ease: "easeOut" }}
      className="relative rounded-2xl border border-card-border bg-bg/75 p-5"
    >
      <div className="flex items-start gap-4">
        <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/12 text-accent">
          <lane.Icon size={19} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg font-semibold text-fg">{lane.title}</h3>
          <p className="mt-1.5 font-body text-sm text-muted-light">{lane.detail}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Showcase({ view }) {
  const c = content[view];

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[32px] border border-card-border bg-card/85 p-7 md:p-10"
        >
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[680px] -translate-x-1/2 rounded-full bg-[#1a2060]/45 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-20 right-0 h-52 w-52 rounded-full bg-accent/[0.06] blur-[100px]" />

          <div className="relative grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-12">
            <div>
              <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {c.eyebrow}
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-fg md:text-5xl">
                {c.title}
              </h2>
              <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-muted-light md:text-lg">
                {c.subtitle}
              </p>

            </div>

            <div className="space-y-3">
              {c.lanes.map((lane, index) => (
                <LaneRow key={lane.title} lane={lane} index={index} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
