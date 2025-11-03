import { Avatar, DatePicker, Divider, Tag } from "antd";
import AppInput from "../../shared/components/input/app-input";
import {
  RiDoorLockLine,
  RiLockLine,
  RiShieldKeyholeLine,
  RiAddLine,
  RiEditLine,
  RiCloseLine,
  RiDeleteBin5Line,
} from "react-icons/ri";
import ChangePasswordModal from "./component/change-password-modal";
import { useProfilePage } from "./use-profile-page";
import { getCookie } from "../../utils/cookies";
import AppPrimaryButton from "../../shared/components/button/app-primary-button";
import AppSecondaryButton from "../../shared/components/button/app-secondary-button";
import clsx from "clsx";
import WeeklyActivityChart from "./component/profile-line-chart";

const { RangePicker } = DatePicker;

const Profile = () => {
  const {
    profileControl,
    handleProfileSubmit,
    isProfileSubmitting,
    isEditing,
    enableEditing,
    cancelEditing,
    isChangePasswordModalOpen,
    passwordControl,
    handlePasswordSubmit,
    isPasswordSubmitting,
    openChangePasswordModal,
    closeChangePasswordModal,
    profilePhoto,
    handlePhotoUpload,
  } = useProfilePage();

  const userName = getCookie("auth_name") || "";
  const userRole = getCookie("auth_role") || "user";
  const roleDisplay = userRole === "admin" ? "Admin" : "User";

  return (
    <div className='py-4 px-2 sm:py-6 sm:px-4 md:py-8 md:px-4'>
      <p className='font-bold text-xl sm:text-2xl'>Profile</p>
      <Divider />
      <div className='w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0'>
        <div className='flex items-center gap-3 sm:gap-6'>
          <div className='relative'>
            <Avatar
              size={120}
              className='w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28'
              src={profilePhoto || undefined}
              icon={
                !profilePhoto ? (
                  <span className='text-2xl sm:text-3xl md:text-4xl text-gray-400'>
                    {userName.charAt(0).toUpperCase()}
                  </span>
                ) : undefined
              }
            />
            <label
              htmlFor='profile-photo-upload'
              className='absolute bottom-0 right-0 w-8 h-8 sm:w-10 sm:h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-70 transition-all duration-200'
            >
              <RiAddLine
                size={16}
                className='text-white sm:w-5 sm:h-5'
              />
              <input
                id='profile-photo-upload'
                type='file'
                accept='image/*'
                onChange={handlePhotoUpload}
                className='hidden'
              />
            </label>
          </div>
          <div className='mt-2'>
            <Tag
              className={clsx(
                "rounded-3xl! px-3! py-1.5! sm:px-4! sm:py-2!",
                userRole === "admin"
                  ? "bg-primary-500! text-white!"
                  : "bg-gray-200! text-gray-700!"
              )}
            >
              <p className='text-xs sm:text-sm font-medium'>{roleDisplay}</p>
            </Tag>
            <p className='text-xl sm:text-2xl font-semibold'>{userName}</p>
          </div>
        </div>
        <div className='mt-0 sm:mt-6 flex justify-start sm:justify-end gap-2 sm:gap-3'>
          {!isEditing ? (
            <div className='flex flex-col gap-2'>
              <AppPrimaryButton
                htmlType='button'
                onClick={enableEditing}
                icon={<RiEditLine size={18} />}
                className='w-full sm:w-auto!'
              >
                Edit Profile
              </AppPrimaryButton>
            </div>
          ) : (
            <div className='flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto'>
              <AppSecondaryButton
                htmlType='button'
                onClick={cancelEditing}
                icon={<RiCloseLine size={18} />}
                className='w-full sm:w-auto!'
              >
                Cancel
              </AppSecondaryButton>
              <AppPrimaryButton
                htmlType='submit'
                loading={isProfileSubmitting}
                className='w-full sm:w-auto!'
              >
                Save Changes
              </AppPrimaryButton>
            </div>
          )}
        </div>
      </div>
      <form onSubmit={handleProfileSubmit}>
        <div className='mt-6 sm:mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
          <AppInput
            name='name'
            label='Name'
            type='text'
            control={profileControl}
            placeholder='Enter your name'
            required
            disabled={!isEditing}
          />
          <AppInput
            name='email'
            label='Email'
            type='email'
            prefix={<RiLockLine size={20} />}
            control={profileControl}
            placeholder='Enter your email'
            required
            disabled
          />
          <div
            className='min-h-full rounded-2xl px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 space-y-3 sm:space-y-4 border border-gray-200 hover:shadow-2xl hover:cursor-pointer transition-all duration-300'
            onClick={openChangePasswordModal}
          >
            <div className='bg-gray-50 p-2 rounded-full max-w-12'>
              <RiDoorLockLine className='w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8' />
            </div>
            <p className='text-base sm:text-lg font-medium'>Change Password</p>
          </div>
          <div className='min-h-full bg-gray-100 rounded-2xl px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 space-y-3 sm:space-y-4 border border-gray-200 hover:cursor-not-allowed transition-all duration-300'>
            <div className='bg-gray-50 p-2 rounded-full max-w-12'>
              <RiShieldKeyholeLine className='w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8' />
            </div>
            <div className='flex items-center gap-2'>
              <p className='text-base sm:text-lg font-medium'>
                {userRole === "user" ? "Request Access" : "Allow Access"}
              </p>
              <Tag className='rounded-2xl!'>Beta</Tag>
            </div>
          </div>
          <div className='min-h-full bg-gray-100 col-span-1 sm:col-span-2 rounded-2xl px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 space-y-3 sm:space-y-4 border border-gray-200 hover:cursor-not-allowed transition-all duration-300'>
            <div className='flex items-center gap-3 sm:gap-4'>
              <div className='bg-gray-50 p-2 rounded-full max-w-12'>
                <RiDeleteBin5Line
                  size={20}
                  className='sm:w-6 sm:h-6'
                  color='red'
                />
              </div>
              <p className='text-base sm:text-lg font-medium'>
                Delete Your Account
              </p>
            </div>

            <p className='text-xs sm:text-sm font-medium'>
              Contact our support team to process the deletion of your account.
            </p>
          </div>
        </div>
      </form>
      <div className='min-h-full rounded-2xl px-3 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 space-y-3 sm:space-y-4 border border-gray-200 mt-3 sm:mt-4'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0'>
          <p className='text-base sm:text-lg font-semibold'>
            Your Weekly Active Hour
          </p>
          <RangePicker
            picker='week'
            className='w-full sm:w-auto'
          />
        </div>
        <WeeklyActivityChart />
      </div>
      {/* Change Password Modal */}
      <ChangePasswordModal
        open={isChangePasswordModalOpen}
        control={passwordControl}
        onCancel={closeChangePasswordModal}
        onSubmit={handlePasswordSubmit}
        isSubmitting={isPasswordSubmitting}
      />
    </div>
  );
};

export default Profile;
