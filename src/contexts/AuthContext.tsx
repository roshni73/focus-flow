import { createContext, useState, useEffect, useContext, type ReactNode } from 'react';

export type UserRole = 'admin' | 'viewer';

export interface User {
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users
const MOCK_USERS = {
  'admin@example.com': {
    email: 'admin@example.com',
    password: 'password123',
    name: 'Admin User',
    role: 'admin' as UserRole,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
  },
  'viewer@example.com': {
    email: 'viewer@example.com',
    password: 'password123',
    name: 'Viewer User',
    role: 'viewer' as UserRole,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Viewer',
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockUser = MOCK_USERS[email as keyof typeof MOCK_USERS];

    if (mockUser && mockUser.password === password) {
      const userWithoutPassword = { ...mockUser, password: undefined };
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return true;
    }

    return false;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const googleUser: User = {
      email: 'user@gmail.com',
      name: 'Google User',
      role: 'admin',
      avatar: 'https://lh3.googleusercontent.com/a/default-user',
    };

    setUser(googleUser);
    localStorage.setItem('user', JSON.stringify(googleUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginWithGoogle,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
