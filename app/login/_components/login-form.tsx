import CustomInputField from "@/app/shared/custom-input-field";
import { CtaButton } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CODE_PAGE } from "@/constants/path";
import { useLogin } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<null | string>(null);

  // 로그인 성공 콜백 핸들러
  const onSuccess = () => {
    router.replace(CODE_PAGE);
  };
  const { form, onSubmit } = useLogin(onSuccess, setError);
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex w-full max-w-[350px] flex-col gap-4">
        <div className="flex flex-col gap-2">
          <CustomInputField form={form} name="login_id" placeholder="ID" />
          <CustomInputField type="password" form={form} name="password" placeholder="Password" />
          {error && <p className="pl-[6px] text-caption text-error">{error}</p>}
        </div>
        <CtaButton>로그인</CtaButton>
      </form>
    </Form>
  );
};
export default LoginForm;
