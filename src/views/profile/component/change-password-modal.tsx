import { Modal } from "antd";
import type { Control } from "react-hook-form";
import AppInputPassword from "../../../shared/components/input/app-input-password";
import AppPrimaryButton from "../../../shared/components/button/app-primary-button";
import AppSecondaryButton from "../../../shared/components/button/app-secondary-button";
import type { ChangePasswordFormData } from "../profile.schema";

interface ChangePasswordModalProps {
  open: boolean;
  control: Control<ChangePasswordFormData>;
  onCancel: () => void;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void> | void;
  isSubmitting?: boolean;
}

const ChangePasswordModal = ({
  open,
  control,
  onCancel,
  onSubmit,
  isSubmitting = false,
}: ChangePasswordModalProps) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      title='Change Password'
      width={500}
      centered
    >
      <form
        onSubmit={onSubmit}
        className='mt-6'
      >
        <div className='space-y-4'>
          <AppInputPassword
            label='Current Password'
            name='currentPassword'
            control={control}
            placeholder='Enter current password'
            required
          />

          <AppInputPassword
            label='New Password'
            name='newPassword'
            control={control}
            placeholder='Enter new password'
            required
          />

          <AppInputPassword
            label='Confirm New Password'
            name='confirmPassword'
            control={control}
            placeholder='Confirm new password'
            required
          />
        </div>

        <div className='flex justify-end gap-3 mt-6'>
          <AppSecondaryButton
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </AppSecondaryButton>
          <AppPrimaryButton
            htmlType='submit'
            loading={isSubmitting}
          >
            Change Password
          </AppPrimaryButton>
        </div>
      </form>
    </Modal>
  );
};

export default ChangePasswordModal;
