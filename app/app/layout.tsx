import type { ReactNode } from "react";
import AppSidebar from "@/components/app/AppSidebar";

export default function AppWorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col bg-[#FFFFFF] md:flex-row">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto bg-[#FFFFFF]">{children}</main>
    </div>
  );
}
