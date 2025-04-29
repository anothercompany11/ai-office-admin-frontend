import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import * as React from "react";

const buttonVariants = cva("inline-flex w-full items-center justify-center whitespace-nowrap transition-colors", {
  variants: {
    variant: {
      fill: "bg-primary text-white hover:bg-primary-strong active:bg-primary-heavy disabled:bg-label-disabled disabled:text-label-alternative",
      outlineP:
        "border border-[#0E0E0F] bg-background hover:bg-[#F7F8FA] active:bg-label-disabled disabled:border-line disabled:bg-white disabled:text-label-disabled",
      outlineA:
        "border border-line bg-background hover:bg-component-alternative active:bg-component disabled:border-line disabled:bg-white disabled:text-label-disabled",
      ghost: "hover:text-label disabled:text-label-disabled",
      leftTextIcon: "text-primary underline-offset-4 hover:underline",
      rightTextIcon: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      sm: "h-[25px] rounded-md px-3 py-1 text-title-xs",
      md: "h-[37px] rounded-lg px-5 py-2 text-title-s",
      lg: "h-[48px] rounded-lg px-6 py-[13.5px] text-title-s",
      xl: "h-[52px] rounded-lg px-6 py-[14px] text-title-m",
    },
  },
  defaultVariants: {
    variant: "fill",
    size: "md",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

const iconButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors",
  {
    variants: {
      variant: {
        normal: "",
        outline:
          "rounded-full border border-line bg-background hover:bg-component-alternative active:bg-component disabled:bg-component-alternative",
        fill: "rounded-full bg-background hover:bg-component-alternative active:bg-component disabled:bg-component-alternative",
      },
      size: {
        sm: "size-[26px]",
        md: "size-[40px]",
      },
    },
    defaultVariants: {
      variant: "normal",
      size: "md",
    },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean;
  src: string;
  width: number;
  height: number;
  badgeContent?: string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, src, width, height, asChild = false, disabled, badgeContent, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <div className="relative">
        <Comp className={cn(iconButtonVariants({ variant, className }))} ref={ref} disabled={disabled} {...props}>
          <Image
            src={src}
            alt={`${src}-icon`}
            width={width}
            height={height}
            className={disabled ? "opacity-20" : "opacity-100"}
          />
          {badgeContent && (
            <span className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-full bg-[#FE4E4E] text-xs text-white">
              {badgeContent}
            </span>
          )}
        </Comp>
      </div>
    );
  }
);
IconButton.displayName = "IconButton";

const textIconButtonVariants = cva("inline-flex items-center justify-center whitespace-nowrap transition-colors", {
  variants: {
    variant: {
      fill: "bg-white  hover:bg-component-alternative active:bg-white  disabled:text-label-disabled",
      ghost: "hover:text-label disabled:text-label-disabled",
    },
    size: {
      sm: "gap-[4px] rounded-md px-3 py-[7.5px] text-title-xs",
      md: "gap-[8px] rounded-lg px-[14px] py-[10.5px] text-title-s",
      lg: "gap-[8px] rounded-lg px-4 py-3 text-title-m",
    },
  },
  defaultVariants: {
    variant: "fill",
    size: "md",
  },
});
export interface TextIconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof textIconButtonVariants> {
  asChild?: boolean;
  iconSrc: string;
  iconWidth: number;
  iconHeight: number;
  text: string;
  iconPosition: "left" | "right";
}

const TextIconButton = React.forwardRef<HTMLButtonElement, TextIconButtonProps>(
  (
    { className, variant, size, asChild = false, iconSrc, iconWidth, iconHeight, iconPosition, text, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(textIconButtonVariants({ variant, size, className }))} ref={ref} {...props}>
        {iconPosition === "left" && (
          <Image src={iconSrc} alt={`${iconSrc}-icon`} width={iconWidth} height={iconHeight} />
        )}
        {text}
        {iconPosition === "right" && (
          <Image src={iconSrc} alt={`${iconSrc}-icon`} width={iconWidth} height={iconHeight} />
        )}
      </Comp>
    );
  }
);
TextIconButton.displayName = "TextIconButton";

const ctaButtonVariants = cva(
  "inline-flex w-full items-center justify-center whitespace-nowrap rounded-xl bg-primary py-4 text-title-l text-white transition-colors hover:bg-primary-strong active:bg-primary-heavy disabled:bg-label-disabled disabled:text-label-alternative"
);

export interface CtaButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ctaButtonVariants> {
  asChild?: boolean;
}

const CtaButton = React.forwardRef<HTMLButtonElement, CtaButtonProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(ctaButtonVariants({ className }))} ref={ref} {...props} />;
  }
);
CtaButton.displayName = "CtaButton";

export { Button, buttonVariants, CtaButton, IconButton, TextIconButton };
