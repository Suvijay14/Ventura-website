import Link from "next/link";

export const metadata = {
  title: "Security & Privacy | Ventura",
  description:
    "Ventura's security practices, zero data retention policy, and compliance certifications. Privacy-first architecture for EU AI Act compliance.",
};

export default function SecurityPage() {
  return (
    <main>
      <section className="pt-32 pb-16 bg-white">
        <div className="max-w-[900px] mx-auto px-8 lg:px-20 text-center">
          <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#64748b] mb-4">
            Security & Privacy
          </p>
          <h1 className="text-[48px] sm:text-[56px] font-light leading-[1.2] text-[#0f172a] mb-6">
            Privacy-First Compliance
          </h1>
          <p className="text-xl text-[#64748b]">
            Zero data retention. Your code never leaves your environment.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#f8fafc]">
        <div className="max-w-[800px] mx-auto px-8 lg:px-20 space-y-16">
          <div>
            <h2 className="text-2xl font-light text-[#0f172a] mb-4">
              Zero Data Retention
            </h2>
            <p className="text-[#475569] leading-relaxed mb-4">
              Ventura processes your source code locally or within your own infrastructure. 
              We do not store, copy, or retain any of your code. Analysis results are 
              ephemeral and can be discarded immediately after use. This approach 
              ensures maximum privacy while enabling compliance verification.
            </p>
            <p className="text-[#475569] leading-relaxed">
              For cloud-hosted deployments, all processing occurs in isolated, 
              short-lived containers. No persistent storage of user data is used.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-light text-[#0f172a] mb-4">
              Privacy-First Architecture
            </h2>
            <p className="text-[#475569] leading-relaxed mb-4">
              Our architecture is designed around the principle of data minimization. 
              The CLI and IDE extensions run entirely on your machine. CI/CD integrations 
              execute within your pipeline—we never receive your code.
            </p>
            <ul className="list-disc list-inside text-[#475569] space-y-2">
              <li>Local-first analysis with optional cloud processing</li>
              <li>No telemetry or usage tracking of code content</li>
              <li>Minimal metadata for rule engine updates only</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-light text-[#0f172a] mb-4">
              Compliance Certifications
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3 p-4 bg-white border border-[#e2e8f0] rounded-lg">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div>
                  <p className="font-medium text-[#0f172a]">SOC 2 Type II</p>
                  <p className="text-sm text-[#64748b]">Security controls audited</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white border border-[#e2e8f0] rounded-lg">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <div>
                  <p className="font-medium text-[#0f172a]">GDPR Compliant</p>
                  <p className="text-sm text-[#64748b]">EU data protection aligned</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-light text-[#0f172a] mb-4">
              Security Practices
            </h2>
            <ul className="space-y-3 text-[#475569]">
              <li className="flex gap-3">
                <span className="text-emerald-600 mt-0.5">✓</span>
                <span>Encryption in transit (TLS 1.3) and at rest</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-600 mt-0.5">✓</span>
                <span>Regular security assessments and penetration testing</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-600 mt-0.5">✓</span>
                <span>Role-based access control for enterprise deployments</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-600 mt-0.5">✓</span>
                <span>Vulnerability monitoring and prompt patching</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-[600px] mx-auto px-8 lg:px-20 text-center">
          <p className="text-[#64748b] mb-6">
            Questions about our security practices?
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-[#0f172a] text-white text-[15px] font-medium rounded hover:bg-[#1e293b] transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
