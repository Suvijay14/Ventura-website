'use client';

import Link from 'next/link';
import {
  Eye,
  Shield,
  FileCheck,
  AlertTriangle,
  ClipboardList,
  ShieldCheck,
  Activity,
} from 'lucide-react';

interface Capability {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  href: string;
}

const capabilities: Capability[] = [
  {
    icon: Eye,
    title: 'AI Asset Discovery',
    description: 'Uncover all AI systems across your enterprise.',
    href: '/capabilities/discovery',
  },
  {
    icon: ClipboardList,
    title: 'AI Inventory',
    description: 'Maintain a centralized record of every AI system.',
    href: '/capabilities/inventory',
  },
  {
    icon: Shield,
    title: 'AI System Audits',
    description: 'Detect bias, hallucination, and safety issues.',
    href: '/capabilities/audits',
  },
  {
    icon: AlertTriangle,
    title: 'AI Red Teaming',
    description: 'Stress-test your systems to identify vulnerabilities.',
    href: '/capabilities/red-teaming',
  },
  {
    icon: ShieldCheck,
    title: 'AI Risk Management',
    description: 'Assess, monitor, and mitigate AI risks.',
    href: '/capabilities/risk',
  },
  {
    icon: FileCheck,
    title: 'Regulatory Alignment',
    description: 'Meet global and local regulations.',
    href: '/capabilities/regulatory',
  },
  {
    icon: Activity,
    title: 'Operational Alignment',
    description: 'Align with internal priorities and principles.',
    href: '/capabilities/operational',
  },
];

export default function CapabilitiesGrid() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-4">
              END-TO-END AI GOVERNANCE
            </div>
            <h2 className="text-3xl font-light text-gray-900">
              One unified platform
            </h2>
          </div>
          <Link
            href="/platform"
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
          >
            See how it works
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {/* Capabilities organized in sections */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* IDENTIFY Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
              Identify
            </h3>
            {capabilities.slice(0, 2).map((capability, idx) => (
              <CapabilityCard key={idx} capability={capability} />
            ))}
          </div>

          {/* PROTECT Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
              Protect
            </h3>
            {capabilities.slice(2, 5).map((capability, idx) => (
              <CapabilityCard key={idx} capability={capability} />
            ))}
          </div>

          {/* ENFORCE Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
              Enforce
            </h3>
            {capabilities.slice(5).map((capability, idx) => (
              <CapabilityCard key={idx} capability={capability} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CapabilityCard({ capability }: { capability: Capability }) {
  return (
    <Link
      href={capability.href}
      className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all group"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
          <capability.icon className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
            {capability.title}
          </h4>
          <p className="text-sm text-gray-600 leading-snug">
            {capability.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
