import Link from "next/link";
import PlatformVisualization from "@/components/PlatformVisualization";
import { mvpUrl } from "@/lib/mvp-url";

export default function HomePage() {
  const tryDemoHref = mvpUrl("/login");

  return (
    <main>
      {/* Hero - Two-column: content left (60%), stats right (40%) */}
      <section className="pt-32 pb-20 md:pb-32 bg-white min-h-[calc(100vh-5rem)] flex items-center">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-20 w-full">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            {/* LEFT COLUMN - 60% (3/5 columns) */}
            <div className="lg:col-span-3">
              <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#64748b] mb-6">
                Regulatory Compliance Advisory
              </p>
              <h1 className="text-[44px] sm:text-[56px] lg:text-[64px] font-light leading-[1.1] tracking-[-0.02em] text-[#0f172a] mb-6">
                Navigate EU AI Act Compliance with Precision
              </h1>
              <p className="text-lg md:text-xl text-[#475569] leading-relaxed mb-8 max-w-xl">
                Automated regulatory analysis for AI systems. Proprietary technology
                identifies compliance gaps at the source code level.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-10">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#64748b] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#475569]">Automated code analysis against 113 articles</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#64748b] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#475569]">Real-time violation detection</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#64748b] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#475569]">Expert consulting guidance</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#64748b] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#475569]">Production-ready in days, not months</span>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <a
                  href={tryDemoHref}
                  className="inline-flex items-center justify-center w-full py-6 sm:py-7 md:py-8 px-10 sm:px-14 md:px-16 bg-[#0f172a] text-white text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight hover:bg-[#1e293b] transition-colors shadow-md min-h-[4.5rem] sm:min-h-[5rem] md:min-h-[5.5rem]"
                >
                  Try Demo
                </a>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/get-started"
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#0f172a] text-[#0f172a] text-[15px] font-medium hover:bg-[#0f172a] hover:text-white transition-colors"
                  >
                    Schedule Consultation
                  </Link>
                  <Link
                    href="/demo"
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#e2e8f0] text-[#0f172a] text-[15px] font-medium hover:border-[#0f172a] transition-colors"
                  >
                    See Demo
                  </Link>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - 40% (2/5 columns) - Stats cards */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div className="bg-[#f8fafc] p-8 rounded-2xl border border-[#e2e8f0] shadow-sm">
                  <div className="text-5xl sm:text-6xl font-light text-[#0f172a] mb-2">€35M</div>
                  <p className="text-[#64748b] text-base">Maximum non-compliance penalty</p>
                </div>
                <div className="bg-[#f8fafc] p-8 rounded-2xl border border-[#e2e8f0] shadow-sm">
                  <div className="text-5xl sm:text-6xl font-light text-[#0f172a] mb-2">18 months</div>
                  <p className="text-[#64748b] text-base">Average time to manual compliance</p>
                </div>
                <div className="bg-[#f8fafc] p-8 rounded-2xl border border-[#e2e8f0] shadow-sm">
                  <div className="text-3xl sm:text-4xl font-light text-[#0f172a] mb-2">August 2, 2026</div>
                  <p className="text-[#64748b] text-base">High-risk AI compliance deadline</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Visualization - Circular Workflow */}
      <PlatformVisualization />

      {/* Trust Indicators */}
      <section className="py-12 bg-[#f8fafc]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-20">
          <p className="text-center text-[11px] uppercase tracking-[0.15em] font-semibold text-[#64748b] mb-8">
            Trusted by Leading AI Companies
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {["Mistral AI", "Shift Technology", "Dataiku", "Hugging Face"].map((name) => (
              <div
                key={name}
                className="h-8 flex items-center justify-center text-[#94a3b8] text-sm font-medium grayscale opacity-70 hover:opacity-100 hover:text-[#64748b] transition-all"
              >
                {name}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-[#e2e8f0] rounded">
              <svg className="w-5 h-5 text-[#64748b] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm font-medium text-[#1e293b]">SOC 2 Type II</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-[#e2e8f0] rounded">
              <svg className="w-5 h-5 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-sm font-medium text-[#1e293b]">GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-[#e2e8f0] rounded">
              <svg className="w-5 h-5 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <span className="text-sm font-medium text-[#1e293b]">Zero Data Retention</span>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Code Example */}
      <section className="py-20 bg-white border-t border-[#e2e8f0]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-20">
          <h2 className="text-3xl font-light text-[#0f172a] text-center mb-4">
            See Ventura in Action
          </h2>
          <p className="text-[#64748b] text-center mb-12 max-w-[600px] mx-auto">
            Ventura detects prohibited bias indicators and suggests compliant alternatives
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
            <div className="border border-[#e2e8f0] bg-[#f8fafc] rounded-lg overflow-hidden">
              <div className="px-4 py-2 bg-[#f1f5f9] border-b border-[#e2e8f0] flex items-center gap-2">
                <svg className="w-4 h-4 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-sm font-semibold text-[#475569]">Before — Article 10 violation</span>
              </div>
              <pre className="p-6 text-sm font-mono text-[#475569] overflow-x-auto">
{`features = [
  'age',      # ⚠️ Prohibited Article 10(2)(f)
  'gender'    # ⚠️ Prohibited Article 10(2)(f)
]`}
              </pre>
            </div>
            <div className="border border-emerald-200 bg-emerald-50/30 rounded-lg overflow-hidden">
              <div className="px-4 py-2 bg-emerald-100 border-b border-emerald-200 flex items-center gap-2">
                <svg className="w-4 h-4 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-semibold text-[#475569]">After — Compliant</span>
              </div>
              <pre className="p-6 text-sm font-mono text-[#475569] overflow-x-auto">
{`features = [
  'education',
  'experience',
  'skills'
]`}
              </pre>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link
              href="/demo"
              className="inline-block px-6 py-3 bg-[#0f172a] text-white text-sm font-medium rounded hover:bg-[#1e293b] transition-colors"
            >
              Try with your code
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-[#f8fafc]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-20">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-light text-[#0f172a] mb-1">
                August 2, 2026
              </div>
              <p className="text-sm text-[#64748b]">Compliance deadline</p>
            </div>
            <div>
              <div className="text-2xl font-light text-[#0f172a] mb-1">
                50+ Rules
              </div>
              <p className="text-sm text-[#64748b]">Automated analysis</p>
            </div>
            <div>
              <div className="text-2xl font-light text-[#0f172a] mb-1">
                &lt; 5 min
              </div>
              <p className="text-sm text-[#64748b]">Scan 100K lines</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Updates */}
      <section className="py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-20">
          <h2 className="text-3xl font-light text-[#0f172a] mb-12">
            Latest Updates
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/news/ai-day-2026" className="block group">
              <span className="inline-block px-3 py-1 bg-[#f1f5f9] text-[#64748b] text-xs font-semibold rounded mb-3">
                Announcement
              </span>
              <h3 className="text-xl font-semibold text-[#0f172a] mb-2 group-hover:text-[#0f172a] transition-colors">
                Ventura Launches at AI Day 2026
              </h3>
              <p className="text-sm text-[#64748b] mb-2">March 3, 2026</p>
              <p className="text-[#475569] text-sm">
                Introducing automated EU AI Act compliance for developers...
              </p>
            </Link>
            <Link href="/news/prohibited-deadline" className="block group">
              <span className="inline-block px-3 py-1 bg-[#f1f5f9] text-[#64748b] text-xs font-semibold rounded mb-3">
                Regulatory
              </span>
              <h3 className="text-xl font-semibold text-[#0f172a] mb-2 group-hover:text-[#0f172a] transition-colors">
                Prohibited Practices Deadline
              </h3>
              <p className="text-sm text-[#64748b] mb-2">February 2025</p>
              <p className="text-[#475569] text-sm">
                Provisions on prohibited AI practices came into force...
              </p>
            </Link>
            <Link href="/news/cli-1.0" className="block group">
              <span className="inline-block px-3 py-1 bg-[#f1f5f9] text-[#64748b] text-xs font-semibold rounded mb-3">
                Product
              </span>
              <h3 className="text-xl font-semibold text-[#0f172a] mb-2 group-hover:text-[#0f172a] transition-colors">
                Ventura CLI 1.0 Release
              </h3>
              <p className="text-sm text-[#64748b] mb-2">March 1, 2026</p>
              <p className="text-[#475569] text-sm">
                First stable release of the Ventura CLI...
              </p>
            </Link>
          </div>
          <div className="text-center mt-12">
            <Link
              href="/news"
              className="text-[#0f172a] font-medium hover:underline"
            >
              View all updates →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-20">
          <h2 className="text-3xl font-light text-[#0f172a] text-center mb-12">
            What Our Clients Say
          </h2>
          <div className="max-w-[700px] mx-auto">
            <blockquote className="text-xl text-[#475569] leading-relaxed italic mb-6">
              &ldquo;Ventura reduced our compliance review time from 3 months to 2 weeks.
              The article-level mapping made it clear exactly what we needed to fix.&rdquo;
            </blockquote>
            <footer className="text-[#64748b]">
              — CTO, European AI Startup
            </footer>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-[600px] mx-auto px-8 lg:px-20 text-center">
          <h2 className="text-4xl font-light text-[#0f172a] mb-6">
            Begin Your Compliance Journey
          </h2>
          <p className="text-xl text-[#64748b] mb-8">
            Schedule a consultation to discuss your organization&apos;s EU AI
            Act requirements
          </p>
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
