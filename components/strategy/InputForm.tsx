"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Check } from "lucide-react";
import type { ResearchDepth } from "@/lib/strategy-types";

const MAX_SITUATION = 5000;
const MAX_FILE_BYTES = 10 * 1024 * 1024;

function looksLikePdf(buf: ArrayBuffer): boolean {
  const b = new Uint8Array(buf.slice(0, 5));
  return b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46; // %PDF
}

function looksLikeZip(buf: ArrayBuffer): boolean {
  const b = new Uint8Array(buf.slice(0, 2));
  return b[0] === 0x50 && b[1] === 0x4b; // PK — .docx is a zip
}

async function extractPdfText(file: File): Promise<{ text: string; pages: number }> {
  const pdfjs = await import("pdfjs-dist");
  /* Same-origin worker: CDN workers are often blocked (CSP / cross-origin) on Vercel & Safari. */
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

  const buf = await file.arrayBuffer();
  if (!looksLikePdf(buf)) {
    throw new Error("This file is not a valid PDF. Export as PDF or rename if the extension is wrong.");
  }
  const doc = await pdfjs.getDocument({ data: buf }).promise;
  const pages = doc.numPages;
  const parts: string[] = [];
  for (let i = 1; i <= pages; i += 1) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items
      .map((item) => ("str" in item ? item.str : ""))
      .filter(Boolean);
    parts.push(strings.join(" "));
  }
  return { text: parts.join("\n\n"), pages };
}

type MammothExtractInput = { arrayBuffer: ArrayBuffer };
type MammothExtractResult = { value: string };
type MammothExtractFn = (input: MammothExtractInput) => Promise<MammothExtractResult>;

function resolveMammothExtract(mod: Record<string, unknown>): MammothExtractFn {
  const direct = mod.extractRawText;
  if (typeof direct === "function") {
    return direct as MammothExtractFn;
  }
  const def = mod.default;
  if (def && typeof def === "object") {
    const nested = (def as Record<string, unknown>).extractRawText;
    if (typeof nested === "function") {
      return nested as MammothExtractFn;
    }
  }
  throw new Error("Document parser could not be loaded.");
}

async function extractDocxText(file: File): Promise<{ text: string; pages: number }> {
  const buf = await file.arrayBuffer();
  if (!looksLikeZip(buf)) {
    throw new Error(
      "This is not a modern Word .docx file (wrong format or old .doc). Save as .docx or use PDF.",
    );
  }
  const mod = (await import("mammoth")) as Record<string, unknown>;
  const extract = resolveMammothExtract(mod);
  const result = await extract({ arrayBuffer: buf });
  const text = result.value || "";
  const approxPages = Math.max(1, Math.ceil(text.length / 3000));
  return { text, pages: approxPages };
}

async function extractTxtText(file: File): Promise<{ text: string; pages: number }> {
  const text = await file.text();
  return { text, pages: Math.max(1, Math.ceil(text.length / 3000)) };
}

export default function InputForm() {
  const router = useRouter();
  const [situation, setSituation] = useState("");
  const [company, setCompany] = useState("");
  const [depth, setDepth] = useState<ResearchDepth>("deep");
  const [fileName, setFileName] = useState<string | null>(null);
  const [filePages, setFilePages] = useState<number | null>(null);
  const [documentContent, setDocumentContent] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFile = useCallback(async (fileList: FileList | null) => {
    setError(null);
    const file = fileList?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_BYTES) {
      setError("File exceeds 10MB.");
      return;
    }
    const ext = file.name.toLowerCase().split(".").pop();
    try {
      if (ext === "pdf") {
        const { text, pages } = await extractPdfText(file);
        setDocumentContent(text);
        setFileName(file.name);
        setFilePages(pages);
      } else if (ext === "docx") {
        const { text, pages } = await extractDocxText(file);
        setDocumentContent(text);
        setFileName(file.name);
        setFilePages(pages);
      } else if (ext === "txt") {
        const { text, pages } = await extractTxtText(file);
        setDocumentContent(text);
        setFileName(file.name);
        setFilePages(pages);
      } else {
        setError("Use PDF, DOCX, or TXT.");
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Could not read that file.";
      setError(
        msg.length > 180
          ? "Could not read that file. Try PDF, a .docx exported from Word/Pages, or plain .txt."
          : msg,
      );
    }
  }, []);

  const submit = async () => {
    setError(null);
    if (!situation.trim()) {
      setError("Describe your situation before starting.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/strategy/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          situation: situation.trim(),
          company: company.trim() || undefined,
          documentName: fileName,
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
            onChange={(e) => void onFile(e.target.files)}
          />
          <p className="text-sm text-[#0D1B2A]">
            Upload a pitch deck, teaser, IM, or brief (PDF or DOCX, max 10MB)
          </p>
          <p className="mt-2 text-xs text-slate-500">Accepted: .pdf, .docx, .txt</p>
        </label>
        {fileName ? (
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-[#0D1B2A]">{fileName}</span>
            {filePages != null ? ` · ~${filePages} page${filePages === 1 ? "" : "s"}` : null}
          </p>
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
