import { ReactNode } from "react";
import SideNavigation from "@/app/_components/SideNavigation";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[16rem_1fr] h-full gap-6 md:gap-12">
      <SideNavigation />
      <div className="px-4 md:px-0 pb-6 md:pb-0">{children}</div>
    </div>
  );
}
