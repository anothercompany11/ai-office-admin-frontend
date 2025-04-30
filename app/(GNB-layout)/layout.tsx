"use client";

// import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";
import GlobalNavBar from "../shared/global-nav-bar";
import Loading from "../shared/loading";

interface GlobalNavBarLayoutProps {
  children: React.ReactNode;
}

const GlobalNavBarLayout = ({ children }: GlobalNavBarLayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const paddingLeft = isCollapsed ? "pl-[72px]" : "pl-[280px]";

  return (
    <>
      <Loading>
        <GlobalNavBar isCollapsed={isCollapsed} onToggleCollapsed={() => setIsCollapsed((prev) => !prev)} />
        <div className={`w-screen overflow-x-hidden ${paddingLeft}`}>
          <div className="relative min-h-screen">{children}</div>
        </div>
      </Loading>
      {/* <Toaster /> */}
    </>
  );
};

export default GlobalNavBarLayout;
