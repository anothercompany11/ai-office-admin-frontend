"use client";
import CustomInputField from "@/app/shared/custom-input-field";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
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
        mode: vals.mode,
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
            />

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
                name="count" // ← 여기서 form 에 count 를 바인딩
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
