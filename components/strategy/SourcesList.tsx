interface SourceItem {
  id: string;
  section: string | null;
  source_title: string | null;
  source_url: string | null;
  snippet: string | null;
  relevance_score: number | null;
}

interface SourcesListProps {
  sources: SourceItem[];
}

export default function SourcesList({ sources }: SourcesListProps) {
  const grouped = sources.reduce<Record<string, SourceItem[]>>((acc, s) => {
    const key = s.section || "General";
    acc[key] = acc[key] ? [...acc[key], s] : [s];
    return acc;
  }, {});

  if (sources.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        No external citations were persisted for this brief.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([section, rows]) => (
        <div key={section}>
          <h4 className="mb-3 text-sm font-semibold text-[#1A3A5C]">{section}</h4>
          <ul className="space-y-4">
            {rows.map((s) => (
              <li
                key={s.id}
                className="rounded-md border border-[#E0E6EE] bg-white p-4 shadow-sm"
              >
                <p className="font-semibold text-[#0D1B2A]">{s.source_title ?? "Source"}</p>
                {s.source_url ? (
                  <a
                    href={s.source_url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 block break-all text-sm text-[#1A3A5C] underline"
                  >
                    {s.source_url}
                  </a>
                ) : null}
                {s.snippet ? (
                  <p className="mt-2 text-sm text-slate-600">{s.snippet}</p>
                ) : null}
                {typeof s.relevance_score === "number" ? (
                  <div className="mt-3">
                    <div className="mb-1 flex justify-between text-xs text-slate-500">
                      <span>Relevance</span>
                      <span>{Math.round(s.relevance_score * 100)}%</span>
                    </div>
                    <div className="h-2 w-full rounded-md bg-[#E0E6EE]">
                      <div
                        className="h-2 rounded-md bg-[#E8A838] transition-all duration-500"
                        style={{ width: `${Math.min(100, Math.max(0, s.relevance_score * 100))}%` }}
                      />
                    </div>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
