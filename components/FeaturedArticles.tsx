"use client";

import { officialArticles } from "@/lib/articles";

function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`;
}

function ArticleCard({ article }: { article: (typeof officialArticles)[0] }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white border border-[#e2e8f0] rounded-lg overflow-hidden hover:border-[#cbd5e1] hover:shadow-md transition-all duration-300"
    >
      <div className="aspect-[16/9] bg-[#f8fafc] flex items-center justify-center border-b border-[#e2e8f0]">
        <div className="text-center p-6">
          <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-[#f1f5f9] flex items-center justify-center">
            <svg
              className="w-6 h-6 text-[#64748b]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <span className="text-[12px] font-medium text-[#64748b] uppercase tracking-wide">
            {article.source}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wide">
            {article.source}
          </span>
          <div className="flex gap-0.5">
            {Array.from({ length: article.authority }).map((_, i) => (
              <svg
                key={i}
                className="w-3.5 h-3.5 text-[#e2e8f0]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        <h3 className="text-[18px] font-medium text-[#0f172a] mb-2 line-clamp-2 group-hover:text-[#1e3a8a] transition-colors leading-snug">
          {article.title}
        </h3>
        <p className="text-[13px] text-[#64748b] mb-3">{formatDate(article.publishDate)}</p>
        <p className="text-[14px] text-[#475569] leading-relaxed mb-4 line-clamp-3">
          {article.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block px-2 py-1 text-[11px] bg-[#f1f5f9] text-[#64748b] rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center text-[14px] font-medium text-[#0f172a] group-hover:translate-x-1 transition-transform">
          Read official article
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </a>
  );
}

function ArticleCardList({ article }: { article: (typeof officialArticles)[0] }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-6 p-6 bg-white border border-[#e2e8f0] rounded-lg hover:border-[#cbd5e1] transition-colors"
    >
      <div className="w-24 h-16 flex-shrink-0 bg-[#f8fafc] rounded flex items-center justify-center">
        <svg className="w-8 h-8 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wide">
          {article.source}
        </span>
        <h3 className="text-[18px] font-medium text-[#0f172a] mt-1 group-hover:text-[#1e3a8a] transition-colors">
          {article.title}
        </h3>
        <p className="text-[14px] text-[#64748b] mt-1">{formatDate(article.publishDate)}</p>
        <p className="text-[14px] text-[#475569] mt-2 line-clamp-2">{article.description}</p>
      </div>
      <svg className="w-5 h-5 text-[#94a3b8] flex-shrink-0 mt-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </a>
  );
}

export function FeaturedArticles({
  limit,
  layout = "grid",
}: {
  limit?: number;
  layout?: "grid" | "list";
}) {
  const articles = limit ? officialArticles.slice(0, limit) : officialArticles;

  if (layout === "list") {
    return (
      <div className="space-y-4">
        {articles.map((article) => (
          <ArticleCardList key={article.id} article={article} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
