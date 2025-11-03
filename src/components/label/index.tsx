import React from "react";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label?: string;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = "", label, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        data-slot="label"
        className={`flex items-center gap-2 text-sm leading-none font-medium select-none
          peer-disabled:cursor-not-allowed peer-disabled:opacity-50
          group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50
          ${className}`}
        {...props}
      >
        {label || children}
      </label>
    );
  }
);

Label.displayName = "Label";
