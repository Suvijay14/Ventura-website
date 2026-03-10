import { VideoEmbed } from "@/components/VideoEmbed";
import { FeaturedArticles } from "@/components/FeaturedArticles";
import Link from "next/link";
import { officialVideos } from "@/lib/videos";

export const metadata = {
  title: "Understanding the EU AI Act | Ventura",
  description:
    "Official educational resources from European Union institutions. Learn what the AI Act means for your organization.",
};

const VIDEO_SOURCE_MAP: Record<string, "European Parliament" | "European Commission" | "Council of EU" | "AI4GOV"> = {
  "European Parliament": "European Parliament",
  "European Commission": "European Commission",
  "Council of the EU": "Council of EU",
  AI4GOV: "AI4GOV",
};

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-white pt-32">
      <section className="py-24 bg-[#f8fafc]">
        <div className="max-w-[900px] mx-auto px-8 lg:px-20 text-center">
          <h1 className="text-[48px] sm:text-[56px] font-light leading-[1.1] text-[#0f172a] mb-6">
            Understanding the
            <br />
            EU AI Act
          </h1>
          <p className="text-xl text-[#64748b]">
            Official educational resources from European Union institutions
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-20">
          <div className="mb-16">
            <h2 className="text-[36px] font-light text-[#0f172a] mb-4">
              Official Video Resources
            </h2>
            <p className="text-lg text-[#64748b]">
              Learn directly from the European institutions that created the AI
              Act
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-20">
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

          <div id="articles" className="border-t border-[#e2e8f0] pt-16 mb-16">
            <h2 className="text-[28px] font-light text-[#0f172a] mb-4">
              Official EU AI Act Articles
            </h2>
            <p className="text-[15px] text-[#64748b] mb-12">
              Verified sources from EUR-Lex, European Commission, and Parliament
            </p>
            <FeaturedArticles layout="list" />
          </div>

          <div className="border-t border-[#e2e8f0] pt-16">
            <h2 className="text-[28px] font-light text-[#0f172a] mb-12">
              Additional Resources
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Link
                href="/demo"
                className="p-8 bg-[#f8fafc] rounded-lg border border-[#e2e8f0] hover:border-[#cbd5e1] transition-colors"
              >
                <h3 className="text-[20px] font-medium text-[#0f172a] mb-3">
                  Code Analysis Demo
                </h3>
                <p className="text-[15px] text-[#64748b] mb-4">
                  See how Ventura identifies violations with line-by-line analysis
                </p>
                <span className="text-[15px] font-medium text-[#0f172a]">
                  View Demo →
                </span>
              </Link>
              <Link
                href="/assessment"
                className="p-8 bg-[#f8fafc] rounded-lg border border-[#e2e8f0] hover:border-[#cbd5e1] transition-colors"
              >
                <h3 className="text-[20px] font-medium text-[#0f172a] mb-3">
                  Compliance Assessment
                </h3>
                <p className="text-[15px] text-[#64748b] mb-4">
                  Assess which AI Act obligations apply to your organization
                </p>
                <span className="text-[15px] font-medium text-[#0f172a]">
                  Start Assessment →
                </span>
              </Link>
              <Link
                href="/capabilities"
                className="p-8 bg-[#f8fafc] rounded-lg border border-[#e2e8f0] hover:border-[#cbd5e1] transition-colors"
              >
                <h3 className="text-[20px] font-medium text-[#0f172a] mb-3">
                  Our Capabilities
                </h3>
                <p className="text-[15px] text-[#64748b] mb-4">
                  How Ventura helps you meet EU AI Act requirements
                </p>
                <span className="text-[15px] font-medium text-[#0f172a]">
                  Explore →
                </span>
              </Link>
              <a
                href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689"
                target="_blank"
                rel="noopener noreferrer"
                className="p-8 bg-[#f8fafc] rounded-lg border border-[#e2e8f0] hover:border-[#cbd5e1] transition-colors"
              >
                <h3 className="text-[20px] font-medium text-[#0f172a] mb-3">
                  Official EU Sources
                </h3>
                <p className="text-[15px] text-[#64748b] mb-4">
                  Visit EUR-Lex for the full AI Act regulation text
                </p>
                <span className="text-[15px] font-medium text-[#0f172a]">
                  Visit EUR-Lex →
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
