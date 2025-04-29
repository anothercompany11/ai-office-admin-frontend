import { z } from "zod";

// 로그인 폼 스키마
export const loginSchema = z.object({
  login_id: z.string({ required_error: "아이디를 입력해주세요" }),
  password: z.string({ required_error: "비밀번호를 입력해주세요" }),
});

// 비밀번호 변경 폼 스키마
export const PasswordChangeSchema = z.object({
  password: z.string({ required_error: "비밀번호를 입력해주세요" }),
  newPassword: z.string({ required_error: "비밀번호를 입력해주세요" }),
  newPasswordConfirm: z.string({ required_error: "비밀번호를 입력해주세요" }),
});
