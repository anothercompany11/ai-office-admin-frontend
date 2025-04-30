import { cn } from "@/lib/utils";
import * as React from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex border rounded-md w-full border-black/10 px-4 py-3 body-m transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#8B909C] focus-visible:border-black focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:text-black/40",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
