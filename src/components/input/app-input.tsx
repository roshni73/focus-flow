import { Input } from "antd";
import { Controller } from "react-hook-form";
import type { RefObject } from "react";
import type { InputProps, InputRef } from "antd";
import type { Control, FieldValues, Path } from "react-hook-form";
import { FormLabel } from "../typography/form-label";
import { ErrorMessage } from "../typography/error-message";

type Iprops<T extends FieldValues> = InputProps & {
  required?: boolean;
  label?: string;
  name?: Path<T>;
  placeholder?: string;
  control?: Control<T>;
  suffixLabel?: string;
  inputRef?: RefObject<InputRef>;
  value?: string;
};

function AppInput<T extends FieldValues>(props: Iprops<T>) {
  const {
    required,
    label,
    name,
    placeholder,
    suffixLabel,
    inputRef,
    control,
    value,
    onChange,
    ...restProps
  } = props;

  return (
    <div className='flex flex-col gap-[6px] w-full'>
      <FormLabel
        label={label}
        required={required}
        suffixLabel={suffixLabel}
      />

      {control && name ? (
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div className='w-full flex flex-col gap-[6px]'>
              <Input
                size='large'
                status={error && "error"}
                title={label}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                {...restProps}
                ref={inputRef}
              />
              <ErrorMessage message={error?.message} />
            </div>
          )}
        />
      ) : (
        <div className='w-full flex flex-col gap-[6px]'>
          <Input
            size='large'
            title={label}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            {...restProps}
          />
        </div>
      )}
    </div>
  );
}

export default AppInput;
