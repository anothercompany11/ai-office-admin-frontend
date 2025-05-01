"use client";

import { ADMIN_ACCOUNT_PAGE, CODE_PAGE, LOGIN_PAGE, PASSWORD_RESET_PAGE } from "@/constants/path";
import { usePostLogout } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AdminRole } from "../api/dto/auth";
import AdminInfoBox from "./admin-info-box";

interface GlobalNavBarProps {
  isCollapsed: boolean;
  onToggleCollapsed: () => void;
}

const GlobalNavBar = ({ isCollapsed, onToggleCollapsed }: GlobalNavBarProps) => {
  const path = usePathname();
  const router = useRouter();
  const { onSubmit } = usePostLogout();

  // 로그아웃 성공 핸들러
  const handleSuccessLogOut = () => {
    router.replace(LOGIN_PAGE);
  };

  // 메뉴 목록
  const menuArray = [
    {
      label: "코드 관리",
      icon: "link",
      path: CODE_PAGE, // 단일 경로(문자열)
    },
  ];

  // 어드민 관련 메뉴
  const adminArray = [
    {
      label: "관리자 계정 관리",
      icon: "user",
      path: ADMIN_ACCOUNT_PAGE,
    },
    {
      label: "비밀번호 변경",
      icon: "lock",
      path: PASSWORD_RESET_PAGE,
    },
    {
      label: "로그아웃",
      icon: "logout",
      onClick: () => onSubmit(handleSuccessLogOut),
    },
  ];

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 flex flex-col gap-3 bg-label-strong text-white",
        isCollapsed ? "" : "w-[280px]"
      )}
    >
      <div className="relative">
        {/* 상단 로고 & 토글 버튼 */}
        <div className={cn("flex items-center justify-between", isCollapsed ? "px-6" : "px-4")}>
          {!isCollapsed && (
            <Link prefetch={false} className="relative block py-6" href={CODE_PAGE}>
              <Image src={"/svg/logo.svg"} alt="AI Office Admin" width={100} height={21} />
            </Link>
          )}
          <button onClick={onToggleCollapsed} className="py-6">
            {isCollapsed ? <ChevronsRight className="size-6" /> : <ChevronsLeft className="size-6" />}
          </button>
        </div>

        {/* isCollapsed=true → 관리자 정보 영역 숨김 */}
        {/* todo: 이거 바꿔야함 */}
        {!isCollapsed && (
          <AdminInfoBox
            admin={{
              name: "관리자",
              role: AdminRole.ADMIN,
            }}
          />
        )}

        {/* 메뉴 리스트 */}
        <div
          className={cn(
            `overflow-y-auto w-full hide-scroll-bar`,
            isCollapsed ? "max-h-[calc(100vh-72px)]" : "max-h-[calc(100vh-125px)]"
          )}
        >
          <div
            className={cn(
              "flex h-full flex-col justify-between gap-10 pb-6",
              isCollapsed ? "min-h-[calc(100vh-72px)]" : "min-h-[calc(100vh-125px)]"
            )}
          >
            <div>
              {menuArray.map((menu) => {
                // -------------------------------------
                // 1) "단일 경로" (string)인 메뉴
                // -------------------------------------
                if (typeof menu.path === "string") {
                  const isActive = path === menu.path;
                  return (
                    <Link
                      prefetch={false}
                      key={menu.path}
                      className={cn(
                        "flex items-center gap-3 px-3 py-4 title-s hover:underline",
                        isActive ? "bg-label" : "",
                        isCollapsed ? "justify-center" : ""
                      )}
                      href={menu.path}
                    >
                      <Image src={`/svg/${menu.icon}.svg`} alt={menu.label} width={24} height={24} className="-mt-px" />
                      {/* 메뉴 닫힘 시 라벨 숨김 */}
                      {!isCollapsed && menu.label}
                    </Link>
                  );
                }

                // -------------------------------------
                // 2) "하위 메뉴" (array)인 메뉴
                // -------------------------------------
                else {
                  // (a) 열려있는 경우 -> 기존에 사용하던 MenuAccordion
                  // if (!isCollapsed) {
                  //   return (
                  //     <MenuAccordion
                  //       currentPath={path}
                  //       menu={menu as DepthMenu}
                  //       key={menu.label}
                  //       collapsed={isCollapsed}
                  //     />
                  //   );
                  // }
                  // (b) 접혀있는 경우 -> 새로 만든 아이콘+팝업
                  // else {
                  //   return (
                  //     <CollapsedMultiLevelItem
                  //       key={menu.label}
                  //       icon={menu.icon}
                  //       label={menu.label}
                  //       subMenus={menu.path} // 하위 path 배열
                  //       currentPath={path}
                  //     />
                  //   );
                  // }
                }
              })}
            </div>

            {/* 어드민 관련 메뉴 */}
            <div>
              {adminArray.map((menu) => {
                if (menu.path) {
                  const isActive = path === menu.path;
                  return (
                    <Link
                      prefetch={false}
                      key={menu.path}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-4 subtitle-2 hover:underline",
                        isActive ? "bg-[#353434]" : "",
                        isCollapsed ? "justify-center" : ""
                      )}
                      href={menu.path}
                    >
                      <Image src={`/svg/${menu.icon}.svg`} alt={menu.label} width={24} height={24} className="-mt-px" />
                      {!isCollapsed && menu.label}
                    </Link>
                  );
                } else {
                  // onClick만 있는 경우(로그아웃 등)
                  return (
                    <button
                      key={menu.label}
                      onClick={menu.onClick}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-md px-3 py-4 subtitle-2 hover:underline",
                        isCollapsed ? "justify-center" : ""
                      )}
                    >
                      <Image src={`/svg/${menu.icon}.svg`} alt={menu.label} width={24} height={24} className="-mt-px" />
                      {!isCollapsed && menu.label}
                    </button>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalNavBar;
