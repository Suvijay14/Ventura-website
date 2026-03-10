import { FeaturedArticles } from "@/components/FeaturedArticles";

export const metadata = {
  title: "Insights | Ventura",
  description:
    "Analysis and guidance for navigating EU AI Act requirements. Official resources and perspectives on AI compliance.",
};

export default function InsightsPage() {
  return (
    <main>
      <section className="pt-32 pb-16 bg-white">
        <div className="max-w-[900px] mx-auto px-8 lg:px-20 text-center">
          <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#64748b] mb-4">
            Regulatory Insights
          </p>
          <h1 className="text-[48px] sm:text-[56px] font-light leading-[1.2] text-[#0f172a] mb-6">
            Perspectives on AI Compliance
          </h1>
          <p className="text-xl text-[#64748b]">
            Analysis and guidance for navigating EU AI Act requirements
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#f8fafc]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-20">
          <FeaturedArticles />
        </div>
      </section>
    </main>
  );
}
