import Link from "next/link";

export const metadata = {
  title: "About | Ventura",
  description:
    "Ventura delivers EU AI Act compliance through automated source code analysis. Helping organizations address regulatory requirements systematically.",
};

export default function AboutPage() {
  return (
    <main>
      <section className="pt-32 pb-16 bg-white">
        <div className="max-w-[900px] mx-auto px-8 lg:px-20">
          <h1 className="text-[48px] sm:text-[56px] font-light leading-[1.2] text-[#0f172a] mb-6">
            About Ventura
          </h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-[#64748b] leading-relaxed mb-6">
              Ventura delivers EU AI Act compliance through automated source
              code analysis. Founded in 2026, we help organizations
              systematically address regulatory requirements while maintaining
              development velocity.
            </p>
            <p className="text-lg text-[#64748b] leading-relaxed mb-6">
              Our proprietary technology identifies compliance gaps at the
              source code level, enabling organizations to address EU AI Act
              requirements systematically and efficiently. We combine
              regulatory expertise with technical analysis to reduce compliance
              timelines and deliver actionable insights.
            </p>
            <p className="text-lg text-[#64748b] leading-relaxed">
              Organizations deploying artificial intelligence systems face
              unprecedented regulatory complexity. The European Union&apos;s
              Artificial Intelligence Act introduces comprehensive requirements
              for high-risk AI systems across employment, financial services,
              healthcare, and critical infrastructure sectors. Ventura applies
              source code analysis to identify regulatory gaps systematically.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#f8fafc]">
        <div className="max-w-[600px] mx-auto px-8 text-center">
          <Link
            href="/get-started"
            className="inline-block px-8 py-4 bg-[#0f172a] text-white text-[15px] font-medium rounded hover:bg-[#1e293b] transition-colors"
          >
            Schedule Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
