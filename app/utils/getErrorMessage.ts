import type { AxiosError } from "axios";

export function getErrorMessage(error: unknown): string {
  // Custom error message
  if (typeof error === "string") return error;

  // Firebase error
  if (typeof error === "object" && error !== null && "code" in error) {
    const code = (error as { code: string }).code;

    switch (code) {
      case "auth/email-already-in-use":
        return "Email already registered";
      case "auth/invalid-email":
        return "Invalid email address";
      case "auth/weak-password":
        return "Password is too weak";
      default:
        return code;
    }
  }

  // Axios error
  const axiosError = error as AxiosError<{ message?: string }>;
  return (
    axiosError?.response?.data?.message ||
    axiosError?.message ||
    "Something went wrong"
  );
}