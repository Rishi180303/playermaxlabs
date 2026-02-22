import Navbar from "@/components/Navbar";
import Link from "next/link";
import {
  Activity,
  ChartColumnIncreasing,
  HeartPulse,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Activity,
    title: "Adaptive training",
    desc: "Programs that evolve with each athlete's recovery, readiness, and progress.",
  },
  {
    icon: ShieldCheck,
    title: "Injury prevention",
    desc: "Surface overload signals early so coaches can adjust before risk becomes injury.",
  },
  {
    icon: ChartColumnIncreasing,
    title: "Unified insights",
    desc: "Performance, recovery, and workload data in one place for smarter decisions.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 pt-36 pb-24">
        <section className="rounded-3xl border border-card-border bg-card p-8 md:p-12">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            About PlayerMax
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight text-fg md:text-6xl">
            Performance without compromise.
          </h1>
          <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-muted-light md:text-lg">
            Athletes train harder than ever — but generic programs, scattered
            data, and poor recovery visibility hold them back. PlayerMax gives
            coaches and athletes the tools to train smarter.
          </p>
        </section>

        <section className="mt-8 rounded-2xl border border-card-border bg-card p-8 md:p-10">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-fg">
            The problem
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <article className="rounded-xl border border-card-border bg-bg p-5">
              <div className="flex items-center gap-3">
                <Users className="text-accent" size={18} />
                <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-fg">
                  For coaches
                </p>
              </div>
              <p className="mt-3 font-body text-sm leading-relaxed text-muted-light">
                Training plans, performance data, and recovery signals are
                scattered across tools — making it hard to act on what matters.
              </p>
            </article>
            <article className="rounded-xl border border-card-border bg-bg p-5">
              <div className="flex items-center gap-3">
                <Target className="text-accent" size={18} />
                <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-fg">
                  For athletes
                </p>
              </div>
              <p className="mt-3 font-body text-sm leading-relaxed text-muted-light">
                One-size-fits-all programs ignore fatigue, soreness, and
                individual readiness — leading to plateaus or injury.
              </p>
            </article>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {features.map(({ icon: Icon, title, desc }) => (
            <article
              key={title}
              className="rounded-2xl border border-card-border bg-card p-7"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/12 text-accent">
                <Icon size={18} />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-fg">
                {title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-muted-light">
                {desc}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border border-card-border bg-card p-8 md:p-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-2xl font-semibold text-fg">
                Train smarter from day one.
              </h2>
              <p className="mt-2 max-w-xl font-body text-sm leading-relaxed text-muted-light">
                We're launching with a focused group of athletes and coaches.
                Join the waitlist to get early access.
              </p>
            </div>
            <Link
              href="/waitlist"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-display text-sm font-semibold text-bg transition-all hover:brightness-110"
            >
              <HeartPulse size={16} />
              Join the waitlist
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
