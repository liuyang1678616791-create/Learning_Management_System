import * as React from "react";
import { cn } from "@repo/ui/cn";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-11 w-full rounded-2xl border bg-white px-4 text-sm outline-none transition focus:border-[var(--primary)]",
      className,
    )}
    {...props}
  />
));

Input.displayName = "Input";
