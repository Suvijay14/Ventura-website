"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  FileText,
  Newspaper,
  Calendar,
  BookOpen,
  Mail,
  BookMarked,
  Code,
  Github,
  Shield,
  Search,
  Building2,
  ShieldCheck,
  FileCheck,
  Activity,
  Layers,
  Sparkles,
} from "lucide-react";

interface DropdownItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
  href: string;
  badge?: string;
}

interface DropdownSection {
  title: string;
  items: DropdownItem[];
}

const platformSections: DropdownSection[] = [
  {
    title: "PLATFORM",
    items: [
      {
        icon: Layers,
        label: "EU AI Act Platform",
        description: "A single platform for everything AI compliance",
        href: "/platform",
      },
      {
        icon: Sparkles,
        label: "Automated Scanning",
        description: "Autonomous code analysis",
        href: "/platform/scanning",
        badge: "NEW",
      },
    ],
  },
  {
    title: "KEY CAPABILITIES",
    items: [
      {
        icon: Search,
        label: "AI Discovery & Inventory",
        description: "Discover and catalog all AI systems",
        href: "/capabilities/discovery",
      },
      {
        icon: ShieldCheck,
        label: "Risk Assessment & Testing",
        description: "Detect bias, hallucination & safety issues",
        href: "/capabilities/testing",
      },
      {
        icon: FileCheck,
        label: "Policy Enforcement",
        description: "Enforce governance policies automatically",
        href: "/capabilities/enforcement",
      },
      {
        icon: Activity,
        label: "Compliance & Audit",
        description: "Generate audit-ready compliance reports",
        href: "/capabilities/audit",
      },
    ],
  },
];

const resourcesSections: DropdownSection[] = [
  {
    title: "INSIGHTS",
    items: [
      { icon: FileText, label: "Blog", description: "Ideas and insights from our team", href: "/insights" },
      { icon: Newspaper, label: "News", description: "Recent updates and highlights", href: "/news" },
      { icon: Calendar, label: "Events & Webinars", description: "Live and virtual events", href: "/learn" },
      { icon: BookOpen, label: "Papers & Research", description: "Detailed research papers & guides", href: "/learn" },
      { icon: Mail, label: "Newsletter", description: "The Ventura Brief", href: "/contact" },
      { icon: BookMarked, label: "Glossary Terms", description: "Learn key terms", href: "/glossary" },
    ],
  },
  {
    title: "TECH HUB",
    items: [
      { icon: Code, label: "Technical Documentation", description: "Developer guides and documentation", href: "/learn" },
      { icon: Github, label: "GitHub Projects & APIs", description: "Explore our APIs and opensource tools", href: "/integrations" },
      { icon: Shield, label: "Security Testing", description: "Simulate attacks on AI systems", href: "/security" },
    ],
  },
];

const customersSections: DropdownSection[] = [
  {
    title: "CASE STUDIES",
    items: [
      {
        icon: Building2,
        label: "Enterprise Success Stories",
        description: "See how companies achieve compliance",
        href: "/industries",
      },
    ],
  },
];

