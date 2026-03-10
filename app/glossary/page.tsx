"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { glossary, searchGlossary, type GlossaryTerm } from "@/lib/glossary";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function TermCard({ term }: { term: GlossaryTerm }) {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-lg p-6 hover:border-[#cbd5e1] transition-colors">
      <div className="flex items-start justify-between gap-4 mb-2">
        <h3 className="text-lg font-medium text-[#0f172a]">{term.term}</h3>
        <span className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wide px-2 py-1 bg-[#f1f5f9] rounded shrink-0">
          {term.category}
        </span>
      </div>
      <p className="text-[#475569] leading-relaxed mb-3">{term.definition}</p>
      {term.euArticle && (
        <p className="text-[13px] text-[#64748b]">
          EU AI Act: {term.euArticle}
        </p>
      )}
      {term.relatedArticles.length > 0 && (
        <div className="mt-3 pt-3 border-t border-[#e2e8f0]">
          <Link
            href={term.relatedArticles[0]}
            className="text-sm text-[#0f172a] hover:underline"
          >
            Related resources →
          </Link>
        </div>
      )}
    </div>
  );
}

export default function GlossaryPage() {
  const [search, setSearch] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const filteredTerms = useMemo(() => {
    const results = searchGlossary(search);
    if (activeLetter && !search) {
      return results.filter((t) =>
        t.term.toUpperCase().startsWith(activeLetter)
      );
    }
    return results;
  }, [search, activeLetter]);

  return (
    <main>
      <section className="pt-32 pb-12 bg-white">
        <div className="max-w-[900px] mx-auto px-8 lg:px-20 text-center">
          <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#64748b] mb-4">
            EU AI Act Glossary
          </p>
          <h1 className="text-[48px] sm:text-[56px] font-light leading-[1.2] text-[#0f172a] mb-6">
            Key Terms & Definitions
          </h1>
          <p className="text-xl text-[#64748b] mb-8">
            Essential terminology for understanding the EU AI Act
          </p>

          <div className="max-w-xl mx-auto">
            <input
              type="search"
              placeholder="Search terms..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setActiveLetter(null);
              }}
              className="w-full px-4 py-3 border border-[#e2e8f0] rounded-lg text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20 focus:border-[#0f172a]"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-1 mt-6">
            {ALPHABET.map((letter) => {
              const count = glossary.filter((t) =>
                t.term.toUpperCase().startsWith(letter)
              ).length;
              const isActive = activeLetter === letter;
              return (
                <button
                  key={letter}
                  onClick={() => {
                    setActiveLetter(isActive ? null : letter);
                    setSearch("");
                  }}
                  className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#0f172a] text-white"
                      : count > 0
                        ? "bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]"
                        : "bg-[#f8fafc] text-[#cbd5e1] cursor-default"
                  }`}
                  disabled={count === 0}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#f8fafc]">
        <div className="max-w-[900px] mx-auto px-8 lg:px-20">
          {filteredTerms.length === 0 ? (
            <p className="text-center text-[#64748b] py-12">
              No terms match your search.
            </p>
          ) : (
            <div className="space-y-6">
              {filteredTerms.map((term) => (
                <TermCard key={term.term} term={term} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
