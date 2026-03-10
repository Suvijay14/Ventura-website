"use client";

import { FeaturedArticles } from "./FeaturedArticles";

export default function ArticlesSection() {
  return (
    <section className="bg-white py-40">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-20">
        <div className="text-center mb-16">
          <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#64748b] mb-4">
            Official Sources
          </p>
          <h2 className="text-[42px] sm:text-[48px] font-light leading-[1.2] text-[#0f172a] mb-6">
            Featured EU AI Act Articles
          </h2>
          <p className="text-xl text-[#64748b] max-w-[700px] mx-auto">
            Verified, authoritative sources from official European Union
            institutions
          </p>
        </div>
        <FeaturedArticles limit={3} layout="grid" />
        <div className="mt-12 text-center">
          <a
            href="/learn#articles"
            className="text-[15px] font-medium text-[#0f172a] hover:opacity-80 transition-opacity"
          >
            View all official articles →
          </a>
        </div>
      </div>
    </section>
  );
}
