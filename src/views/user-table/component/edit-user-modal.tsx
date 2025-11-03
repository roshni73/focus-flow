import { Modal, Select, DatePicker } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import dayjs, { type Dayjs } from "dayjs";
import AppInput from "../../../shared/components/input/app-input";
import AppPrimaryButton from "../../../shared/components/button/app-primary-button";
import AppSecondaryButton from "../../../shared/components/button/app-secondary-button";
import { USER_ROLE, USER_STATUS } from "../constant/constant";
import type { User } from "./columns";

interface EditUserModalProps {
  open: boolean;
  user: User | null;
  onCancel: () => void;
  onOk: (data: Omit<User, "key">) => void;
}

interface EditUserFormData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joinedDate: Dayjs;
}

const EditUserModal = ({ open, user, onCancel, onOk }: EditUserModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditUserFormData>();

  useEffect(() => {
    if (user && open) {
      reset({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        joinedDate: dayjs(user.joinedDate),
      });
    }
  }, [user, open, reset]);

  const onSubmit = (data: EditUserFormData) => {
    if (!user) return;

    const userData: Omit<User, "key"> = {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
      status: data.status,
      joinedDate: data.joinedDate.format("YYYY-MM-DD"),
    };
    onOk(userData);
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  if (!user) return null;

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      footer={null}
      title='Edit User'
      width={600}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='mt-6'
      >
        <div className='space-y-4'>
          <AppInput
            label='ID'
            name='id'
            control={control}
            placeholder='Enter ID'
            required
          />
          {errors.id && (
            <p className='text-red-500 text-sm mt-1'>{errors.id.message}</p>
          )}

          <AppInput
            label='Name'
            name='name'
            control={control}
            placeholder='Enter Name'
            required
          />
          {errors.name && (
            <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>
          )}

          <AppInput
            label='Email'
            name='email'
            type='email'
            control={control}
            placeholder='Enter Email'
            required
          />
          {errors.email && (
            <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
          )}

          <div>
            <label className='block text-sm font-medium mb-2'>
              Role <span className='text-red-500'>*</span>
            </label>
            <Controller
              name='role'
              control={control}
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  size='large'
                  className='w-full'
                  placeholder='Select Role'
                  options={[
                    { label: USER_ROLE.ADMIN, value: USER_ROLE.ADMIN },
                    { label: USER_ROLE.USER, value: USER_ROLE.USER },
                    { label: USER_ROLE.MANAGER, value: USER_ROLE.MANAGER },
                  ]}
                />
              )}
            />
            {errors.role && (
              <p className='text-red-500 text-sm mt-1'>{errors.role.message}</p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium mb-2'>
              Status <span className='text-red-500'>*</span>
            </label>
            <Controller
              name='status'
              control={control}
              rules={{ required: "Status is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  size='large'
                  className='w-full'
                  placeholder='Select Status'
                  options={[
                    { label: USER_STATUS.ACTIVE, value: USER_STATUS.ACTIVE },
                    {
                      label: USER_STATUS.INACTIVE,
                      value: USER_STATUS.INACTIVE,
                    },
                  ]}
                />
              )}
            />
            {errors.status && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.status.message}
              </p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium mb-2'>
              Joined Date <span className='text-red-500'>*</span>
            </label>
            <Controller
              name='joinedDate'
              control={control}
              rules={{ required: "Joined Date is required" }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  size='large'
                  className='w-full'
                  format='YYYY-MM-DD'
                  value={field.value}
                  onChange={(date) => field.onChange(date || dayjs())}
                />
              )}
            />
            {errors.joinedDate && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.joinedDate.message}
              </p>
            )}
          </div>
        </div>

        <div className='flex justify-end gap-3 mt-6'>
          <AppSecondaryButton onClick={handleCancel}>Cancel</AppSecondaryButton>
          <AppPrimaryButton htmlType='submit'>Update User</AppPrimaryButton>
        </div>
      </form>
    </Modal>
  );
};

export default EditUserModal;
