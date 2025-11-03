export type LoginCredentials = {
  email: string;
  password: string;
};

export type UserRole = "user" | "admin";

export type LoginResponse = {
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
  };
};

export type AuthCookie = {
  id: string;
  name: string;
  email: string;
  password: string;
};
