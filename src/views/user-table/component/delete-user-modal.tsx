import { Modal } from "antd";
import AppPrimaryButton from "../../../shared/components/button/app-primary-button";
import AppSecondaryButton from "../../../shared/components/button/app-secondary-button";
import type { User } from "./columns";

interface DeleteUserModalProps {
  open: boolean;
  user: User | null;
  onCancel: () => void;
  onOk: () => void;
}

const DeleteUserModal = ({
  open,
  user,
  onCancel,
  onOk,
}: DeleteUserModalProps) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      title='Delete User'
      width={500}
    >
      <div className='mt-6'>
        {user && (
          <div className='mb-4'>
            <p className='text-gray-600 mb-2'>
              Are you sure you want to delete the following user?
            </p>
            <div className='bg-gray-50 p-4 rounded-lg'>
              <p>
                <span className='font-semibold'>Name:</span> {user.name}
              </p>
              <p>
                <span className='font-semibold'>Email:</span> {user.email}
              </p>
              <p>
                <span className='font-semibold'>Role:</span> {user.role}
              </p>
            </div>
          </div>
        )}
        <p className='text-red-600 font-medium mb-6'>
          This action cannot be undone.
        </p>
        <div className='flex justify-end gap-3'>
          <AppSecondaryButton onClick={onCancel}>Cancel</AppSecondaryButton>
          <AppPrimaryButton
            onClick={onOk}
            danger
          >
            Delete
          </AppPrimaryButton>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;
