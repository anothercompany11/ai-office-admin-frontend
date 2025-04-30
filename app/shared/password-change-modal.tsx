import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { usePostChangePassword } from "@/hooks/use-post-change-password";
import CustomInputField from "./custom-input-field";

interface PasswordChangeModalProps {
  onClickClose: () => void;
}

const PasswordChangeModal = ({ onClickClose }: PasswordChangeModalProps) => {
  const onSuccess = () => {
    alert("비밀번호가 변경되었어요");
    onClickClose();
  };
  const { form, onSubmit } = usePostChangePassword(onSuccess);

  const passwordArray = [
    {
      label: "현재 비밀번호",
      placeholder: "현재 비밀번호를 입력해주세요",
      name: "password",
    },
    {
      label: "새 비밀번호",
      placeholder: "새 비밀번호를 입력해주세요",
      name: "newPassword",
    },
    {
      label: "새 비밀번호 확인",
      placeholder: "새 비밀번호를 확인해주세요",
      name: "newPasswordConfirm",
    },
  ];

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/70 px-5">
      <Form {...form}>
        <form onSubmit={onSubmit} className="flex flex-col gap-8 rounded-xl w-full max-w-[500px] bg-white p-4">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col items-center gap-1">
              <p className="text-title-m">비밀번호 변경하기</p>
            </div>
            <div className="flex flex-col gap-4">
              {passwordArray.map((pw) => (
                <div className="flex flex-col gap-2" key={pw.label}>
                  <p className="heading-5">{pw.label}</p>
                  <CustomInputField
                    type="password"
                    form={form}
                    name={pw.name as "password" | "newPassword" | "newPasswordConfirm"}
                    placeholder={pw.placeholder}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button variant={"outline"} type="button" onClick={onClickClose}>
              다음에 하기
            </Button>
            <Button>변경하기</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default PasswordChangeModal;
