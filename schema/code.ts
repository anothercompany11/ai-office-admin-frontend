import { z } from "zod";

// 코드 생성 스키마
export const codeCreateSchema = z
  .object({
    name: z.string().min(1, { message: "학교 이름을 입력해주세요." }),
    description: z.string().optional(),
    mode: z.enum(["single", "batch"]),
    count: z.string().min(1, { message: "1 이상 입력해주세요." }).optional(),
    initials: z
      .string()
      .length(3, { message: "이니셜은 3글자의 영문이어야 합니다." })
      .regex(/^[a-zA-Z]+$/, { message: "이니셜은 3글자의 영문이어야 합니다." })
      .nullable()
      .optional(),
    grade: z
      .string()
      .regex(/^[1-9]$/, { message: "학년은 1-6 사이의 숫자여야 합니다." })
      .nullable()
      .optional(),
    class_number: z
      .string()
      .regex(/^[1-9][0-9]?$/, { message: "반 번호는 1-99 사이의 숫자여야 합니다." })
      .nullable()
      .optional(),
    start_number: z
      .string()
      .regex(/^[0-9]+$/, { message: "숫자만 입력 가능합니다." })
      .optional(),
  })
  .refine((data) => data.mode === "single" || (data.mode === "batch" && data.count !== undefined), {
    message: "단체 생성 시 개수를 입력해주세요.",
    path: ["count"],
  })
  .refine(
    (data) => {
      // 모두 입력하지 않은 경우는 허용
      if (!data.grade && !data.class_number && !data.initials) {
        return true;
      }
      // 하나라도 입력된 경우 모두 입력되어야 함
      if (data.grade && !data.class_number) return false;
      if (data.grade && !data.initials) return false;

      return true;
    },
    {
      message: "학년을 입력했다면 반과 영문약자도 입력해주세요.",
      path: ["class_number"],
    }
  )
  .refine(
    (data) => {
      // 모두 입력하지 않은 경우는 허용
      if (!data.grade && !data.class_number && !data.initials) {
        return true;
      }
      // 하나라도 입력된 경우 모두 입력되어야 함
      if (data.class_number && !data.grade) return false;
      if (data.class_number && !data.initials) return false;

      return true;
    },
    {
      message: "반을 입력했다면 학년과 영문약자도 입력해주세요.",
      path: ["grade"],
    }
  )
  .refine(
    (data) => {
      // 모두 입력하지 않은 경우는 허용
      if (!data.grade && !data.class_number && !data.initials) {
        return true;
      }
      // 하나라도 입력된 경우 모두 입력되어야 함
      if (data.initials && !data.grade) return false;
      if (data.initials && !data.class_number) return false;

      return true;
    },
    {
      message: "영문약자를 입력했다면 학년과 반도 입력해주세요.",
      path: ["initials"],
    }
  );

export type CodeCreateSchema = z.infer<typeof codeCreateSchema>;
