"use client";

interface VideoEmbedProps {
  videoId: string;
  title: string;
  source: "European Parliament" | "European Commission" | "Council of EU" | "AI4GOV";
  description: string;
  variant?: "inline" | "card";
  className?: string;
}

const SOURCE_CONFIG = {
  "European Parliament": {
    color: "bg-[#f1f5f9] text-[#475569]",
    authority: "Legislative Authority",
  },
  "European Commission": {
    color: "bg-[#f1f5f9] text-[#475569]",
    authority: "Executive Authority",
  },
  "Council of EU": {
    color: "bg-[#f1f5f9] text-[#475569]",
    authority: "Member State Authority",
  },
  AI4GOV: {
    color: "bg-[#f1f5f9] text-[#475569]",
    authority: "EU-Funded Project",
  },
};

export function VideoEmbed({
  videoId,
  title,
  source,
  description,
  variant = "card",
  className = "",
}: VideoEmbedProps) {
  const config = SOURCE_CONFIG[source];
  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;

  if (variant === "inline") {
    return (
      <div className={`w-full ${className}`}>
        <div className="aspect-video rounded-lg overflow-hidden border border-[#e2e8f0]">
          <iframe
            width="100%"
            height="100%"
            src={embedUrl}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-lg border border-[#e2e8f0] overflow-hidden hover:border-[#cbd5e1] transition-colors ${className}`}
    >
      <div className="aspect-video bg-[#f1f5f9]">
        <iframe
          width="100%"
          height="100%"
          src={embedUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`text-[11px] font-semibold px-2 py-1 rounded uppercase tracking-wide ${config.color}`}
          >
            {source}
          </span>
          <span className="text-[11px] text-[#94a3b8]">• {config.authority}</span>
        </div>
        <h3 className="text-[18px] font-medium text-[#0f172a] mb-2 leading-snug">
          {title}
        </h3>
        <p className="text-[14px] text-[#64748b] leading-relaxed">{description}</p>
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[#e2e8f0]">
          <span className="text-[12px] text-[#94a3b8]">Official EU Source</span>
          <span className="text-[12px] text-[#94a3b8]">Verified Content</span>
        </div>
      </div>
    </div>
  );
}
