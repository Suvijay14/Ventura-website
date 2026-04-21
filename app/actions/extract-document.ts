"use server";

function resolvePdfParse(
  mod: Record<string, unknown> | ((buffer: Buffer) => Promise<{ text?: string }>),
): ((buffer: Buffer) => Promise<{ text?: string }>) | null {
  if (typeof mod === "function") {
    return mod as (buffer: Buffer) => Promise<{ text?: string }>;
  }
  const rec = mod as Record<string, unknown>;
  const def = rec.default;
  if (typeof def === "function") {
    return def as (buffer: Buffer) => Promise<{ text?: string }>;
  }
  if (def && typeof def === "object" && "default" in def && typeof (def as { default: unknown }).default === "function") {
    return (def as { default: (buffer: Buffer) => Promise<{ text?: string }> }).default;
  }
  return null;
}

async function mammothExtractRawText(buffer: Buffer): Promise<string> {
  const mod = await import("mammoth");
  const extract =
    typeof mod.extractRawText === "function"
      ? mod.extractRawText
      : mod.default &&
          typeof mod.default === "object" &&
          "extractRawText" in mod.default &&
          typeof (mod.default as { extractRawText: unknown }).extractRawText === "function"
        ? (mod.default as { extractRawText: (input: { buffer: Buffer }) => Promise<{ value: string }> })
            .extractRawText
        : null;
  if (!extract) {
    return "";
  }
  const result = await extract({ buffer });
  return result && typeof result.value === "string" ? result.value : "";
}

export async function extractDocumentText(formData: FormData): Promise<string> {
  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    return "";
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const ext = file.name.split(".").pop()?.toLowerCase();

  if (ext === "txt") {
    return buffer.toString("utf-8");
  }

  if (ext === "pdf") {
    try {
      const mod = (await import("pdf-parse")) as unknown;
      const pdfParse = resolvePdfParse(
        mod as Record<string, unknown> | ((buffer: Buffer) => Promise<{ text?: string }>),
      );
      if (!pdfParse) {
        return `PDF file: ${file.name} (content extraction failed — using filename for context)`;
      }
      const data = await pdfParse(buffer);
      return typeof data?.text === "string" ? data.text : "";
    } catch {
      return `PDF file: ${file.name} (content extraction failed — using filename for context)`;
    }
  }

  if (ext === "docx") {
    try {
      const text = await mammothExtractRawText(buffer);
      return text;
    } catch {
      return `Document: ${file.name}`;
    }
  }

  try {
    return buffer.toString("utf-8");
  } catch {
    return "";
  }
}
