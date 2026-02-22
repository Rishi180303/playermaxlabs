"use client";

import { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  note: "",
};

export default function Footer() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  function onChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Unable to send your message right now.");
      }

      setForm(initialForm);
      setStatus({
        type: "success",
        message: "Thank you for your message. We will get back to you soon.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  function closeModal() {
    setOpen(false);
    setStatus({ type: "", message: "" });
    setForm(initialForm);
    setLoading(false);
  }

  return (
    <>
      <footer className="border-t border-card-border py-10">
        <div className="mx-auto grid max-w-6xl gap-5 px-6 text-center md:grid-cols-[auto_1fr] md:items-start md:text-left">
          <span className="font-display text-[1.08rem] font-bold text-fg">
            PlayerMax <span className="text-accent">Labs</span>
          </span>

          <div className="flex flex-col items-center gap-3 md:justify-self-end md:items-end">
            <p className="max-w-[560px] font-body text-[1.08rem] leading-snug text-muted-light md:text-right">
              If you have any questions, feel free to reach out.
            </p>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="rounded-xl bg-accent px-5 py-2.5 font-display text-[1.08rem] font-semibold text-bg transition-all hover:brightness-110"
            >
              Contact us
            </button>
          </div>
        </div>
      </footer>

      {open ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-6">
          <div className="w-full max-w-lg rounded-2xl border border-card-border bg-card p-6">
            {status.type === "success" ? (
              <div className="text-center">
                <p className="font-display text-2xl font-semibold text-fg">
                  Thank you
                </p>
                <p className="mt-3 font-body text-sm text-muted-light">
                  {status.message}
                </p>
                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-6 rounded-xl bg-accent px-5 py-2.5 font-display text-sm font-semibold text-bg"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display text-2xl font-semibold text-fg">
                      Contact PlayerMax
                    </p>
                    <p className="mt-2 font-body text-sm text-muted-light">
                      Send us your question and we will reply soon.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="font-body text-sm text-muted transition-colors hover:text-fg"
                  >
                    Close
                  </button>
                </div>

                <form className="mt-6 space-y-4" onSubmit={onSubmit}>
                  <div>
                    <label
                      htmlFor="contactName"
                      className="font-body text-sm font-medium text-fg"
                    >
                      Name *
                    </label>
                    <input
                      id="contactName"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={onChange}
                      required
                      className="mt-2 w-full rounded-lg border border-card-border bg-bg px-3 py-2.5 font-body text-sm text-fg placeholder:text-muted focus:border-accent focus:outline-none"
                      placeholder="e.g. John Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contactEmail"
                      className="font-body text-sm font-medium text-fg"
                    >
                      Email *
                    </label>
                    <input
                      id="contactEmail"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={onChange}
                      required
                      className="mt-2 w-full rounded-lg border border-card-border bg-bg px-3 py-2.5 font-body text-sm text-fg placeholder:text-muted focus:border-accent focus:outline-none"
                      placeholder="e.g. name@company.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contactNote"
                      className="font-body text-sm font-medium text-fg"
                    >
                      Note *
                    </label>
                    <textarea
                      id="contactNote"
                      name="note"
                      value={form.note}
                      onChange={onChange}
                      required
                      rows={4}
                      className="mt-2 w-full rounded-lg border border-card-border bg-bg px-3 py-2.5 font-body text-sm text-fg placeholder:text-muted focus:border-accent focus:outline-none"
                      placeholder="Write your question here..."
                    />
                  </div>

                  {status.type === "error" ? (
                    <p className="font-body text-xs text-pain">{status.message}</p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-accent px-4 py-3 font-display text-sm font-semibold text-bg transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
