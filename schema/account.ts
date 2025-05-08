import { z } from "zod";

export const accountCreateSchema = z.object({
  name: z.string().nonempty("이름을 입력해주세요."),
  login_id: z.string().nonempty("아이디를 입력해주세요."),
  password: z.string().min(4, "비밀번호는 최소 4자 이상이어야 합니다."),
  useDefaultPassword: z.boolean(),
});

export type AccountCreateSchema = z.infer<typeof accountCreateSchema>;
