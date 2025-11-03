export function hashEmail(email: string): string {
  if (!email || !email.includes("@")) {
    return email;
  }

  const [localPart, domain] = email.split("@");

  if (localPart.length <= 2) {
    return email;
  }

  const firstTwoLetters = localPart.substring(0, 2);
  const remainingLetters = localPart.substring(2);
  const hashedLetters = "*".repeat(remainingLetters.length);

  return `${firstTwoLetters}${hashedLetters}@${domain}`;
}

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-100 text-green-700 border-green-200";
    case "in progress":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "pending review":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "ongoing":
      return "bg-purple-100 text-purple-700 border-purple-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};
