"use client";

import LoginForm from "./_components/login-form";

const LoginPage = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-[26px]">
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-title-l">Handaggle Admin</p>
      </div>
      <LoginForm />
    </div>
  );
};
export default LoginPage;
