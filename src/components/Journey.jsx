"use client";

import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import dynamic from "next/dynamic";

const Model = dynamic(() => import("react-body-highlighter"), { ssr: false });

// athlete visuals

function InviteVisual() {
  return (
    <div className="rounded-2xl border border-card-border bg-card p-8">
      <p className="font-body text-sm text-muted">You&apos;ve been invited to</p>
      <p className="mt-2 font-display text-2xl font-bold text-fg">Varsity Baseball</p>
      <p className="mt-1 font-body text-sm text-muted">Coach Rivera&apos;s roster · 18 players</p>
      <div className="mt-6 space-y-2">
        {["Ethan M.", "Luis R.", "Noah T."].map((name, i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg border border-card-border bg-bg px-4 py-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-card-border font-display text-[11px] font-bold text-fg">{name[0]}</div>
            <span className="font-body text-sm text-muted-light">{name}</span>
          </div>
        ))}
        <div className="flex items-center gap-3 rounded-lg border border-dashed border-card-border px-4 py-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-dashed border-accent/30 font-display text-[11px] text-accent">+</div>
          <span className="font-body text-sm text-muted">You</span>
        </div>
      </div>
      <button className="mt-6 w-full cursor-pointer rounded-xl bg-accent py-3 font-display text-sm font-semibold text-bg">
        Join Roster
      </button>
      <p className="mt-3 text-center font-body text-xs text-muted">Takes 10 seconds. No download needed.</p>
    </div>
  );
}

