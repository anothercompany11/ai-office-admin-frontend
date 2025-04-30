"use client";

import { changePassword } from "@/app/api/admin";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface ChangePasswordForm {
  password: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export function usePostChangePassword(onSuccess: () => void) {
  const form = useForm<ChangePasswordForm>({
    defaultValues: {
      password: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = form.handleSubmit(async (vals) => {
    if (vals.newPassword !== vals.newPasswordConfirm) {
      setError("새 비밀번호가 일치하지 않습니다.");
      return;
    }
    setError(null);
    setIsSubmitting(true);
    try {
      await changePassword({
        current_password: vals.password,
        new_password: vals.newPassword,
      });
      onSuccess();
    } catch (e: unknown) {
      console.error(e);
      setError("비밀번호 변경에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  });

  return { form, onSubmit, isSubmitting, error };
}
