"use client";

import { VideoEmbed } from "./VideoEmbed";

export default function VideoSection() {
  return (
    <section className="bg-white py-40">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <VideoEmbed
              videoId="7PTqb0YxOCs"
              title="European Parliament: MEPs on the AI Act"
              source="European Parliament"
              description="AI Coffeebreak interviews leading MEPs on the EU's Artificial Intelligence Act. Hear from legislators who shaped the world's first comprehensive AI regulation."
              variant="inline"
            />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#64748b] mb-4">
              Official EU Resource
            </p>
            <h2 className="text-[36px] sm:text-[42px] font-light leading-[1.2] text-[#0f172a]">
              The Regulation is Real.
              <br />
              The Deadline is Fixed.
            </h2>
            <p className="mt-6 text-[17px] leading-[1.75] text-[#475569]">
              On March 13, 2024, the European Parliament formally adopted the AI
              Act—the world&apos;s first comprehensive AI regulation. This
              isn&apos;t a proposal or draft. It&apos;s law.
            </p>
            <p className="mt-6 text-[17px] leading-[1.75] text-[#475569]">
              High-risk AI systems must comply by August 2, 2026. Ventura helps
              you meet these requirements systematically, at the source code
              level.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/assessment"
                className="px-6 py-3 border-2 border-[#0f172a] text-[#0f172a] text-[15px] font-medium hover:bg-[#0f172a] hover:text-white transition-colors"
              >
                Check Your Compliance
              </a>
              <a
                href="/learn"
                className="px-6 py-3 text-[15px] font-medium text-[#0f172a] hover:opacity-80 transition-opacity"
              >
                Learn More →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
