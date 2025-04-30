import { LoadIcon } from "@/app/shared/loading";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "flex w-full items-center justify-center whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:text-black/40",
  {
    variants: {
      variant: {
        default: "bg-primary text-white disabled:bg-primary/10",
        pink: "bg-[#FF6668] text-white",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border bg-white text-black disabled:bg-gray-100",
        "outline-black": "border border-black disabled:border-gray-300",
      },
      size: {
        default: "h-12 px-[15px] text-title-m",
        sm: "h-[30px] max-w-max rounded-sm px-3 py-1 subtitle-3",
        md: "h-[37px] px-6 py-2 button-m-cta",
        lg: "h-[59px] rounded-md px-6 text-subtitle-l",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean; // 로딩 중인지 여부
  "data-state"?: "on" | "off" | "closed";
  loadColor?: "red" | "white";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, loadColor, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <>
        {loading ? (
          <Comp
            disabled={loading}
            className={cn(
              buttonVariants({ variant, size, className }),
              "relative",
              loadColor === "white" ? "disabled:border-primary/400" : ""
            )}
            ref={ref}
            {...props}
          >
            <LoadIcon type="button" color={loadColor ?? "red"} />
          </Comp>
        ) : (
          <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
        )}
      </>
    );
  }
);
Button.displayName = "Button";
export { Button, buttonVariants };
