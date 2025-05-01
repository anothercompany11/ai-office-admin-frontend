import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-h1-l",
        "text-h1-m",
        "text-h1-r",
        "text-h1-s",
        "text-h1-xs",
        "text-h2-l",
        "text-h2-m",
        "text-h2-r",
        "text-h2-s",
        "text-title-l",
        "text-title-m",
        "text-title-s",
        "text-title-xs",
        "text-subtitle-l",
        "text-subtitle-m",
        "text-subtitle-s",
        "text-subtitle-xs",
        "text-body-l",
        "text-body-m",
        "text-body-s",
        "text-display-1",
        "text-display-2",
        "text-display-3",
        "text-display-4",
        "text-title-1",
        "text-title-2",
        "text-title-3",
        "text-title-4",
        "text-heading-1",
        "text-heading-2",
        "text-heading-3",
        "text-heading-4",
        "text-heading-5",
        "text-headline-1",
        "text-headline-2",
        "text-headline-3",
        "text-body-1",
        "text-body-2",
        "text-body-3",
        "text-body-4",
        "text-caption",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}

/**
 * \( … \)  → $ … $
 * \[ … \]  → $$ … $$
 */
export function formatLatex(src: string) {
  return (
    src
      // 블록 수식 변환
      .replace(/\\\[\s*([\s\S]+?)\s*\\\]/g, (_, exp) => `$$${exp}$$`)
      // 인라인 수식 변환
      .replace(/\\\(\s*([^$]+?)\s*\\\)/g, (_, exp) => `$${exp}$`)
  );
}
