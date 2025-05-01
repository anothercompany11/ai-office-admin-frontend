"use client";

import { cn } from "@/lib/utils";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

interface SelectBoxProps {
  value: string;
  onChange: (val: string) => void;
  options: { label: string; value: string }[];
}

export function SelectBox({ value, onChange, options }: SelectBoxProps) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onChange}>
      <SelectPrimitive.Trigger
        className={cn("flex items-center justify-between gap-[10px] rounded-sm border px-4 py-3 text-sm shadow-xs")}
        aria-label="Select box"
      >
        <SelectPrimitive.Value placeholder="선택..." />
        <SelectPrimitive.Icon>
          <ChevronDownIcon className="size-4 opacity-50" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={4}
          align="start"
          className="z-50 mt-1 w-fit min-w-[8rem] overflow-hidden rounded-sm border bg-popover text-popover-foreground shadow-md"
        >
          <SelectPrimitive.Viewport className="p-1">
            {options.map((opt) => (
              <SelectPrimitive.Item
                key={opt.value}
                value={opt.value}
                className="relative flex cursor-default items-center gap-2 px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground"
              >
                <button className="absolute right-2 cursor-pointer flex items-center">
                  <SelectPrimitive.ItemIndicator>
                    <CheckIcon className="size-4" />
                  </SelectPrimitive.ItemIndicator>
                </button>
                <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
