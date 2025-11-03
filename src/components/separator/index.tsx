import React from "react";

export interface SeparatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className = "", orientation = "horizontal", decorative = true, ...props }, ref) => {
    if (!decorative) return null;

    const baseClasses =
      "bg-border shrink-0 " +
      (orientation === "horizontal"
        ? "h-px w-full"
        : "h-full w-px");

    return <div ref={ref} className={`${baseClasses} ${className}`} {...props} />;
  }
);

Separator.displayName = "Separator";
