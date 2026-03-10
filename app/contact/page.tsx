import Link from "next/link";

export const metadata = {
  title: "Contact | Ventura",
  description:
    "Schedule a consultation to discuss your organization's EU AI Act compliance requirements.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="pt-32 pb-24 bg-[#0f172a] text-white min-h-[calc(100vh-5rem)] flex items-center">
        <div className="max-w-[600px] mx-auto px-8 lg:px-20 text-center">
          <h1 className="text-[44px] sm:text-[52px] font-light leading-[1.15] mb-8">
            Begin Your Compliance Journey
          </h1>
          <p className="text-lg text-[#94a3b8] mb-12">
            Schedule a consultation to discuss your organization&apos;s EU AI
            Act compliance requirements.
          </p>
          <Link
            href="/get-started"
            className="inline-block px-10 py-4 bg-white text-[#0f172a] text-base font-medium rounded hover:bg-[#f1f5f9] transition-colors"
          >
            Start Compliance Assessment
          </Link>
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
    </main>
  );
}
