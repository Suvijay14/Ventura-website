"use client";

import { extractDocumentText } from "@/app/actions/extract-document";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Check, CheckCircle2 } from "lucide-react";
import type { ResearchDepth } from "@/lib/strategy-types";

const MAX_SITUATION = 5000;
const MAX_FILE_BYTES = 10 * 1024 * 1024;

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function InputForm() {
  const router = useRouter();
  const [situation, setSituation] = useState("");
  const [company, setCompany] = useState("");
  const [depth, setDepth] = useState<ResearchDepth>("deep");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFile = useCallback((fileList: FileList | null) => {
    setError(null);
    const file = fileList?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_BYTES) {
      setError("File exceeds 10MB.");
      return;
    }
    const ext = file.name.toLowerCase().split(".").pop();
    if (ext !== "pdf" && ext !== "docx" && ext !== "txt") {
      setError("Use PDF, DOCX, or TXT.");
      return;
    }
    setUploadedFile(file);
  }, []);

  const submit = async () => {
    setError(null);
    if (!situation.trim()) {
      setError("Describe your situation before starting.");
      return;
    }
    setBusy(true);
    try {
      let documentContent: string | null = null;
      const documentName = uploadedFile?.name ?? null;
      if (uploadedFile) {
        const formData = new FormData();
        formData.set("file", uploadedFile);
        const text = await extractDocumentText(formData);
        documentContent = text.trim() ? text : null;
      }

      const res = await fetch("/api/strategy/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          situation: situation.trim(),
          company: company.trim() || undefined,
          documentName,
          documentContent,
          researchDepth: depth,
        }),
      });
      const data = (await res.json()) as { id?: string; error?: string };
      if (!res.ok) {
        throw new Error(data.error ?? "Request failed");
      }
      if (!data.id) throw new Error("Missing brief id");
      router.push(`/app/strategy/${data.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not start research.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8 bg-white px-4 py-8 sm:px-6">
      <header>
        <h1 className="text-2xl font-semibold text-[#0D1B2A]">New strategic research</h1>
        <p className="mt-2 text-sm text-slate-600">
          Describe the engagement; optionally anchor on a company and add a document.
        </p>
      </header>

      <section className="space-y-2">
        <label className="text-sm font-semibold text-[#0D1B2A]">Situation / deal description</label>
        <textarea
          value={situation}
          onChange={(e) => setSituation(e.target.value.slice(0, MAX_SITUATION))}
          rows={10}
          className="w-full rounded-md border border-[#E0E6EE] bg-white p-3 text-sm text-slate-800 shadow-sm outline-none focus:border-[#1A3A5C]"
          placeholder={`Describe the situation, deal, or strategic question. For example:
'Our client is considering acquiring a Paris-based fintech startup called Paytrust that processes €2B/year in B2B payments. They want to know if this is a sound strategic move and what risks to watch for.'`}
        />
        <div className="text-right text-xs text-slate-500">
          {situation.length}/{MAX_SITUATION}
        </div>
      </section>

      <section className="space-y-2">
        <label className="text-sm font-semibold text-[#0D1B2A]">
          Company or target name <span className="font-normal text-slate-500">(optional)</span>
        </label>
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full rounded-md border border-[#E0E6EE] bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-[#1A3A5C]"
          placeholder="Company or target name (optional — helps focus research)"
        />
      </section>

      <section className="space-y-2">
        <label className="text-sm font-semibold text-[#0D1B2A]">Document upload</label>
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-[#0D1B2A] bg-white px-4 py-10 text-center shadow-sm">
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            className="hidden"
            onChange={(e) => onFile(e.target.files)}
          />
          <p className="text-sm text-[#0D1B2A]">
            Upload a pitch deck, teaser, IM, or brief (PDF or DOCX, max 10MB)
          </p>
          <p className="mt-2 text-xs text-slate-500">Accepted: .pdf, .docx, .txt</p>
        </label>
        {uploadedFile ? (
          <div className="flex items-start gap-3 rounded-md border border-[#E0E6EE] bg-[#F8FAFC] px-4 py-3 text-sm">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" aria-hidden />
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-[#0D1B2A]">{uploadedFile.name}</p>
              <p className="mt-0.5 text-xs text-slate-600">
                {formatFileSize(uploadedFile.size)} · Document ready
              </p>
            </div>
          </div>
        ) : null}
      </section>

      <section className="space-y-3">
        <p className="text-sm font-semibold text-[#0D1B2A]">Research depth</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setDepth("quick")}
            className={`relative rounded-md border p-4 text-left shadow-sm transition-colors ${
              depth === "quick"
                ? "border-[#0D1B2A] bg-[#F4F6F9]"
                : "border-[#E0E6EE] bg-white hover:border-[#1A3A5C]"
            }`}
          >
            {depth === "quick" ? (
              <Check className="absolute right-3 top-3 h-5 w-5 text-[#E8A838]" aria-hidden />
            ) : null}
            <p className="font-semibold text-[#0D1B2A]">Quick Intel</p>
            <p className="mt-1 text-xs text-slate-600">~5 minutes · core market &amp; competitive view</p>
          </button>
          <button
            type="button"
            onClick={() => setDepth("deep")}
            className={`relative rounded-md border p-4 text-left shadow-sm transition-colors ${
              depth === "deep"
                ? "border-[#0D1B2A] bg-[#F4F6F9]"
                : "border-[#E0E6EE] bg-white hover:border-[#1A3A5C]"
            }`}
          >
            {depth === "deep" ? (
              <Check className="absolute right-3 top-3 h-5 w-5 text-[#E8A838]" aria-hidden />
            ) : null}
            <p className="font-semibold text-[#0D1B2A]">Deep Research</p>
            <p className="mt-1 text-xs text-slate-600">12–15 minutes · full eight-agent analysis</p>
          </button>
        </div>
      </section>

      {error ? <p className="text-sm text-[#C0392B]">{error}</p> : null}

      <button
        type="button"
        disabled={busy}
        onClick={() => void submit()}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-[#0D1B2A] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1A3A5C] disabled:opacity-60"
      >
        {busy ? "Starting…" : "Start Research →"}
      </button>

      <p className="text-center text-xs text-slate-500">
        Your document and inputs are processed in memory. No content is stored — only the research
        findings.
      </p>
    </div>
  );
}
