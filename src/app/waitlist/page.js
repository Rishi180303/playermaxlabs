import Navbar from "@/components/Navbar";
import {
  CalendarCheck2,
  ClipboardCheck,
  MessageSquareText,
  Users,
} from "lucide-react";
import WaitlistForm from "@/components/WaitlistForm";

const features = [
  {
    title: "Roster + invites",
    detail: "Build your team and onboard players by link.",
    Icon: Users,
  },
  {
    title: "Recurring assignments",
    detail: "Set weekly plans with clear end dates.",
    Icon: CalendarCheck2,
  },
  {
    title: "Workout logging",
    detail: "Track lifts with sets, reps, and weight.",
    Icon: ClipboardCheck,
  },
  {
    title: "Body feedback loop",
    detail: "Capture soreness notes after every session.",
    Icon: MessageSquareText,
  },
];

export default function WaitlistPage() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 pt-36 pb-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <section className="rounded-2xl border border-card-border bg-card p-8 md:p-10">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              PlayerMax Labs
            </p>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-fg md:text-5xl">
              Training platform for coaches and athletes.
            </h1>
            <p className="mt-4 max-w-lg font-body text-base text-muted-light">
              Keep sessions organized, track progress, and respond to feedback
              from one clean system.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {features.map(({ title, detail, Icon }) => (
                <article
                  key={title}
                  className="rounded-xl border border-card-border bg-bg p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent">
                      <Icon size={17} />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-semibold text-fg">
                        {title}
                      </h3>
                      <p className="mt-1 font-body text-sm text-muted-light">
                        {detail}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-card-border bg-card p-8 md:p-10">
            <h2 className="font-display text-3xl font-bold tracking-tight text-fg">
              Join the waitlist
            </h2>
            <WaitlistForm />
          </section>
        </div>
      </main>
    </div>
  );
}
