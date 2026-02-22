"use client";

import { useState } from "react";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  role: "",
  countryCode: "+1",
  phone: "",
};

export default function WaitlistForm() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ open: false, message: "", type: "success" });

  function onChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Unable to submit right now.");
      }

      setForm(initialState);
      setPopup({
        open: true,
        type: "success",
        message:
          "Thanks for your interest. We got your details and will get back to you soon.",
      });
    } catch (error) {
      setPopup({
        open: true,
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

  return (
    <>
      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="firstName"
              className="font-body text-sm font-medium text-fg"
            >
              First Name *
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              value={form.firstName}
              onChange={onChange}
              placeholder="e.g. John"
              className="mt-2 w-full rounded-lg border border-card-border bg-bg px-3 py-2.5 font-body text-sm text-fg placeholder:text-muted focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="font-body text-sm font-medium text-fg"
            >
              Last Name *
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              value={form.lastName}
              onChange={onChange}
              placeholder="e.g. Doe"
              className="mt-2 w-full rounded-lg border border-card-border bg-bg px-3 py-2.5 font-body text-sm text-fg placeholder:text-muted focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="font-body text-sm font-medium text-fg">
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={onChange}
            placeholder="e.g. johndoe@company.com"
            className="mt-2 w-full rounded-lg border border-card-border bg-bg px-3 py-2.5 font-body text-sm text-fg placeholder:text-muted focus:border-accent focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="company"
            className="font-body text-sm font-medium text-fg"
          >
            Company/School Name *
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            value={form.company}
            onChange={onChange}
            placeholder="e.g. Acme Ltd"
            className="mt-2 w-full rounded-lg border border-card-border bg-bg px-3 py-2.5 font-body text-sm text-fg placeholder:text-muted focus:border-accent focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="role" className="font-body text-sm font-medium text-fg">
            Role *
          </label>
          <input
            id="role"
            name="role"
            type="text"
            required
            value={form.role}
            onChange={onChange}
            placeholder="e.g. Operations"
            className="mt-2 w-full rounded-lg border border-card-border bg-bg px-3 py-2.5 font-body text-sm text-fg placeholder:text-muted focus:border-accent focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="phone" className="font-body text-sm font-medium text-fg">
            Phone Number
          </label>
          <div className="mt-2 grid gap-3 sm:grid-cols-[170px_1fr]">
            <select
              id="countryCode"
              name="countryCode"
              value={form.countryCode}
              onChange={onChange}
              className="rounded-lg border border-card-border bg-bg px-3 py-2.5 font-body text-sm text-fg focus:border-accent focus:outline-none"
            >
              <option value="+1">United States +1</option>
              <option value="+44">United Kingdom +44</option>
              <option value="+61">Australia +61</option>
              <option value="+91">India +91</option>
            </select>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={onChange}
              placeholder="+1 201-555-0123"
              className="w-full rounded-lg border border-card-border bg-bg px-3 py-2.5 font-body text-sm text-fg placeholder:text-muted focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-xl bg-accent px-4 py-3 font-display text-sm font-semibold text-bg transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {popup.open ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-6">
          <div className="w-full max-w-md rounded-2xl border border-card-border bg-card p-6 text-center">
            <p className="font-display text-2xl font-semibold text-fg">
              {popup.type === "success" ? "Thank you" : "Something went wrong"}
            </p>
            <p className="mt-3 font-body text-sm leading-relaxed text-muted-light">
              {popup.message}
            </p>
            <button
              type="button"
              onClick={() => setPopup({ open: false, message: "", type: "success" })}
              className="mt-6 rounded-xl bg-accent px-5 py-2.5 font-display text-sm font-semibold text-bg"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
