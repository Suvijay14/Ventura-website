import Link from "next/link";

export const metadata = {
  title: "Get Started | Ventura",
  description:
    "Schedule a consultation or run a compliance assessment to understand your EU AI Act obligations.",
};

export default function GetStartedPage() {
  return (
    <main>
      <section className="pt-32 pb-24 bg-white min-h-[calc(100vh-5rem)] flex items-center">
        <div className="max-w-[800px] mx-auto px-8 lg:px-20 text-center">
          <h1 className="text-[48px] sm:text-[56px] font-light leading-[1.2] text-[#0f172a] mb-6">
            Get Started Today
          </h1>
          <p className="text-xl text-[#64748b] mb-12">
            Choose how you&apos;d like to begin your EU AI Act compliance
            journey.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Link
              href="/assessment"
              className="block p-8 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg hover:border-[#cbd5e1] hover:shadow-md transition-all text-left"
            >
              <h3 className="text-2xl font-light text-[#0f172a] mb-3">
                Compliance Assessment
              </h3>
              <p className="text-[#64748b] mb-6">
                Run our 5-step assessment to understand which AI Act
                obligations apply to your organization.
              </p>
              <span className="text-[15px] font-medium text-[#0f172a]">
                Start Assessment →
              </span>
            </Link>

            <div className="block p-8 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-left">
              <h3 className="text-2xl font-light text-[#0f172a] mb-3">
                Schedule Consultation
              </h3>
              <p className="text-[#64748b] mb-6">
                Speak with our compliance advisors to discuss your specific
                requirements and timeline.
              </p>
              <a
                href="mailto:hello@ventura.com"
                className="text-[15px] font-medium text-[#0f172a] hover:underline"
              >
                Contact Us →
              </a>
            </div>
          </div>

          <p className="text-sm text-[#64748b]">
            Or explore our{" "}
            <Link href="/demo" className="text-[#0f172a] hover:underline">
              interactive demo
            </Link>{" "}
            to see how Ventura identifies violations in source code.
          </p>
        </div>
      </section>
    </main>
  );
}
