"use client";

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-[#0f172a] py-32 text-white"
    >
      <div className="max-w-[600px] mx-auto px-8 lg:px-20 text-center">
        <h2 className="text-[44px] sm:text-[52px] font-light leading-[1.15]">
          Begin Your Compliance Journey
        </h2>
        <p className="mt-8 text-lg text-[#94a3b8]">
          Schedule a consultation to discuss your organization&apos;s EU AI Act
          compliance requirements.
        </p>
        <a
          href="/assessment"
          className="inline-block mt-12 px-10 py-4 bg-white text-[#0f172a] text-base font-medium rounded hover:bg-[#f1f5f9] transition-colors"
        >
          Start Compliance Assessment
        </a>
        <p className="mt-8 text-[15px] text-[#94a3b8]">
          Or email us at{" "}
          <a
            href="mailto:hello@ventura.com"
            className="text-white hover:underline"
          >
            hello@ventura.com
          </a>
        </p>
      </div>
    </section>
  );
}
