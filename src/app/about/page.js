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

const coachChallenges = [
  "Training plans spread across multiple tools",
  "Performance data split across systems",
  "Recovery feedback arriving inconsistently",
];

const athleteChallenges = [
  "Following the same plan as everyone else",
  "Limited guidance when fatigue or soreness shows up",
  "Pushing through warning signs without clarity",
];

const beliefs = [
  "Athletes deserve training that adapts to them.",
  "Health and recovery are essential to long-term performance.",
  "Coaches need tools that scale without losing insight.",
  "Real progress comes from informed adjustments, not guesswork.",
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
            Built to improve performance without sacrificing athlete health.
          </h1>
          <p className="mt-6 max-w-3xl font-body text-base leading-relaxed text-muted-light md:text-lg">
            Athletes are training harder than ever, but development often comes
            with burnout, poor recovery visibility, and generic programming.
            PlayerMax brings structure, personalization, and clarity so coaches
            and athletes can adapt training in time.
          </p>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-card-border bg-card p-7">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/12 text-accent">
                <Users size={18} />
              </div>
              <h2 className="font-display text-2xl font-semibold text-fg">
                Why coaches struggle
              </h2>
            </div>
            <ul className="mt-5 space-y-2.5">
              {coachChallenges.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-card-border bg-bg px-4 py-3 font-body text-sm text-muted-light"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-card-border bg-card p-7">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/12 text-accent">
                <Activity size={18} />
              </div>
              <h2 className="font-display text-2xl font-semibold text-fg">
                Why athletes get stuck
              </h2>
            </div>
            <ul className="mt-5 space-y-2.5">
              {athleteChallenges.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-card-border bg-bg px-4 py-3 font-body text-sm text-muted-light"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mt-8 rounded-2xl border border-card-border bg-card p-8 md:p-10">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-fg">
            What PlayerMax does
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <article className="rounded-xl border border-card-border bg-bg p-5">
              <p className="font-display text-sm uppercase tracking-[0.14em] text-accent">
                Athlete side
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed text-muted-light">
                Track workouts, monitor progress, and submit body and recovery
                feedback after each session.
              </p>
            </article>
            <article className="rounded-xl border border-card-border bg-bg p-5">
              <p className="font-display text-sm uppercase tracking-[0.14em] text-accent">
                Coach side
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed text-muted-light">
                Assign training programs, monitor readiness in one place, and
                adjust workload before risk becomes injury.
              </p>
            </article>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-card-border bg-card p-7">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-accent" size={18} />
              <h3 className="font-display text-2xl font-semibold text-fg">
                Built to support coaching
              </h3>
            </div>
            <p className="mt-4 font-body text-sm leading-relaxed text-muted-light">
              PlayerMax does not replace coaching judgment. It surfaces patterns,
              trends, and possible overload signals so better decisions can be
              made earlier.
            </p>
          </article>
          <article className="rounded-2xl border border-card-border bg-card p-7">
            <div className="flex items-center gap-3">
              <ChartColumnIncreasing className="text-accent" size={18} />
              <h3 className="font-display text-2xl font-semibold text-fg">
                Built for long-term progress
              </h3>
            </div>
            <p className="mt-4 font-body text-sm leading-relaxed text-muted-light">
              Performance and well-being are one system. Athletes improve faster
              when training evolves with their recovery, not against it.
            </p>
          </article>
        </section>

        <section className="mt-8 rounded-2xl border border-card-border bg-card p-8 md:p-10">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-fg">
            Our belief
          </h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {beliefs.map((item) => (
              <article
                key={item}
                className="rounded-xl border border-card-border bg-bg p-4"
              >
                <div className="flex items-start gap-3">
                  <Target className="mt-0.5 text-accent" size={16} />
                  <p className="font-body text-sm text-muted-light">{item}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-card-border bg-card p-8 md:p-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Looking ahead
              </p>
              <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-muted-light md:text-base">
                We are launching with a focused group of athletes and coaches,
                then expanding toward a future where training across sports is
                smarter, safer, and personalized by default.
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
