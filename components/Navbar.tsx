"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav
      className={`no-print fixed top-0 left-0 right-0 z-50 h-[90px] flex items-center transition-all duration-300 ${
        scrolled ? "bg-white border-b border-[#e2e8f0]" : "bg-white"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-8 lg:px-20 w-full flex items-center justify-between">
        <Link
          href="/"
          className="text-[28px] font-light tracking-[-0.02em] text-[#0f172a]"
        >
          Ventura
        </Link>

        <div className="hidden lg:flex items-center gap-12">
          <a
            href="/#capabilities"
            className="text-base font-normal text-[#64748b] hover:text-[#0f172a] transition-colors"
          >
            Capabilities
          </a>
          <a
            href="/#industries"
            className="text-base font-normal text-[#64748b] hover:text-[#0f172a] transition-colors"
          >
            Industries
          </a>
          <a
            href="/#insights"
            className="text-base font-normal text-[#64748b] hover:text-[#0f172a] transition-colors"
          >
            Insights
          </a>
          <a
            href="/learn"
            className="text-base font-normal text-[#64748b] hover:text-[#0f172a] transition-colors"
          >
            Learn
          </a>
          <Link
            href="/demo"
            className="text-base font-normal text-[#64748b] hover:text-[#0f172a] transition-colors"
          >
            Demo
          </Link>
          <a
            href="#"
            className="text-base font-normal text-[#64748b] hover:text-[#0f172a] transition-colors"
          >
            About
          </a>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          <a
            href="/#contact"
            className="text-base font-normal text-[#64748b] hover:text-[#0f172a] transition-colors"
          >
            Contact Us
          </a>
          <Link
            href="/assessment"
            className="px-6 py-3 border-2 border-[#0f172a] text-[#0f172a] text-[15px] font-medium hover:bg-[#0f172a] hover:text-white transition-colors"
          >
            Get Started
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-[#64748b]"
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

      {mobileOpen && (
        <div className="lg:hidden absolute top-[90px] left-0 right-0 bg-white border-b border-[#e2e8f0] py-6 px-8">
          <div className="flex flex-col gap-4">
            <a href="/#capabilities" className="text-base text-[#64748b] hover:text-[#0f172a]">
              Capabilities
            </a>
            <a href="/#industries" className="text-base text-[#64748b] hover:text-[#0f172a]">
              Industries
            </a>
            <a href="/#insights" className="text-base text-[#64748b] hover:text-[#0f172a]">
              Insights
            </a>
            <a href="/learn" className="text-base text-[#64748b] hover:text-[#0f172a]">
              Learn
            </a>
            <Link href="/demo" className="text-base text-[#64748b] hover:text-[#0f172a]">
              Demo
            </Link>
            <a href="#" className="text-base text-[#64748b] hover:text-[#0f172a]">
              About
            </a>
            <a href="/#contact" className="text-base text-[#64748b] hover:text-[#0f172a]">
              Contact Us
            </a>
            <Link
              href="/assessment"
              className="py-3 border-2 border-[#0f172a] text-[#0f172a] text-center font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
