"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Platform", href: "/#journey" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  function handlePlatformClick(event, closeMobile = false) {
    if (closeMobile) setMobileOpen(false);

    if (pathname === "/") {
      event.preventDefault();
      const section = document.getElementById("journey");
      if (!section) return;
      const offsetTop = section.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: Math.max(0, offsetTop), behavior: "smooth" });
      return;
    }

    event.preventDefault();
    router.push("/#journey");
  }

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-card-border/50 bg-bg/70 backdrop-blur-2xl">
      <div className="mx-auto grid max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-8 px-6 py-5">
        <Link href="/" className="font-display text-[1.65rem] font-bold tracking-tight text-fg">
          playermax<span className="text-accent">.</span>
        </Link>

        <div className="hidden items-center justify-self-center gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="font-body text-[1.08rem] font-medium text-muted transition-colors hover:text-fg"
              onClick={l.label === "Platform" ? handlePlatformClick : undefined}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center justify-self-end lg:flex">
          <Link
            href="/waitlist"
            className="rounded-xl bg-accent px-5 py-2.5 font-display text-[1rem] font-semibold text-bg transition-all hover:brightness-110"
          >
            Join the waitlist
          </Link>
        </div>

        <button className="justify-self-end text-fg lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-card-border lg:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="font-body text-[1.05rem] text-muted"
                  onClick={
                    l.label === "Platform"
                      ? (event) => handlePlatformClick(event, true)
                      : () => setMobileOpen(false)
                  }
                >
                  {l.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-4">
                <Link
                  href="/waitlist"
                  className="rounded-xl bg-accent px-4 py-2.5 text-center font-display text-[1rem] font-semibold text-bg"
                  onClick={() => setMobileOpen(false)}
                >
                  Join the waitlist
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
