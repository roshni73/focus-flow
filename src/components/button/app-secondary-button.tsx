import { Button, type ButtonProps } from "antd";
import type { ReactNode } from "react";
import clsx from "clsx";

interface Secondarybuttonprops extends ButtonProps {
  children: ReactNode;
  className?: string;
}
const AppSecondaryButton = ({
  children,
  className,
  ...rest
}: Secondarybuttonprops) => {
  return (
    <Button
      size='large'
      className={clsx(
        "font-semibold! text-sm! rounded-sm! bg-[#4E42D92E]! text-primary! px-[30px]! py-4!",
        className
      )}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default AppSecondaryButton;
