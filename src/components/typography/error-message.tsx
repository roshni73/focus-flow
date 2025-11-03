import Text from "./text";

export const ErrorMessage = ({ message }: { message: string | undefined }) => {
  if (!message) return null;
  return (
    <Text
      size='xs'
      className='text-red-500 '
    >
      {message}
    </Text>
  );
};
