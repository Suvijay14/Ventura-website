"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import InteractiveViolationDemo from "@/components/InteractiveViolationDemo";

export default function DemoPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!email || !email.includes("@")) {
        throw new Error("Please enter a valid email address");
      }

      if (!supabase) {
        throw new Error(
          "Demo request service is not configured. Please add Supabase credentials to .env.local"
        );
      }

      const { error: supabaseError } = await supabase
        .from("demo_requests")
        .insert([
          {
            email: email.toLowerCase().trim(),
            name: name.trim() || null,
            company: company.trim() || null,
          },
        ])
        .select();

      if (supabaseError) {
        throw supabaseError;
      }

      try {
        await fetch("/api/notify-demo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, name, company }),
        });
      } catch {
        // Notification is best-effort
      }

      setSubmitted(true);
      setEmail("");
      setName("");
      setCompany("");
    } catch (err: unknown) {
      console.error("Error submitting demo request:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-12 bg-white">
        <div className="max-w-[900px] mx-auto px-8 lg:px-20 text-center">
          <h1 className="text-[48px] sm:text-[56px] font-light leading-[1.2] text-[#0f172a] mb-6">
            See Ventura in Action
          </h1>
          <p className="text-xl text-[#64748b]">
            Interactive demonstration of source code compliance analysis
          </p>
        </div>
      </section>

      {/* Demo bar */}
      <div className="bg-[#f8fafc] border-b border-[#e2e8f0] py-6 px-8">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <p className="text-sm text-[#64748b]">
            Demo: Edit the code to fix violations in real-time
          </p>
          <Link
            href="/get-started"
            className="text-sm font-medium text-[#0f172a] hover:opacity-80"
          >
            Run your own assessment →
          </Link>
        </div>
      </div>

      {/* Interactive demo */}
      <InteractiveViolationDemo />

      {/* Email capture section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Benefits */}
            <div>
              <div className="inline-block mb-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
                  <span>REQUEST A DEMO</span>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                Want a personalized{" "}
                <span className="text-indigo-600">walkthrough?</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Join enterprise leaders using Ventura to transform EU AI Act
                compliance. We&apos;ll show you how teams go from months of
                delays to shipping AI in days – with full visibility, continuous
                testing, and audit-ready evidence.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-indigo-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 text-indigo-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm">
                    Full visibility into AI systems
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-indigo-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 text-indigo-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm">
                    Continuous risk testing
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-indigo-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 text-indigo-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm">
                    Audit-ready evidence
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-indigo-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 text-indigo-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm">
                    Ship AI projects faster
                  </span>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div>
              {submitted ? (
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <svg
                      className="w-7 h-7 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-light text-gray-900 mb-3">
                    Request Received!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We&apos;ll be in touch within 24 hours to schedule your
                    personalized demo.
                  </p>
                  <a
                    href="/"
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    ← Back to Homepage
                  </a>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email*
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition"
                        placeholder="you@company.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition"
                        placeholder="Acme Inc."
                      />
                    </div>
                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-800">{error}</p>
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Submitting..." : "Request Demo"}
                    </button>
                    <p className="text-xs text-gray-500 text-center">
                      By submitting, you agree to our{" "}
                      <a
                        href="/privacy"
                        className="text-indigo-600 hover:underline"
                      >
                        Privacy Policy
                      </a>
                      . We&apos;ll never share your information.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
