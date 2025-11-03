import { Button, type ButtonProps } from "antd";
import type { ReactNode } from "react";
import clsx from "clsx";

interface Primarybuttonprops extends ButtonProps {
  children: ReactNode;
  className?: string;
}

function AppPrimaryButton({
  children,
  className,
  ...rest
}: Primarybuttonprops) {
  return (
    <Button
      size='large'
      className={clsx(
        "font-semibold! text-sm! rounded-sm! bg-primary! text-white! px-[30px]! py-4!",
        className
      )}
      {...rest}
    >
      {children}
    </Button>
  );
}

export default AppPrimaryButton;
