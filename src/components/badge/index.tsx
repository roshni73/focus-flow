import * as React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
  children: React.ReactNode;
}

function Badge({
  className,
  variant = 'default',
  children,
  ...props
}: BadgeProps) {
  const baseClasses = "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium";

  const variantClasses = {
    default: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
    destructive: "bg-red-100 text-red-800",
    outline: "bg-transparent text-gray-700 border border-gray-300"
  };

  const badgeClass = `${baseClasses} ${variantClasses[variant]} ${className || ""}`.trim();

  return (
    <span
      className={badgeClass}
      {...props}
    >
      {children}
    </span>
  );
}

export { Badge };