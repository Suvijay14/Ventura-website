"use client";

const capabilitiesLinks = [
  { label: "Data Governance", href: "/capabilities" },
  { label: "Human Oversight", href: "/capabilities" },
  { label: "Documentation", href: "/capabilities" },
  { label: "Risk Management", href: "/capabilities" },
];

const sectorsLinks = [
  { label: "Financial Services", href: "/industries" },
  { label: "Healthcare", href: "/industries" },
  { label: "Employment", href: "/industries" },
  { label: "Biometric Systems", href: "/industries" },
];

const resourceLinks = [
  { label: "Insights", href: "/insights" },
  { label: "Glossary", href: "/glossary" },
  { label: "News & Updates", href: "/news" },
  { label: "Integrations", href: "/integrations" },
  { label: "Official EU Videos", href: "/learn" },
  { label: "Compliance Assessment", href: "/get-started" },
  { label: "Code Analysis Demo", href: "/demo" },
];

const firmLinks = [
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/contact" },
];

export default function Footer() {
  return (
    <footer>
      {/* End-of-page brand mark */}
      <div className="bg-white py-24 flex items-center justify-center">
        <span className="text-[72px] sm:text-[96px] md:text-[120px] font-bold text-[#0f172a] tracking-[0.02em]">
          VENTURA
        </span>
      </div>

      <div className="bg-[#0f172a] text-[#64748b] pt-20 pb-10">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-16">
          <div>
            <div className="text-[22px] font-light text-white">Ventura</div>
            <p className="mt-4 text-sm leading-[1.7] max-w-[240px]">
              EU AI Act compliance advisory delivered through technology
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-white">Capabilities</h4>
            <ul className="mt-4 space-y-1">
              {capabilitiesLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm leading-[2.5] hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-white">Resources</h4>
            <ul className="mt-4 space-y-1">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm leading-[2.5] hover:text-white transition-colors flex items-center gap-1"
                  >
                    {link.label}
                    {link.label.includes("Videos") && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-white">Sectors</h4>
            <ul className="mt-4 space-y-1">
              {sectorsLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm leading-[2.5] hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-white">Firm</h4>
            <ul className="mt-4 space-y-1">
              {firmLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm leading-[2.5] hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          </div>

          <div className="mt-20 pt-8 border-t border-[#1e293b] flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[13px] text-[#475569]">© 2026 Ventura</p>
            <div className="flex gap-6">
              <a
                href="/security"
                className="text-[13px] text-[#475569] hover:text-[#64748b] transition-colors"
              >
                Security
              </a>
              <a
                href="#"
                className="text-[13px] text-[#475569] hover:text-[#64748b] transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-[13px] text-[#475569] hover:text-[#64748b] transition-colors"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
