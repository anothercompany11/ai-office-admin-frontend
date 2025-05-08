import CustomInputField from "@/app/shared/custom-input-field";
import { Button } from "@/components/ui/button";
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
  const { form, onSubmit, loading } = useLogin(onSuccess, setError);
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex w-full flex-col gap-4">
        <div className="flex w-full flex-col gap-2">
          <CustomInputField form={form} name="login_id" placeholder="아이디를 입력해주세요." />
          <CustomInputField type="password" form={form} name="password" placeholder="비밀번호를 입력해주세요." />
          {error && <p className="pl-[6px] text-caption text-status-error">{error}</p>}
        </div>
        <Button loading={loading} type="submit">
          로그인
        </Button>
      </form>
    </Form>
  );
};
export default LoginForm;
