import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { handlePhoneNumberInput } from "@/util/number";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { ControllerRenderProps, FieldValues, Path, UseFormReturn } from "react-hook-form";

interface CustomInputFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  placeholder: string;
  isValid?: boolean; // 유효성 검사 여부
  validText?: string; // 유효성 검사 텍스트
  maxLength?: number; // 최대 입력 가능 글자 수
  noSpace?: boolean; // 첫 글자 공백 입력 불가 여부
  label?: string; // 라벨
  disabled?: boolean; // 비활성화 여부
  type?: "number" | "email" | "text" | "password" | "tel";
  className?: string; // 클래스명
  noMessage?: boolean; // 메시지 미표시 여부
}

const CustomInputField = <T extends FieldValues>({
  form,
  name,
  placeholder,
  isValid,
  validText,
  maxLength,
  noSpace,
  label,
  disabled,
  type,
  className,
  noMessage,
}: CustomInputFieldProps<T>) => {
  const [currentType, setCurrentType] = useState(type);
  const [isExposedPassword, setExposed] = useState(false);

  // 값 변경 핸들러
  const onChangeValue = (value: string, field: ControllerRenderProps<T, Path<T>>) => {
    if (value.includes(" ")) {
      field.onChange(value.trim());
    } else {
      if (type === "tel") {
        const phone = handlePhoneNumberInput(value);
        return field.onChange(phone);
      }
      field.onChange(value);
    }
  };

  // 비밀번호 보기 핸들러
  const onClickCheckPassword = () => {
    if (currentType === "password") {
      setCurrentType("text");
    } else {
      setCurrentType("password");
    }
    setExposed(!isExposedPassword);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label ? (
            <FormLabel className="mb-2" htmlFor={name}>
              {label}
            </FormLabel>
          ) : (
            <FormLabel htmlFor={name} />
          )}
          <FormControl>
            <div className="relative">
              <Input
                type={currentType}
                disabled={disabled}
                id={name}
                maxLength={maxLength}
                className={`disabled:mt-3 w-full disabled:bg-black/10 ${!isValid && validText ? "border-status-error focus-visible:border-status-error" : ""} ${className}`}
                {...field}
                onChange={noSpace ? (e) => onChangeValue(e.target.value, field) : field.onChange}
                placeholder={placeholder}
              />
              {type === "password" && (
                <button
                  onClick={onClickCheckPassword}
                  type="button"
                  className="absolute inset-y-0 right-0 z-10 my-auto mr-4"
                >
                  {!isExposedPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                </button>
              )}
            </div>
          </FormControl>
          {!noMessage && !isValid && validText && (
            <div className="mt-2">
              <FormMessage>
                <span>{validText}</span>
              </FormMessage>
            </div>
          )}
        </FormItem>
      )}
    />
  );
};
export default CustomInputField;
