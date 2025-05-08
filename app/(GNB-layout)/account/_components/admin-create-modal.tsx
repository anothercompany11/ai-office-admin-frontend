"use client";
import CustomInputField from "@/app/shared/custom-input-field";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import useCreateAdminAccount from "@/hooks/use-create-account";
import { accountCreateSchema, AccountCreateSchema } from "@/schema/account";
import { DialogTitle } from "@radix-ui/react-dialog";

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
    // 토글 켰으면 서버로 '00000000' 넘김
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
      <DialogContent className="w-full max-w-[400px]">
        <DialogTitle/>
        <div className="flex justify-between items-center mb-8 border">
          <p className="text-title-l">관리자 생성하기</p>
          <button onClick={() => onOpenChange(false)}>
            <XIcon className="size-6 text-component" />
          </button>
        </div>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <CustomInputField
              form={form}
              name="name"
              placeholder="이름을 입력해 주세요"
              label="이름"
              isValid={!formState.errors.name}
              validText={formState.errors.name?.message}
            />

            <CustomInputField
              form={form}
              name="login_id"
              placeholder="아이디를 입력해 주세요"
              label="아이디"
              isValid={!formState.errors.login_id}
              validText={formState.errors.login_id?.message}
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
                        setValue("password", checked ? "00000000" : "");
                      }}
                    />
                  </FormControl>
                  <FormLabel>초기 비밀번호 설정</FormLabel>
                </FormItem>
              )}
            />

            {/* 비밀번호 입력 */}
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="비밀번호를 입력해주세요." disabled={useDefault} />
                  </FormControl>
                  {formState.errors.password && (
                    <p className="mt-1 text-xs text-red-600">{formState.errors.password.message}</p>
                  )}
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
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
