"use client";
import CustomInputField from "@/app/shared/custom-input-field";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useCreateAdminAccount from "@/hooks/use-create-account";
import { accountCreateSchema, AccountCreateSchema } from "@/schema/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  page: number;
  size: number;
}

export default function AdminCreateModal({ open, onOpenChange, page, size }: Props) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [open]);

  const form = useForm<AccountCreateSchema>({
    resolver: zodResolver(accountCreateSchema),
    defaultValues: {
      name: "",
      login_id: "",
      password: "",
      useDefaultPassword: false,
    },
    mode: "onChange",
  });
  const { control, handleSubmit, watch, reset, formState, setValue } = form;
  const { createAccount, isCreating } = useCreateAdminAccount(page, size);

  const useDefault = watch("useDefaultPassword");

  const onSubmit: SubmitHandler<AccountCreateSchema> = async (vals) => {
    const payload = {
      ...vals,
      password: vals.useDefaultPassword ? "00000000" : vals.password,
    };
    await createAccount(payload);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        reset();
        onOpenChange(o);
      }}
    >
      <DialogContent className="w-full max-w-[400px] gap-10">
        <div className="flex justify-between items-center">
          <p className="text-title-l">관리자 생성하기</p>
          <button onClick={() => onOpenChange(false)}>
            <XIcon className="size-6 text-component" />
          </button>
        </div>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="flex flex-col gap-6">
              <CustomInputField
                form={form}
                name="name"
                placeholder="이름을 입력해 주세요"
                label="이름"
                isValid={!formState.errors.name}
              />

              <CustomInputField
                form={form}
                name="login_id"
                placeholder="아이디를 입력해 주세요"
                label="아이디"
                isValid={!formState.errors.login_id}
              />

              {/* 비밀번호 입력 */}
              <div className="flex flex-col gap-3">
                <FormField
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>비밀번호</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="비밀번호를 입력해주세요."
                          disabled={useDefault}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* 초기 비밀번호 설정 토글 */}
                <FormField
                  control={control}
                  name="useDefaultPassword"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            // 토글 켜면 비밀번호 자동 세팅, 끄면 빈 값
                            setValue(
                                "password",
                                checked ? "00000000" : "",
                                { shouldValidate: true, shouldDirty: true }
                              );
                          }}
                        />
                      </FormControl>
                      <FormLabel>초기 비밀번호 설정</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-10">
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  reset();
                  onOpenChange(false);
                }}
                type="button"
                disabled={isCreating}
              >
                취소
              </Button>
              <Button size="lg" type="submit" disabled={!formState.isValid || isCreating}>
                생성하기
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