function WorkoutVisual() {
  const rows = [
    { name: "Bench Press", detail: "4 × 8 @ 135 lbs", done: true },
    { name: "Overhead Press", detail: "3 × 10 @ 85 lbs", done: true },
    { name: "DB Row", detail: "3 × 12 @ 40 lbs", done: false },
    { name: "Rear-Foot Split Squat", detail: "3 × 10 / side", done: false },
  ];
  return (
    <div className="rounded-2xl border border-card-border bg-card p-8">
      <div className="flex items-center justify-between">
        <span className="font-display text-lg font-semibold text-fg">Baseball Strength Session</span>
        <span className="rounded-md bg-accent/15 px-2.5 py-1 font-body text-xs font-semibold text-accent">2/4</span>
      </div>
      <div className="mt-5 space-y-3">
        {rows.map((r, i) => (
          <div
            key={i}
            className={`flex items-center justify-between rounded-xl px-4 py-3.5 ${
              r.done ? "border border-accent/20 bg-accent/[0.04]" : "border border-card-border bg-bg"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold ${r.done ? "bg-accent text-bg" : "border border-card-border text-muted"}`}>
                {r.done ? "✓" : ""}
              </div>
              <span className={`font-body text-sm ${r.done ? "text-fg" : "text-muted-light"}`}>{r.name}</span>
            </div>
            <span className="font-body text-xs text-muted">{r.detail}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between rounded-xl border border-card-border bg-bg px-4 py-3">
        <span className="font-body text-xs text-muted">Session duration</span>
        <span className="font-display text-sm font-bold text-fg">47:36</span>
      </div>
    </div>
  );
}

function BodyMapVisual() {
  const painData = [
    { name: "Throwing shoulder soreness", muscles: ["front-deltoids", "back-deltoids"] },
    { name: "Hamstring tightness", muscles: ["hamstring"] },
  ];
  return (
    <div className="rounded-2xl border border-card-border bg-card p-8">
      <div className="flex items-center justify-between">
        <span className="font-display text-lg font-semibold text-fg">Post-Session Check</span>
        <span className="rounded-md bg-pain/15 px-3 py-1 font-body text-xs font-semibold text-pain">2 flagged</span>
      </div>
      <div className="mx-auto mt-4 w-56">
        <Model
          data={painData}
          highlightedColors={["#f87171"]}
          bodyColor="#1a1f48"
          style={{ width: "100%", padding: "0" }}
          type="anterior"
        />
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <span className="rounded-full border border-pain/20 bg-pain/[0.06] px-3.5 py-1.5 font-body text-xs text-pain">Shoulder - Sore</span>
        <span className="rounded-full border border-pain/20 bg-pain/[0.06] px-3.5 py-1.5 font-body text-xs text-pain">Hamstring - Tight</span>
      </div>
      <p className="mt-4 text-center font-body text-xs text-muted">Tap a body part to flag soreness after throwing or sprint work</p>
    </div>
  );
}

function ProgressVisual() {
  const weeks = [40, 55, 50, 65, 60, 75, 85, 80, 90, 95, 88, 100];
  return (
    <div className="rounded-2xl border border-card-border bg-card p-8">
      <div className="flex items-center justify-between">
        <span className="font-display text-lg font-semibold text-fg">Your Progress</span>
        <span className="rounded-md bg-accent/15 px-2.5 py-1 font-body text-xs font-semibold text-accent">↑ 12% this month</span>
      </div>
      <div className="mt-6 flex items-end gap-2" style={{ height: 120 }}>
        {weeks.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-md bg-accent/20 transition-all"
            style={{ height: `${h}%`, background: i === weeks.length - 1 ? "#b4f469" : undefined }}
          />
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between px-1">
        <span className="font-body text-[10px] text-muted">12 weeks ago</span>
        <span className="font-body text-[10px] text-muted">This week</span>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-card-border bg-bg px-3 py-3 text-center">
          <p className="font-display text-lg font-bold text-accent">185 lbs</p>
          <p className="font-body text-xs text-muted">Bench PR</p>
        </div>
        <div className="rounded-xl border border-card-border bg-bg px-3 py-3 text-center">
          <p className="font-display text-lg font-bold text-fg">315 lbs</p>
          <p className="font-body text-xs text-muted">Trap Bar 1RM</p>
        </div>
        <div className="rounded-xl border border-card-border bg-bg px-3 py-3 text-center">
          <p className="font-display text-lg font-bold text-fg">52</p>
          <p className="font-body text-xs text-muted">Sessions</p>
        </div>
      </div>
      <div className="mt-4 rounded-xl border border-card-border bg-bg p-4">
        <div className="flex items-center justify-between">
          <p className="font-body text-xs text-muted">Recent wins</p>
          <p className="font-body text-[10px] text-muted">Last 2 weeks</p>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {["+10 lbs Bench", "+15 lbs Trap Bar", "+2 Pull-ups", "5 sessions done"].map((item, i) => (
            <div key={i} className="rounded-lg border border-card-border/80 px-3 py-2 text-center">
              <p className="font-body text-xs text-fg">{item}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 rounded-xl border border-accent/20 bg-accent/[0.04] px-4 py-3">
        <p className="font-body text-xs text-muted">Next target</p>
        <p className="mt-1 font-display text-sm font-semibold text-fg">Bench 190 lbs by next month</p>
      </div>
    </div>
  );
}

// coach visuals

function RosterVisual() {
  const players = [
    { name: "Ethan M.", status: "Active", sessions: 14 },
    { name: "Luis R.", status: "Active", sessions: 11 },
    { name: "Noah T.", status: "Active", sessions: 16 },
    { name: "Caleb P.", status: "Invited", sessions: 0 },
  ];
  return (
    <div className="rounded-2xl border border-card-border bg-card p-8">
      <div className="flex items-center justify-between">
        <div>
          <span className="font-display text-lg font-semibold text-fg">Varsity Baseball</span>
          <p className="mt-0.5 font-body text-xs text-muted">4 players · 3 active</p>
        </div>
        <span className="rounded-md bg-accent/15 px-2.5 py-1 font-body text-xs font-semibold text-accent">Season 2</span>
      </div>
      <div className="mt-5 space-y-2.5">
        {players.map((p, i) => (
          <div key={i} className="flex items-center justify-between rounded-xl border border-card-border bg-bg px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-card-border font-display text-xs font-bold text-fg">{p.name[0]}</div>
              <div>
                <span className="font-body text-sm text-fg">{p.name}</span>
                {p.sessions > 0 && <p className="font-body text-[10px] text-muted">{p.sessions} sessions</p>}
              </div>
            </div>
            <span className={`rounded-full px-2.5 py-0.5 font-body text-xs ${p.status === "Active" ? "bg-accent/10 text-accent" : "bg-card-border/50 text-muted"}`}>{p.status}</span>
          </div>
        ))}
      </div>
      <button className="mt-5 w-full cursor-pointer rounded-xl border border-dashed border-accent/30 bg-accent/[0.03] py-3 font-body text-sm text-accent">
        + Invite players
      </button>
    </div>
  );
}

function AssignVisual() {
  return (
    <div className="rounded-2xl border border-card-border bg-card p-8">
      <div className="flex items-center justify-between">
        <span className="font-display text-lg font-semibold text-fg">New Assignment</span>
        <span className="rounded-md bg-accent/15 px-2.5 py-1 font-body text-xs font-semibold text-accent">Draft</span>
      </div>
      <div className="mt-5 space-y-3">
        <div className="rounded-xl border border-card-border bg-bg px-4 py-3">
          <p className="font-body text-xs text-muted">Workout</p>
          <p className="mt-0.5 font-body text-sm text-fg">Upper Body Strength</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-card-border bg-bg px-4 py-3">
            <p className="font-body text-xs text-muted">Assign to</p>
            <p className="mt-0.5 font-body text-sm text-fg">Full roster</p>
          </div>
          <div className="rounded-xl border border-card-border bg-bg px-4 py-3">
            <p className="font-body text-xs text-muted">Schedule</p>
            <p className="mt-0.5 font-body text-sm text-fg">Mon / Wed / Fri</p>
          </div>
        </div>
        <div className="rounded-xl border border-card-border bg-bg px-4 py-3">
          <p className="font-body text-xs text-muted">Exercises</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {["Bench Press 4×8", "OHP 3×10", "DB Rows 3×12", "Face Pulls 3×15"].map((e, i) => (
              <span key={i} className="rounded-lg bg-card-border px-3 py-1.5 font-body text-xs text-fg">{e}</span>
            ))}
          </div>
        </div>
      </div>
      <button className="mt-6 w-full cursor-pointer rounded-xl bg-accent py-3.5 font-display text-sm font-semibold text-bg">
        Assign Workout
      </button>
    </div>
  );
}

function AlertsVisual() {
  const painData = [
    { name: "Shoulder", muscles: ["front-deltoids", "back-deltoids"] },
    { name: "Elbow", muscles: ["forearm"] },
  ];
  return (
    <div className="rounded-2xl border border-card-border bg-card p-8">
      <div className="flex items-center justify-between">
        <span className="font-display text-lg font-semibold text-fg">Arm Care Alerts</span>
        <span className="rounded-md bg-pain/15 px-3 py-1 font-body text-xs font-semibold text-pain">2 today</span>
      </div>
      <div className="mx-auto mt-4 w-48">
        <Model
          data={painData}
          highlightedColors={["#f87171"]}
          bodyColor="#1a1f48"
          style={{ width: "100%", padding: "0" }}
          type="anterior"
        />
      </div>
      <div className="mt-4 space-y-2.5">
        {[
          { player: "Noah T.", area: "Shoulder", severity: "Moderate", time: "12m ago" },
          { player: "Ethan M.", area: "Elbow", severity: "Mild", time: "28m ago" },
        ].map((a, i) => (
          <div key={i} className="flex items-center justify-between rounded-xl border border-pain/10 bg-pain/[0.03] px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-pain" />
              <div>
                <span className="font-body text-sm text-fg">{a.player}</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="rounded bg-pain/15 px-2 py-0.5 font-body text-[10px] text-pain">{a.area}</span>
                  <span className="font-body text-[10px] text-muted">{a.severity}</span>
                </div>
              </div>
            </div>
            <span className="font-body text-xs text-muted">{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardVisual() {
  const players = [
    { name: "Ethan M.", pct: 100 },
    { name: "Luis R.", pct: 100 },
    { name: "Noah T.", pct: 75 },
    { name: "Caleb P.", pct: 0 },
  ];
  return (
    <div className="rounded-2xl border border-card-border bg-card p-8">
      <div className="flex items-center justify-between">
        <span className="font-display text-lg font-semibold text-fg">Today&apos;s Overview</span>
        <span className="rounded-md bg-accent/15 px-2.5 py-1 font-body text-xs font-semibold text-accent">75% complete</span>
      </div>
      <div className="mt-5 space-y-3">
        {players.map((p, i) => (
          <div key={i} className="flex items-center gap-4 rounded-xl border border-card-border bg-bg px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-card-border font-display text-xs font-bold text-fg">{p.name[0]}</div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-body text-sm text-fg">{p.name}</span>
                <span className={`font-display text-xs font-bold ${p.pct === 100 ? "text-accent" : p.pct === 0 ? "text-muted" : "text-accent-dim"}`}>{p.pct}%</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full rounded-full bg-card-border">
                <div
                  className={`h-1.5 rounded-full ${p.pct === 100 ? "bg-accent" : p.pct > 0 ? "bg-accent-dim" : ""}`}
                  style={{ width: `${p.pct}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
        {[{ l: "Completed", v: "3/4" }, { l: "Feedback", v: "2" }, { l: "Pain Flags", v: "2" }].map((s, i) => (
          <div key={i} className="rounded-xl border border-card-border bg-bg px-3 py-3 text-center">
            <p className="font-display text-lg font-bold text-fg">{s.v}</p>
            <p className="font-body text-xs text-muted">{s.l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// view step data

const journeySteps = {
  athlete: [
    {
      num: "01",
      title: "Join your roster",
      desc: "Coach sends a link. You tap it, create your account, and you are on the baseball roster in seconds.",
      Visual: InviteVisual,
    },
    {
      num: "02",
      title: "Track your workouts",
      desc: "Open today's assignment and log your sets, reps, and weights as you train.",
      Visual: WorkoutVisual,
    },
    {
      num: "03",
      title: "Flag what hurts",
      desc: "After each session, tap the body map. Shoulder or elbow soreness gets to your coach before tomorrow's practice.",
      Visual: BodyMapVisual,
    },
    {
      num: "04",
      title: "Watch yourself improve",
      desc: "PRs, consistency, and training volume trends show your progress week after week.",
      Visual: ProgressVisual,
    },
  ],
  coach: [
    {
      num: "01",
      title: "Build your roster",
      desc: "Create your baseball roster, share one invite link, and players join in seconds.",
      Visual: RosterVisual,
    },
    {
      num: "02",
      title: "Assign the work",
      desc: "Build weight-room sessions, set recurring schedules, and assign them to the full roster or specific groups.",
      Visual: AssignVisual,
    },
    {
      num: "03",
      title: "Catch arm pain early",
      desc: "Players report soreness right after practice. You see body part, severity, and timing instantly.",
      Visual: AlertsVisual,
    },
    {
      num: "04",
      title: "See the full picture",
      desc: "See who completed drills, who needs feedback, and who has arm-care flags in one dashboard.",
      Visual: DashboardVisual,
    },
  ],
};

function StepBlock({ step, isActive }) {
  return (
    <div className="relative flex min-h-[95vh] flex-col justify-center py-16 md:min-h-screen md:py-20">
      <motion.div
        className="relative pl-0 lg:pl-10"
        animate={{
          opacity: isActive ? 1 : 0.24,
          y: isActive ? 0 : 10,
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <span
          className={`absolute top-6 -left-[6px] hidden h-3 w-3 rounded-full lg:block ${
            isActive ? "bg-accent shadow-[0_0_0_8px_rgba(180,244,105,0.14)]" : "bg-card-border"
          }`}
        />
        <span
          className={`font-display text-5xl font-bold md:text-6xl ${
            isActive ? "text-accent/45" : "text-accent/20"
          }`}
        >
          {step.num}
        </span>
        <h3 className="mt-4 font-display text-2xl font-bold text-fg md:text-3xl lg:text-4xl">
          {step.title}
        </h3>
        <p className="mt-4 max-w-md font-body text-base leading-relaxed text-muted-light md:text-lg">
          {step.desc}
        </p>
      </motion.div>

      {/* mobile visual */}
      <div className="mt-8 lg:hidden">
        <step.Visual />
      </div>
    </div>
  );
}

function VisualStack({ steps, activeStep }) {
  const ActiveVisual = steps[activeStep]?.Visual;

  return (
    <div className="rounded-[28px] border border-card-border/80 bg-gradient-to-b from-card to-[#0a0e22] p-4 shadow-[0_35px_100px_-45px_rgba(0,0,0,0.85)]">
      <div className="min-h-[560px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {ActiveVisual ? <ActiveVisual /> : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Journey({ view }) {
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const steps = journeySteps[view];
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const clamped = Math.min(1, Math.max(0, latest));
    const next = Math.min(
      steps.length - 1,
      Math.floor(clamped * steps.length)
    );
    setActiveStep((prev) => (prev === next ? prev : next));
  });

  return (
    <section id="journey" ref={sectionRef} className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="lg:grid lg:grid-cols-[5fr_7fr] lg:gap-16">
              {/* scrolling steps */}
              <div className="lg:pr-6">
                {steps.map((step, i) => (
                  <StepBlock
                    key={i}
                    step={step}
                    isActive={activeStep === i}
                  />
                ))}
              </div>

              {/* sticky visual on desktop */}
              <div className="hidden lg:block">
                <div className="sticky top-20 flex h-[calc(100vh-5rem)] items-center">
                  <div className="w-full">
                    <VisualStack steps={steps} activeStep={activeStep} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
