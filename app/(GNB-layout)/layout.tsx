"use client";

import { AdminAccountStorage } from "@/util/storage";
import { useState } from "react";
import GlobalNavBar from "../shared/global-nav-bar";

interface GlobalNavBarLayoutProps {
  children: React.ReactNode;
}

const GlobalNavBarLayout = ({ children }: GlobalNavBarLayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const paddingLeft = isCollapsed ? "pl-[72px]" : "pl-[280px]";
  const adminInfo = AdminAccountStorage.getAdminInfo() || null;

  return (
    <>
      <GlobalNavBar
        adminInfo={adminInfo}
        isCollapsed={isCollapsed}
        onToggleCollapsed={() => setIsCollapsed((prev) => !prev)}
      />
      <div className={`w-screen overflow-x-hidden ${paddingLeft}`}>
        <div className="relative min-h-screen">{children}</div>
      </div>
    </>
  );
};

export default GlobalNavBarLayout;
