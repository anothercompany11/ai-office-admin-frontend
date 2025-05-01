"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CircleIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root data-slot="radio-group" className={cn("grid gap-3", className)} {...props} />;
}

function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "w-[18px] h-[18px] border-2 border-input rounded-full shadow-xs transition-all",
        "focus-visible:border-ring focus-visible:ring-ring/50",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator data-slot="radio-group-indicator" className="flex items-center justify-center">
        <CircleIcon className="w-[12px] h-[12px] fill-primary text-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
