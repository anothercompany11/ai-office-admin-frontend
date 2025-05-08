import { z } from "zod";

// 코드 생성 스키마
// export const codeCreateSchema = z.object({
//   name: z.string().min(1, { message: "최소 1글자 이상 입력해주세요." }),
//   description: z.string().optional(),
//   mode: z.enum(["single", "batch"]),
//   count: z
//     .number({ invalid_type_error: "숫자를 입력해주세요." })
//     .min(1, { message: "1개 이상 입력해야 합니다." })
//     .optional(),
// });

// export type CodeCreateSchema = z.infer<typeof codeCreateSchema>;
export const codeCreateSchema = z
  .object({
    name: z.string().min(1, { message: "학교 이름을 입력해주세요." }),
    description: z.string().optional(),
    mode: z.enum(["single", "batch"]),
    count: z.string().min(1, { message: "1 이상 입력해주세요." }).optional(),
  })
  .refine((data) => data.mode === "single" || (data.mode === "batch" && data.count !== undefined), {
    message: "단체 생성 시 개수를 입력해주세요.",
    path: ["count"],
  });

export type CodeCreateSchema = z.infer<typeof codeCreateSchema>;
