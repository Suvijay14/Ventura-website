import Link from "next/link";

export default function AppHomePage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-12">
      <h1 className="text-2xl font-semibold text-[#0D1B2A]">Workspace</h1>
      <p className="mt-3 text-sm text-slate-600">
        Access scans, reports, and the new Strategy Intelligence research engine from the sidebar.
      </p>
      <Link
        href="/app/strategy"
        className="mt-6 inline-flex rounded-md bg-[#0D1B2A] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#1A3A5C]"
      >
        Open Strategy Intelligence
      </Link>
    </div>
  );
}
