"use client";

import Image from "next/image";
import LoginForm from "./_components/login-form";

const LoginPage = () => {
  return (
    <div className="fixed bg-[#050505] inset-0 flex flex-col items-center justify-center">
      <div className="bg-[#383838] w-full max-w-[350px] py-10 px-[22px] flex flex-col gap-4 rounded-[20px]">
        <div className="flex flex-col gap-6 items-center">
          <Image src={"/svg/logo.svg"} alt="AI 오피스" width={100} height={21} />
          <Image src={"/svg/logo-text.svg"} alt="AI 오피스" width={232} height={52} />
        </div>
        <p className="text-white text-subtitle-l text-center">관리자</p>
        <LoginForm />
      </div>
    </div>
  );
};
export default LoginPage;
