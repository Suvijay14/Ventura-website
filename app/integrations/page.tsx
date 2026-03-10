"use client";

import { useState } from "react";
import Link from "next/link";
import {
  integrations,
  getIntegrationsByCategory,
  type Integration,
} from "@/lib/integrations";

const tagColors: Record<string, string> = {
  green: "bg-emerald-100 text-emerald-800",
  blue: "bg-blue-100 text-blue-800",
  violet: "bg-violet-100 text-violet-800",
};

function IntegrationCard({ integration }: { integration: Integration }) {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-lg p-8 hover:border-[#cbd5e1] hover:shadow-lg transition-all duration-200">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-[#0f172a] rounded-lg flex items-center justify-center text-white font-semibold text-sm">
          {integration.name.slice(0, 2)}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-[#0f172a]">
            {integration.name}
          </h3>
          <p className="text-sm text-[#64748b]">{integration.category}</p>
        </div>
      </div>

      <p className="text-[#475569] mb-4 leading-relaxed">
        {integration.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {integration.tags.map((tag) => (
          <span
            key={tag.label}
            className={`px-3 py-1 text-xs font-semibold rounded ${tagColors[tag.color] || "bg-gray-100 text-gray-800"}`}
          >
            {tag.label}
          </span>
        ))}
      </div>

      <ul className="space-y-2 mb-6 text-sm text-[#475569]">
        {integration.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-emerald-600 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href={integration.docsHref}
        className="text-[#0f172a] text-sm font-medium hover:underline"
      >
        View documentation →
      </a>
    </div>
  );
}

const orbitalIntegrations = [
  { name: "GitHub", ring: 1 },
  { name: "GitLab", ring: 1 },
  { name: "VS Code", ring: 1 },
  { name: "JetBrains", ring: 1 },
  { name: "GitHub Actions", ring: 2 },
  { name: "Jenkins", ring: 2 },
  { name: "Slack", ring: 2 },
  { name: "Jira", ring: 2 },
  { name: "Teams", ring: 2 },
  { name: "AWS", ring: 3 },
  { name: "Azure", ring: 3 },
  { name: "SSO", ring: 3 },
];

export default function IntegrationsPage() {
  const [filter, setFilter] = useState<string | null>(null);
  const grouped = getIntegrationsByCategory();
  const filtered = filter
    ? grouped.filter((g) => g.category === filter)
    : grouped;

  return (
    <main>
      {/* CLI CTA - At top */}
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-[800px] mx-auto px-8 lg:px-20 text-center">
          <h2 className="text-2xl font-light text-[#0f172a] mb-4">
            CLI — Works Everywhere
          </h2>
          <p className="text-[#64748b] mb-6">
            The Ventura CLI runs in any environment. No integration required.
          </p>
          <pre className="bg-[#0f172a] text-[#e2e8f0] px-6 py-4 rounded-lg text-left overflow-x-auto text-sm font-mono">
            npm install -g @ventura/cli
          </pre>
          <Link
            href="/demo"
            className="inline-block mt-6 px-8 py-4 bg-[#0f172a] text-white text-[15px] font-medium rounded hover:bg-[#1e293b] transition-colors"
          >
            Try the Demo
          </Link>
        </div>
      </section>

      {/* Hero */}
      <section className="pt-16 pb-16 bg-white">
        <div className="max-w-[900px] mx-auto px-8 lg:px-20 text-center">
          <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#64748b] mb-4">
            Interoperable
          </p>
          <h1 className="text-[48px] sm:text-[56px] font-light leading-[1.2] text-[#0f172a] mb-6">
            Works with Your Stack
          </h1>
          <p className="text-xl text-[#64748b] mb-12">
            EU AI Act compliance fits into existing developer workflows—not
            separate processes. Add-on via API or plug-in.
          </p>

          {/* Orbital Visualization */}
          <div className="relative w-72 h-72 mx-auto mb-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-xl bg-[#0f172a] flex items-center justify-center text-white font-light text-sm">
                Ventura
              </div>
            </div>
            <div className="absolute inset-4 rounded-full border border-[#e2e8f0]" />
            <div className="absolute inset-8 rounded-full border border-[#e2e8f0] opacity-70" />
            <div className="absolute inset-12 rounded-full border border-[#e2e8f0] opacity-40" />
            {orbitalIntegrations.map((item, i) => {
              const angle = (i / orbitalIntegrations.length) * 360 - 90;
              const rad = (angle * Math.PI) / 180;
              const r = item.ring === 1 ? 52 : item.ring === 2 ? 88 : 124;
              const x = 144 + r * Math.cos(rad);
              const y = 144 + r * Math.sin(rad);
              return (
                <div
                  key={`${item.name}-${i}`}
                  className="absolute w-11 h-11 -ml-[22px] -mt-[22px] flex items-center justify-center rounded-lg bg-white border border-[#e2e8f0] text-[9px] font-medium text-[#64748b] shadow-sm"
                  style={{ left: x, top: y }}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
          <p className="text-sm text-[#94a3b8]">
            GitHub, GitLab, VS Code, Slack, Teams, SSO, and more
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-6 bg-[#f8fafc] border-y border-[#e2e8f0]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-20">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setFilter(null)}
              className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                !filter
                  ? "bg-[#0f172a] text-white"
                  : "bg-white text-[#64748b] hover:bg-[#f1f5f9] border border-[#e2e8f0]"
              }`}
            >
              All
            </button>
            {grouped.map((g) => (
              <button
                key={g.category}
                onClick={() => setFilter(filter === g.category ? null : g.category)}
                className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                  filter === g.category
                    ? "bg-[#0f172a] text-white"
                    : "bg-white text-[#64748b] hover:bg-[#f1f5f9] border border-[#e2e8f0]"
                }`}
              >
                {g.category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Cards by Category */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-20">
          {filtered.map((group) => (
            <div key={group.category} className="mb-16 last:mb-0">
              <h2 className="text-2xl font-light text-[#0f172a] mb-8">
                {group.category}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {group.integrations.map((integration) => (
                  <IntegrationCard
                    key={integration.id}
                    integration={integration}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
