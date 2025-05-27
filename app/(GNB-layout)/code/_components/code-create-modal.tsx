"use client";
import CustomInputField from "@/app/shared/custom-input-field";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useGenerateCodes from "@/hooks/use-create-code";
import { codeCreateSchema, CodeCreateSchema } from "@/schema/code";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface CodeCreateModalProps {
  skip: number;
  limit: number;
}

export default function CodeCreateModal({ skip, limit }: CodeCreateModalProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<CodeCreateSchema>({
    resolver: zodResolver(codeCreateSchema),
    defaultValues: {
      name: "",
      description: "",
      mode: "single",
      count: "1",
      initials: null,
      grade: null,
      class_number: null,
      start_number: "1",
    },
    mode: "onChange",
  });

  const { control, handleSubmit, watch, formState, reset } = form;
  const mode = watch("mode");
  const { generate, isLoading } = useGenerateCodes(skip, limit);

  // 모달창 닫기 핸들러
  const handleCloseModal = () => {
    reset();
    setOpen(false);
  };

  const onSubmit: SubmitHandler<CodeCreateSchema> = (vals) => {
    // batch 모드면 count 사용, single 모드면 1 고정
    const count = vals.mode === "batch" ? Number(vals.count) : 1;
    return generate(
      {
        name: vals.name,
        description: vals.description ?? "",
        count: String(count),
        initials: vals.initials,
        grade: vals.grade,
        class_number: vals.class_number,
        mode: vals.mode,
        start_number: vals.start_number,
      },
      handleCloseModal
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>코드 생성하기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>코드 생성하기</DialogTitle>
          <p className="bg-primary p-3 rounded-sm text-white text-subtitle-m">
            <span>학년 / 반 / 영문 약자 미입력 시 </span>
            <span className="text-title-m">코드 랜덤 생성</span>
          </p>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <CustomInputField
              form={form}
              name="name"
              placeholder="학교 이름을 입력하세요"
              label="학교 이름"
              isValid={!formState.errors.name}
              validText={formState.errors.name?.message}
            />
            <CustomInputField
              form={form}
              name="initials"
              placeholder="영문 약자(2자리)를 입력하세요"
              label="영문 약자"
              maxLength={2}
              isValid={!formState.errors.initials}
              validText={formState.errors.initials?.message}
            />

            <CustomInputField
              form={form}
              name="grade"
              placeholder="학년을 입력하세요"
              label="학년"
              isValid={!formState.errors.grade}
              validText={formState.errors.grade?.message}
            />
            <CustomInputField
              form={form}
              name="class_number"
              placeholder="반을 입력하세요"
              label="반"
              isValid={!formState.errors.class_number}
              validText={formState.errors.class_number?.message}
            />
            <CustomInputField
              form={form}
              name="start_number"
              placeholder="시작 번호를 입력하세요"
              label="시작 번호"
              isValid={!formState.errors.start_number}
              validText={formState.errors.start_number?.message}
            />

            {/* 관리자 메모 임시 주석 처리 */}
            {/* 
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2">관리자 메모</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={3} placeholder="관리자 메모를 입력하세요" />
                  </FormControl>
                </FormItem>
              )}
            /> */}

            <FormField
              control={control}
              name="mode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2">생성 모드</FormLabel>
                  <RadioGroup value={field.value} onValueChange={field.onChange} className="flex gap-6">
                    <label className="flex items-center gap-1">
                      <RadioGroupItem value="single" /> 단일 생성
                    </label>
                    <label className="flex items-center gap-1">
                      <RadioGroupItem value="batch" /> 단체 생성
                    </label>
                  </RadioGroup>
                </FormItem>
              )}
            />

            {mode === "batch" && (
              <CustomInputField
                type="number"
                form={form}
                name="count"
                placeholder="생성 개수를 입력하세요"
                isValid={!formState.errors.count}
                validText={formState.errors.count?.message}
              />
            )}

            <DialogFooter className="flex justify-end gap-2">
              <Button size="lg" variant="outline" type="button" onClick={handleCloseModal}>
                취소
              </Button>
              <Button loading={isLoading} size="lg" type="submit" disabled={!formState.isValid}>
                생성하기
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
