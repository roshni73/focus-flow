import { Input } from "antd";
import type { InputProps } from "antd";

import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { FormLabel } from "../typography/form-label";
import { ErrorMessage } from "../typography/error-message";

type Iprops<T extends FieldValues> = InputProps & {
  required?: boolean;
  label?: string;
  name: Path<T>;
  placeholder?: string;
  control: Control<T>;
};

function AppInputPassword<T extends FieldValues>(props: Iprops<T>) {
  const {
    required = false,
    label,
    name,
    placeholder = "*******",
    control,
    ...restProps
  } = props;

  return (
    <div className='flex flex-col gap-[6px]'>
      <FormLabel
        label={label}
        required={required}
      />
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div className='w-full flex flex-col gap-[6px]'>
            <Input.Password
              size='large'
              status={error && "error"}
              title={label}
              value={value}
              onChange={(e) => onChange(e.target.value.replace(/\s/g, ""))}
              placeholder={placeholder}
              {...restProps}
            />
            <ErrorMessage message={error?.message} />
          </div>
        )}
      />
    </div>
  );
}

export default AppInputPassword;
