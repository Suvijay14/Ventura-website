import Link from "next/link";

export default function NewScanPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-12">
      <h1 className="text-2xl font-semibold text-[#0D1B2A]">New scan</h1>
      <p className="mt-3 text-sm text-slate-600">
        Launch a compliance scan from your Ventura workspace. This placeholder route keeps the
        sidebar navigation aligned with your production dashboard.
      </p>
      <Link
        href="/assessment"
        className="mt-6 inline-flex rounded-md bg-[#0D1B2A] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#1A3A5C]"
      >
        Open assessment scan
      </Link>
    </div>
  );
}