const companySections: DropdownSection[] = [
  {
    title: "COMPANY",
    items: [
      { icon: Building2, label: "About Us", description: "Our mission and team", href: "/about" },
      { icon: Mail, label: "Contact", description: "Get in touch", href: "/contact" },
    ],
  },
];

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = (href: string) => {
    const isActive = pathname === href;
    return `relative py-2 text-base transition-all duration-200 ${
      isActive
        ? "text-[#0f172a] font-medium border-b-2 border-[#64748b]"
        : "text-[#6B7280] font-normal border-b-2 border-transparent hover:text-[#374151] hover:border-[#E5E7EB]"
    }`;
  };

  const dropdownTriggerClass = (isActive: boolean) =>
    `relative py-2 text-base transition-all duration-200 flex items-center gap-1 ${
      isActive
        ? "text-[#0f172a] font-medium border-b-2 border-[#64748b]"
        : "text-[#6B7280] font-normal border-b-2 border-transparent hover:text-[#374151] hover:border-[#E5E7EB]"
    }`;

  return (
    <nav
      className={`no-print fixed top-0 left-0 right-0 z-50 h-20 flex items-center transition-all duration-300 bg-white ${
        scrolled ? "border-b border-[#e2e8f0]" : ""
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-8 lg:px-20 w-full grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <Link
          href="/"
          className="text-2xl font-bold tracking-[0.12em] text-[#0f172a] uppercase hover:opacity-90 transition-opacity justify-self-start"
        >
          VENTURA
        </Link>

        <div className="hidden lg:flex items-center justify-center gap-8">
          {/* Platform Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("platform")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              href="/platform"
              className={dropdownTriggerClass(pathname.startsWith("/platform"))}
            >
              Platform
              <ChevronDown className="w-4 h-4" />
            </Link>
            {activeDropdown === "platform" && (
              <DropdownMenu sections={platformSections} />
            )}
          </div>

          {/* Capabilities */}
          <Link href="/capabilities" className={navLinkClass("/capabilities")}>
            Capabilities
          </Link>

          {/* Integrations */}
          <Link href="/integrations" className={navLinkClass("/integrations")}>
            Integrations
          </Link>

          {/* Industries Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("industries")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              href="/industries"
              className={dropdownTriggerClass(pathname === "/industries")}
            >
              Industries
              <ChevronDown className="w-4 h-4" />
            </Link>
            {activeDropdown === "industries" && (
              <DropdownMenu sections={customersSections} />
            )}
          </div>

          {/* Resources Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("resources")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              href="/insights"
              className={dropdownTriggerClass(pathname.startsWith("/insights") || pathname === "/news" || pathname === "/learn" || pathname === "/glossary")}
            >
              Resources
              <ChevronDown className="w-4 h-4" />
            </Link>
            {activeDropdown === "resources" && (
              <DropdownMenu sections={resourcesSections} />
            )}
          </div>

          {/* Learn */}
          <Link href="/learn" className={navLinkClass("/learn")}>
            Learn
          </Link>

          {/* Demo */}
          <Link href="/demo" className={navLinkClass("/demo")}>
            Demo
          </Link>

          {/* Company Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("company")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              href="/about"
              className={dropdownTriggerClass(pathname === "/about")}
            >
              Company
              <ChevronDown className="w-4 h-4" />
            </Link>
            {activeDropdown === "company" && (
              <DropdownMenu sections={companySections} />
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 justify-self-end">
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact"
              className="text-base text-[#6B7280] hover:text-[#111827] transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/get-started"
              className="px-6 py-2.5 bg-white border-2 border-[#0f172a] text-[#0f172a] text-[15px] font-medium rounded hover:bg-[#0f172a] hover:text-white transition-colors"
            >
              Get Started
            </Link>
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-[#64748b]"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-white border-b border-[#e2e8f0] py-6 px-8">
          <div className="flex flex-col gap-4">
            <Link
              href="/platform"
              onClick={() => setMobileOpen(false)}
              className={`text-base ${pathname === "/platform" ? "text-[#111827] font-medium" : "text-[#6B7280] hover:text-[#111827]"}`}
            >
              Platform
            </Link>
            <Link
              href="/capabilities"
              onClick={() => setMobileOpen(false)}
              className={`text-base ${pathname === "/capabilities" ? "text-[#111827] font-medium" : "text-[#6B7280] hover:text-[#111827]"}`}
            >
              Capabilities
            </Link>
            <Link
              href="/integrations"
              onClick={() => setMobileOpen(false)}
              className={`text-base ${pathname === "/integrations" ? "text-[#111827] font-medium" : "text-[#6B7280] hover:text-[#111827]"}`}
            >
              Integrations
            </Link>
            <Link
              href="/industries"
              onClick={() => setMobileOpen(false)}
              className={`text-base ${pathname === "/industries" ? "text-[#111827] font-medium" : "text-[#6B7280] hover:text-[#111827]"}`}
            >
              Industries
            </Link>
            <Link
              href="/insights"
              onClick={() => setMobileOpen(false)}
              className={`text-base ${pathname === "/insights" ? "text-[#111827] font-medium" : "text-[#6B7280] hover:text-[#111827]"}`}
            >
              Insights
            </Link>
            <Link
              href="/learn"
              onClick={() => setMobileOpen(false)}
              className={`text-base ${pathname === "/learn" ? "text-[#111827] font-medium" : "text-[#6B7280] hover:text-[#111827]"}`}
            >
              Learn
            </Link>
            <Link
              href="/demo"
              onClick={() => setMobileOpen(false)}
              className={`text-base ${pathname === "/demo" ? "text-[#111827] font-medium" : "text-[#6B7280] hover:text-[#111827]"}`}
            >
              Demo
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className={`text-base ${pathname === "/about" ? "text-[#111827] font-medium" : "text-[#6B7280] hover:text-[#111827]"}`}
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="text-base text-[#6B7280] hover:text-[#111827]"
            >
              Contact Us
            </Link>
            <Link
              href="/get-started"
              onClick={() => setMobileOpen(false)}
              className="py-3 border-2 border-[#0f172a] text-[#0f172a] text-center font-medium rounded"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

function DropdownMenu({ sections }: { sections: DropdownSection[] }) {
  return (
    <div className="absolute left-0 top-full pt-2 w-[800px] z-50 animate-fadeIn">
      <div className="w-full bg-white rounded-lg shadow-lg border border-[#e2e8f0] p-6">
        <div className="grid gap-x-8 grid-cols-1">
          <div className="space-y-8">
            {sections.map((section, idx) => (
              <div key={idx}>
                <h3 className="text-xs font-semibold text-[#64748b] tracking-wider uppercase mb-4">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item, itemIdx) => (
                    <Link
                      key={itemIdx}
                      href={item.href}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#f8fafc] transition-colors group"
                    >
                      <div className="w-10 h-10 bg-[#f1f5f9] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#e2e8f0] transition-colors">
                        <item.icon className="w-5 h-5 text-[#64748b]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-[#0f172a] group-hover:text-[#1e293b] transition-colors">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span className="px-2 py-0.5 bg-[#f1f5f9] text-[#475569] text-xs font-semibold rounded">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-[#64748b] mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
