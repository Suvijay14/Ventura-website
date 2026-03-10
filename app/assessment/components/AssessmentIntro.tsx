"use client";

import { VideoEmbed } from "@/components/VideoEmbed";

export default function AssessmentIntro() {
  return (
    <div className="bg-[#f8fafc] border-b border-[#e2e8f0]">
      <div className="max-w-[1000px] mx-auto px-8 lg:px-20 py-16">
        <div className="grid lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-3">
            <VideoEmbed
              videoId="s_rxOnCt3HQ"
              title="EU AI Act Explained"
              source="European Commission"
              description="Official overview from the European Commission"
              variant="inline"
            />
          </div>
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <svg
                className="w-6 h-6 text-[#64748b]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="text-[18px] font-medium text-[#0f172a]">
                Before You Begin
              </h3>
            </div>
            <p className="text-[15px] text-[#64748b] leading-relaxed mb-4">
              Watch this official explanation from the European Commission to
              understand what the AI Act is and why it matters for your
              organization.
            </p>
            <p className="text-[15px] text-[#64748b] leading-relaxed">
              The assessment below will help you determine which obligations
              apply to your AI systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
