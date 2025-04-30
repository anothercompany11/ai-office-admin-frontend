"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import useGenerateCodes from "@/hooks/use-create-code";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface FormValues {
  name: string;
  description: string;
  autoGenerate: boolean;
  count?: number;
}
interface CodeCreateModalProps {
  skip: number;
  limit: number;
}

export default function CodeCreateModal({ skip, limit }: CodeCreateModalProps) {
  const [open, setOpen] = useState(false);
  const { control, register, handleSubmit, watch, formState, reset } = useForm<FormValues>({
    defaultValues: { name: "", description: "", autoGenerate: false, count: undefined },
  });
  const autoGenerate = watch("autoGenerate");
  const { generate, isLoading, error } = useGenerateCodes(skip, limit);

  // onSuccess: 모달 닫고 폼 리셋
  const onSubmit = async (vals: FormValues) => {
    await generate({
      name: vals.name,
      description: vals.description,
      prompt_limit: 5,
      count: vals.autoGenerate ? vals.count! : 1,
    });
    setOpen(false);
    reset();
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm">학교 이름 *</label>
            <Input {...register("name", { required: true })} />
            {formState.errors.name && <p className="text-xs text-red-600">필수 입력입니다.</p>}
          </div>
          <div>
            <label className="block text-sm">관리자 메모</label>
            <Textarea {...register("description")} rows={3} />
          </div>
          <div>
            <label className="block text-sm">단체 자동 생성</label>
            <Controller
              control={control}
              name="autoGenerate"
              render={({ field }) => (
                <RadioGroup onValueChange={(v) => field.onChange(v === "true")} value={String(field.value)}>
                  <label className="mr-4">
                    <RadioGroupItem value="false" /> 수동(1개)
                  </label>
                  <label>
                    <RadioGroupItem value="true" /> 자동
                  </label>
                </RadioGroup>
              )}
            />
          </div>
          {autoGenerate && (
            <div>
              <label className="block text-sm">생성 개수 *</label>
              <Input type="number" {...register("count", { required: true, min: 1 })} />
              {formState.errors.count && <p className="text-xs text-red-600">1 이상 입력하세요.</p>}
            </div>
          )}
          {error && <p className="text-sm text-red-600">생성 실패: {error.message}</p>}
          <DialogFooter className="flex justify-end">
            <Button type="submit" disabled={!formState.isValid || isLoading}>
              {isLoading ? "생성 중…" : "생성하기"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
