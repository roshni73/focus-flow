import type { ReactNode } from "react";
import clsx from "clsx";
import Text from "./text";

type FormLabelProps = {
  label: ReactNode | string | undefined;
  suffixLabel?: string;
  required?: boolean;
  className?: string;
};

export const FormLabel = ({
  label,
  suffixLabel,
  required = false,
  className,
}: FormLabelProps) => {
  const isLabelReactNode = typeof label === "object";

  return (
    <>
      {isLabelReactNode ? (
        label
      ) : (
        <Text
          size='sm'
          weight='medium'
          className={clsx("text-gray-700", className)}
        >
          {label}{" "}
          <span className='text-gray-400 text-xs font-normal'>
            {suffixLabel && suffixLabel}
          </span>{" "}
          {required && "*"}
        </Text>
      )}
    </>
  );
};
