'use client';

import Link from 'next/link';
import { useState } from 'react';

const IconSearch = () => (
  <svg className="w-5 h-5 text-[#0f172a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);
const IconInventory = () => (
  <svg className="w-5 h-5 text-[#0f172a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
  </svg>
);
const IconMonitor = () => (
  <svg className="w-5 h-5 text-[#0f172a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);
const IconRisk = () => (
  <svg className="w-5 h-5 text-[#0f172a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);
const IconData = () => (
  <svg className="w-5 h-5 text-[#0f172a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
  </svg>
);
const IconOversight = () => (
  <svg className="w-5 h-5 text-[#0f172a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);
const IconTransparency = () => (
  <svg className="w-5 h-5 text-[#0f172a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
  </svg>
);
const IconQuality = () => (
  <svg className="w-5 h-5 text-[#0f172a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const IconAccuracy = () => (
  <svg className="w-5 h-5 text-[#0f172a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const moduleIcons = {
  discovery: IconSearch,
  inventory: IconInventory,
  monitoring: IconMonitor,
  risk: IconRisk,
  data: IconData,
  oversight: IconOversight,
  transparency: IconTransparency,
  quality: IconQuality,
  accuracy: IconAccuracy,
};

export default function PlatformVisualization() {
  const [activeStep, setActiveStep] = useState<'scan' | 'analyze' | 'comply' | null>(null);

  const modules = {
    scan: [
      { id: 'discovery', label: 'AI Discovery' },
      { id: 'inventory', label: 'System Inventory' },
      { id: 'monitoring', label: 'Continuous Monitoring' },
    ],
    analyze: [
      { id: 'risk', label: 'Risk Management' },
      { id: 'data', label: 'Data Governance' },
      { id: 'oversight', label: 'Human Oversight' },
    ],
    comply: [
      { id: 'transparency', label: 'Transparency' },
      { id: 'quality', label: 'Quality Management' },
      { id: 'accuracy', label: 'Accuracy & Robustness' },
    ],
  };

  return (
    <section className="relative py-24 bg-[#f8fafc] overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-[#0f172a] mb-4">
            Complete Compliance Platform
          </h2>
          <p className="text-xl text-[#64748b] max-w-2xl mx-auto">
            End-to-end EU AI Act compliance in three steps
          </p>
        </div>

        {/* Main Visualization */}
        <div className="relative">
          
          {/* SVG Container */}
          <div className="relative w-full min-h-[500px] md:min-h-[600px] lg:min-h-[700px]">
            <svg 
              viewBox="0 0 1000 800" 
              className="absolute inset-0 w-full h-full"
            >
              {/* Dashed circle background */}
              <circle
                cx="500"
                cy="400"
                r="280"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="2"
                strokeDasharray="8 8"
              />

              {/* Connection lines from center to workflow steps */}
              <line x1="500" y1="400" x2="500" y2="150" stroke="#e2e8f0" strokeWidth="2" />
              <line x1="500" y1="400" x2="780" y2="400" stroke="#e2e8f0" strokeWidth="2" />
              <line x1="500" y1="400" x2="220" y2="400" stroke="#e2e8f0" strokeWidth="2" />

              {/* Workflow arrows (circular flow) */}
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="10"
                  refX="9"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3, 0 6" fill="#0f172a" />
                </marker>
              </defs>

              {/* Curved arrows connecting steps: SCAN → ANALYZE → COMPLY → SCAN */}
              <path
                d="M 500 150 Q 700 250, 780 400"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
              <path
                d="M 780 400 Q 500 550, 220 400"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
              <path
                d="M 220 400 Q 350 250, 500 150"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
            </svg>

            {/* Center Logo */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-44 h-44 md:w-52 md:h-52 bg-white rounded-2xl border-2 border-[#0f172a] shadow-2xl flex flex-col items-center justify-center group hover:scale-105 transition-transform">
                <div className="mb-2 flex justify-center">
                  <svg width="56" height="56" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="8" fill="#0f172a"/>
                    <path d="M10 10L16 22L22 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-[#0f172a] tracking-wider">VENTURA</div>
                  <div className="text-xs text-[#64748b] mt-1">PLATFORM</div>
                </div>
              </div>
            </div>

            {/* SCAN Step - Top */}
            <div 
              className="absolute top-[8%] left-1/2 transform -translate-x-1/2 z-20"
              onMouseEnter={() => setActiveStep('scan')}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div className={`px-8 py-4 rounded-lg border-2 transition-all cursor-pointer ${
                activeStep === 'scan'
                  ? 'bg-[#0f172a] border-[#0f172a] text-white shadow-lg scale-110'
                  : 'bg-white border-[#e2e8f0] text-[#0f172a] hover:border-[#0f172a]'
              }`}>
                <div className="text-lg font-bold tracking-wider text-center">SCAN</div>
              </div>
              {activeStep === 'scan' && (
                <div className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-4 w-64 border border-[#e2e8f0] z-30">
                  <p className="text-sm text-[#475569]">
                    Connect repositories and scan source code for EU AI Act compliance
                  </p>
                </div>
              )}
            </div>

            {/* ANALYZE Step - Right */}
            <div 
              className="absolute top-1/2 right-[6%] md:right-[8%] transform -translate-y-1/2 z-20"
              onMouseEnter={() => setActiveStep('analyze')}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div className={`px-6 py-3 md:px-8 md:py-4 rounded-lg border-2 transition-all cursor-pointer ${
                activeStep === 'analyze'
                  ? 'bg-[#0f172a] border-[#0f172a] text-white shadow-lg scale-110'
                  : 'bg-white border-[#e2e8f0] text-[#0f172a] hover:border-[#0f172a]'
              }`}>
                <div className="text-base md:text-lg font-bold tracking-wider text-center">ANALYZE</div>
              </div>
              {activeStep === 'analyze' && (
                <div className="absolute top-1/2 right-full mr-4 transform -translate-y-1/2 bg-white rounded-lg shadow-xl p-4 w-64 border border-[#e2e8f0] z-30 hidden md:block">
                  <p className="text-sm text-[#475569]">
                    Detect violations against 113 EU AI Act articles with detailed analysis
                  </p>
                </div>
              )}
            </div>

            {/* COMPLY Step - Left */}
            <div 
              className="absolute top-1/2 left-[6%] md:left-[8%] transform -translate-y-1/2 z-20"
              onMouseEnter={() => setActiveStep('comply')}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div className={`px-6 py-3 md:px-8 md:py-4 rounded-lg border-2 transition-all cursor-pointer ${
                activeStep === 'comply'
                  ? 'bg-[#0f172a] border-[#0f172a] text-white shadow-lg scale-110'
                  : 'bg-white border-[#e2e8f0] text-[#0f172a] hover:border-[#0f172a]'
              }`}>
                <div className="text-base md:text-lg font-bold tracking-wider text-center">COMPLY</div>
              </div>
              {activeStep === 'comply' && (
                <div className="absolute top-1/2 left-full ml-4 transform -translate-y-1/2 bg-white rounded-lg shadow-xl p-4 w-64 border border-[#e2e8f0] z-30 hidden md:block">
                  <p className="text-sm text-[#475569]">
                    Apply suggested fixes and maintain continuous compliance
                  </p>
                </div>
              )}
            </div>

            {/* Side Modules - SCAN (Top) */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center gap-2 md:gap-4 z-20 max-w-full px-4">
              {modules.scan.map((module) => {
                const Icon = moduleIcons[module.id as keyof typeof moduleIcons];
                return (
                  <div
                    key={module.id}
                    className={`px-3 py-2 md:px-4 md:py-2 bg-white rounded-lg border border-[#e2e8f0] hover:border-[#0f172a] transition-all cursor-pointer flex items-center gap-2 ${
                      activeStep === 'scan' ? 'opacity-100' : 'opacity-60'
                    }`}
                    onMouseEnter={() => setActiveStep('scan')}
                    onMouseLeave={() => setActiveStep(null)}
                  >
                    {Icon && <Icon />}
                    <span className="text-xs md:text-sm font-medium text-[#0f172a]">{module.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Side Modules - ANALYZE (Right) */}
            <div className="absolute top-[35%] md:top-1/4 right-0 md:right-2 flex flex-col gap-2 md:gap-3 pr-2 md:pr-4 z-20">
              {modules.analyze.map((module) => {
                const Icon = moduleIcons[module.id as keyof typeof moduleIcons];
                return (
                  <div
                    key={module.id}
                    className={`px-3 py-2 md:px-4 md:py-2 bg-white rounded-lg border border-[#e2e8f0] hover:border-[#0f172a] transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                      activeStep === 'analyze' ? 'opacity-100' : 'opacity-60'
                    }`}
                    onMouseEnter={() => setActiveStep('analyze')}
                    onMouseLeave={() => setActiveStep(null)}
                  >
                    {Icon && <Icon />}
                    <span className="text-xs md:text-sm font-medium text-[#0f172a]">{module.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Side Modules - COMPLY (Left) */}
            <div className="absolute top-[35%] md:top-1/4 left-0 md:left-2 flex flex-col gap-2 md:gap-3 pl-2 md:pl-4 z-20">
              {modules.comply.map((module) => {
                const Icon = moduleIcons[module.id as keyof typeof moduleIcons];
                return (
                  <div
                    key={module.id}
                    className={`px-3 py-2 md:px-4 md:py-2 bg-white rounded-lg border border-[#e2e8f0] hover:border-[#0f172a] transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                      activeStep === 'comply' ? 'opacity-100' : 'opacity-60'
                    }`}
                    onMouseEnter={() => setActiveStep('comply')}
                    onMouseLeave={() => setActiveStep(null)}
                  >
                    {Icon && <Icon />}
                    <span className="text-xs md:text-sm font-medium text-[#0f172a]">{module.label}</span>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Bottom Explanation */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          
          <div className="text-center">
            <div className="w-12 h-12 bg-[#f8fafc] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#e2e8f0]">
              <svg className="w-6 h-6 text-[#0f172a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#0f172a] mb-2">1. Scan</h3>
            <p className="text-sm text-[#64748b]">
              Connect your repositories and discover all AI systems across your organization
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-[#f8fafc] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#e2e8f0]">
              <svg className="w-6 h-6 text-[#0f172a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#0f172a] mb-2">2. Analyze</h3>
            <p className="text-sm text-[#64748b]">
              Detect violations with automated code analysis against EU AI Act requirements
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-[#f8fafc] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#e2e8f0]">
              <svg className="w-6 h-6 text-[#0f172a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#0f172a] mb-2">3. Comply</h3>
            <p className="text-sm text-[#64748b]">
              Apply fixes and maintain continuous compliance with automated monitoring
            </p>
          </div>

        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link 
            href="/demo" 
            className="inline-flex items-center px-8 py-4 bg-[#0f172a] text-white rounded-lg hover:bg-[#1e293b] transition-colors font-medium text-lg"
          >
            See Platform in Action
          </Link>
        </div>

      </div>
    </section>
  );
}
