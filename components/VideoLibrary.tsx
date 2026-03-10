"use client";

import { VideoEmbed } from "./VideoEmbed";
import { officialVideos } from "@/lib/videos";

const VIDEO_SOURCE_MAP: Record<string, "European Parliament" | "European Commission" | "Council of EU" | "AI4GOV"> = {
  "European Parliament": "European Parliament",
  "European Commission": "European Commission",
  "Council of the EU": "Council of EU",
  AI4GOV: "AI4GOV",
};

export default function VideoLibrary() {
  return (
    <section className="bg-[#f8fafc] py-40">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-20">
        <div className="text-center mb-16">
          <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#64748b] mb-4">
            Educational Resources
          </p>
          <h2 className="text-[42px] sm:text-[48px] font-light leading-[1.2] text-[#0f172a] mb-6">
            Understand the EU AI Act
          </h2>
          <p className="text-xl text-[#64748b] max-w-[700px] mx-auto">
            Learn from official European Union sources. These videos from the
            European Parliament, Commission, and Council explain what the AI Act
            means and why it matters.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {officialVideos.map((video) => (
            <VideoEmbed
              key={video.id}
              videoId={video.youtubeId}
              title={video.title}
              source={VIDEO_SOURCE_MAP[video.institution] ?? "European Commission"}
              description={video.description}
              variant="card"
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-6 py-4 bg-white border border-[#e2e8f0] rounded-lg">
            <span className="text-[14px] text-[#64748b]">
              For more official resources, visit
            </span>
            <a
              href="https://www.europarl.europa.eu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] font-medium text-[#0f172a] hover:underline"
            >
              European Parliament
            </a>
            <span className="text-[14px] text-[#64748b]">and</span>
            <a
              href="https://digital-strategy.ec.europa.eu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] font-medium text-[#0f172a] hover:underline"
            >
              European Commission
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
