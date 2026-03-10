"use client";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-[90px] pb-40"
    >
      <div className="max-w-[1400px] mx-auto px-8 lg:px-20 w-full">
        <div className="grid lg:grid-cols-[60%_40%] gap-16 lg:gap-24 items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#64748b] mb-6">
              Regulatory Compliance Advisory
            </p>
            <h1 className="text-[56px] sm:text-[64px] lg:text-[72px] font-light leading-[1.1] tracking-[-0.02em] text-[#0f172a] max-w-[600px]">
              Navigate EU AI Act Compliance with Precision
            </h1>
            <p className="mt-8 text-xl font-normal leading-[1.7] text-[#475569] max-w-[540px]">
              Automated regulatory analysis for artificial intelligence systems.
              Our proprietary technology identifies compliance gaps at the source
              code level, enabling organizations to address EU AI Act
              requirements systematically and efficiently.
            </p>
            <div className="mt-12 flex flex-wrap gap-10 items-center">
              <a
                href="#contact"
                className="inline-block px-9 py-4 border-2 border-[#0f172a] text-[#0f172a] text-[15px] font-medium hover:bg-[#0f172a] hover:text-white transition-colors"
              >
                Schedule Consultation
              </a>
              <a
                href="#"
                className="text-[15px] font-medium text-[#0f172a] underline underline-offset-4 hover:opacity-80 transition-opacity"
              >
                Download Framework
              </a>
            </div>
            <p className="mt-20 text-sm text-[#64748b]">
              Compliance deadline: 2 August 2026
            </p>
          </div>

          <div className="flex flex-col gap-20">
            <div>
              <div className="text-[80px] sm:text-[100px] lg:text-[120px] font-light text-[#0f172a] leading-none">
                €35M
              </div>
              <p className="mt-4 text-base text-[#64748b]">
                Maximum non-compliance penalty
              </p>
            </div>
            <div>
              <div className="text-[80px] sm:text-[100px] lg:text-[120px] font-light text-[#0f172a] leading-none">
                18 months
              </div>
              <p className="mt-4 text-base text-[#64748b]">
                Average time to manual compliance
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
