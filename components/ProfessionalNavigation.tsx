'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
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
} from 'lucide-react';

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

export default function ProfessionalNavigation() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Platform dropdown content
  const platformSections: DropdownSection[] = [
    {
      title: 'PLATFORM',
      items: [
        {
          icon: Layers,
          label: 'EU AI Act Platform',
          description: 'A single platform for everything AI compliance',
          href: '/platform',
        },
        {
          icon: Sparkles,
          label: 'Automated Scanning',
          description: 'Autonomous code analysis',
          href: '/platform/scanning',
          badge: 'NEW',
        },
      ],
    },
    {
      title: 'KEY CAPABILITIES',
      items: [
        {
          icon: Search,
          label: 'AI Discovery & Inventory',
          description: 'Discover and catalog all AI systems',
          href: '/capabilities/discovery',
        },
        {
          icon: ShieldCheck,
          label: 'Risk Assessment & Testing',
          description: 'Detect bias, hallucination & safety issues',
          href: '/capabilities/testing',
        },
        {
          icon: FileCheck,
          label: 'Policy Enforcement',
          description: 'Enforce governance policies automatically',
          href: '/capabilities/enforcement',
        },
        {
          icon: Activity,
          label: 'Compliance & Audit',
          description: 'Generate audit-ready compliance reports',
          href: '/capabilities/audit',
        },
      ],
    },
  ];

  // Resources dropdown content
  const resourcesSections: DropdownSection[] = [
    {
      title: 'INSIGHTS',
      items: [
        {
          icon: FileText,
          label: 'Blog',
          description: 'Ideas and insights from our team',
          href: '/insights',
        },
        {
          icon: Newspaper,
          label: 'News',
          description: 'Recent updates and highlights',
          href: '/news',
        },
        {
          icon: Calendar,
          label: 'Events & Webinars',
          description: 'Live and virtual events',
          href: '/learn',
        },
        {
          icon: BookOpen,
          label: 'Papers & Research',
          description: 'Detailed research papers & guides',
          href: '/learn',
        },
        {
          icon: Mail,
          label: 'Newsletter',
          description: 'The Ventura Brief',
          href: '/contact',
        },
        {
          icon: BookMarked,
          label: 'Glossary Terms',
          description: 'Learn key terms',
          href: '/glossary',
        },
      ],
    },
    {
      title: 'TECH HUB',
      items: [
        {
          icon: Code,
          label: 'Technical Documentation',
          description: 'Developer guides and documentation',
          href: '/learn',
        },
        {
          icon: Github,
          label: 'GitHub Projects & APIs',
          description: 'Explore our APIs and opensource tools',
          href: '/integrations',
        },
        {
          icon: Shield,
          label: 'Security Testing',
          description: 'Simulate attacks on AI systems',
          href: '/security',
        },
      ],
    },
  ];

  // Customers dropdown (case studies)
  const customersSections: DropdownSection[] = [
    {
      title: 'CASE STUDIES',
      items: [
        {
          icon: Building2,
          label: 'Enterprise Success Stories',
          description: 'See how companies achieve compliance',
          href: '/industries',
        },
      ],
    },
  ];

  const companySections: DropdownSection[] = [
    {
      title: 'COMPANY',
      items: [
        {
          icon: Building2,
          label: 'About Us',
          description: 'Our mission and team',
          href: '/about',
        },
        {
          icon: Mail,
          label: 'Contact',
          description: 'Get in touch',
          href: '/contact',
        },
      ],
    },
  ];

  return (
    <nav className="no-print sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
              <Image
                src="/logo.svg"
                alt="Ventura"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl font-semibold text-gray-900">Ventura</span>
          </Link>

          {/* Navigation Items */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Platform Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('platform')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/platform"
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium flex items-center gap-1 transition-colors inline-flex"
              >
                Platform
                <ChevronDown className="w-4 h-4" />
              </Link>

              {activeDropdown === 'platform' && (
                <DropdownMenu sections={platformSections} />
              )}
            </div>

            {/* What We Do */}
            <Link
              href="/capabilities"
              className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              What We Do
            </Link>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('resources')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/insights"
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium flex items-center gap-1 transition-colors inline-flex"
              >
                Resources
                <ChevronDown className="w-4 h-4" />
              </Link>

              {activeDropdown === 'resources' && (
                <DropdownMenu sections={resourcesSections} />
              )}
            </div>

            {/* Customers Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('customers')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/industries"
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium flex items-center gap-1 transition-colors inline-flex"
              >
                Customers
                <ChevronDown className="w-4 h-4" />
              </Link>

              {activeDropdown === 'customers' && (
                <DropdownMenu
                  sections={customersSections}
                  featured={<FeaturedCustomer />}
                />
              )}
            </div>

            {/* Company Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('company')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/about"
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium flex items-center gap-1 transition-colors inline-flex"
              >
                Company
                <ChevronDown className="w-4 h-4" />
              </Link>

              {activeDropdown === 'company' && (
                <DropdownMenu sections={companySections} />
              )}
            </div>
          </div>

          {/* CTA + Mobile menu button */}
          <div className="flex items-center gap-4">
            <Link
              href="/get-started"
              className="hidden sm:inline-flex px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Get Started
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="container mx-auto px-6 py-4 max-w-7xl space-y-2">
            <Link
              href="/platform"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-gray-700 hover:text-gray-900 font-medium"
            >
              Platform
            </Link>
            <Link
              href="/capabilities"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-gray-700 hover:text-gray-900 font-medium"
            >
              What We Do
            </Link>
            <Link
              href="/insights"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-gray-700 hover:text-gray-900 font-medium"
            >
              Resources
            </Link>
            <Link
              href="/industries"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-gray-700 hover:text-gray-900 font-medium"
            >
              Customers
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-gray-700 hover:text-gray-900 font-medium"
            >
              Company
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-gray-700 hover:text-gray-900 font-medium"
            >
              Contact
            </Link>
            <Link
              href="/get-started"
              onClick={() => setMobileOpen(false)}
              className="block py-3 mt-4 text-center bg-blue-600 text-white rounded-lg font-medium sm:hidden"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

// Dropdown Menu Component
function DropdownMenu({
  sections,
  featured,
}: {
  sections: DropdownSection[];
  featured?: React.ReactNode;
}) {
  return (
    <div className="absolute left-0 top-full pt-2 w-[800px] animate-fadeIn z-50">
      <div className="w-full bg-white rounded-xl shadow-2xl border border-gray-200 p-6">
      <div
        className={`grid gap-x-8 ${featured ? 'grid-cols-2' : 'grid-cols-1'}`}
      >
        {/* Left side - Menu sections */}
        <div className="space-y-8">
          {sections.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-xs font-semibold text-blue-600 tracking-wider uppercase mb-4">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item, itemIdx) => (
                  <Link
                    key={itemIdx}
                    href={item.href}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                      <item.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right side - Featured content */}
        {featured && (
          <div className="border-l border-gray-200 pl-8">
            {featured}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

// Featured Customer Component
function FeaturedCustomer() {
  return (
    <div className="h-full">
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-6 border border-blue-100 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Featured Resource
          </span>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          State of AI Regulations in 2026
        </h3>

        <p className="text-sm text-gray-600 mb-6 flex-1">
          Everything you need to know about EU AI Act compliance, deadlines, and
          requirements.
        </p>

        <Link
          href="/insights"
          className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
        >
          Download eBook
        </Link>
      </div>
    </div>
  );
}
