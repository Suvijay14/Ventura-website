"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Radar } from "lucide-react";

const navItems = [
  { label: "New Scan", href: "/app/new-scan", icon: Radar },
  { label: "Reports", href: "/app/reports", icon: FileText },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-full flex-shrink-0 flex-col border-b border-[#1A3A5C] bg-[#0D1B2A] text-white md:h-screen md:w-60 md:border-b-0 md:border-r">
      <div className="px-5 py-6">
        <p className="text-xs font-semibold tracking-wide text-slate-300">Ventura</p>
        <p className="mt-1 text-lg font-semibold">Workspace</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-3 pb-6">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                active ? "bg-[#1A3A5C] text-white" : "text-slate-200 hover:bg-[#1A3A5C]/70"
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0 text-[#E8A838]" aria-hidden />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
