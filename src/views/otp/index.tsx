import AppPrimaryButton from "../../../shared/components/button/app-primary-button";
import { Input, Tooltip } from "antd";
import { Controller } from "react-hook-form";
import { UseOtpAuth } from "./use-otp-auth";
import AppSecondaryButton from "../../../shared/components/button/app-secondary-button";
import { useNavigate } from "react-router-dom";

const OtpAuth = () => {
  const {
    hashedEmail,
    control,
    handleSubmit,
    loading,
    countdownFormatted,
    canResend,
    onResend,
  } = UseOtpAuth();

  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit}>
      <div className='space-y-2'>
        <p className='text-3xl font-bold'>Verify OTP</p>
        <p className='text-sm font-medium text-text'>
          Please verify your OTP that is sent to {hashedEmail}
        </p>
      </div>
      <Tooltip
        placement='right'
        title='OTP: 123456'
      >
        <div className='mt-18'>
          <Controller
            name='otp'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <div className='w-full flex flex-col items-center gap-8'>
                <Input.OTP
                  size='large'
                  length={6}
                  formatter={(str) => str.replace(/[^0-9]/g, "")}
                  onChange={field.onChange}
                  value={field.value}
                />
                {error && (
                  <p className='text-error-500 text-xs'>{error.message}</p>
                )}
              </div>
            )}
          />
        </div>
      </Tooltip>
      <div className='flex flex-col justify-center gap-4'>
        <AppPrimaryButton
          className='w-full mt-12'
          htmlType='submit'
          loading={loading}
        >
          Verify
        </AppPrimaryButton>
        <AppSecondaryButton
          onClick={() => navigate(-1)}
          className='flex! md:hidden! lg:hidden! '
        >
          Back
        </AppSecondaryButton>
      </div>

      <div className='mt-6 flex items-center justify-center gap-2'>
        <p className='text-sm text-text'>Didn't receive the OTP?</p>
        {canResend ? (
          <button
            type='button'
            onClick={onResend}
            className='text-sm font-medium text-primary-500 hover:text-primary-600 underline'
            disabled={loading}
          >
            Resend OTP
          </button>
        ) : (
          <p className='text-sm font-medium text-text'>
            Resend in{" "}
            <span className='font-bold text-primary-500'>
              {countdownFormatted}
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default OtpAuth;
