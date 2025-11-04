import { createContext, useState, useEffect, useContext, type ReactNode } from 'react';

export type UserRole = 'admin' | 'viewer';

export interface User {
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  loginMethod?: 'email' | 'google';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  setUserRole: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
  needsRoleSelection: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USERS = {
  'admin@example.com': {
    email: 'admin@example.com',
    password: 'password123',
    name: 'Admin User',
    role: 'admin' as UserRole,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    loginMethod: 'email' as const,
  },
  'viewer@example.com': {
    email: 'viewer@example.com',
    password: 'password123',
    name: 'Viewer User',
    role: 'viewer' as UserRole,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Viewer',
    loginMethod: 'email' as const,
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [needsRoleSelection, setNeedsRoleSelection] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      if (userData.loginMethod === 'google' && !userData.role) {
        setNeedsRoleSelection(true);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockUser = MOCK_USERS[email as keyof typeof MOCK_USERS];

    if (mockUser && mockUser.password === password) {
      const { password: _, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
      setNeedsRoleSelection(false);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return true;
    }

    return false;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const googleUser: User = {
      email: 'googleuser@example.com',
      name: 'Google User',
      role: 'viewer',
      avatar: 'https://lh3.googleusercontent.com/a/default-user',
      loginMethod: 'google',
    };

    setUser(googleUser);
    setNeedsRoleSelection(true);
    localStorage.setItem('user', JSON.stringify(googleUser));
    return true;
  };

  const setUserRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      setNeedsRoleSelection(false);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const logout = () => {
    setUser(null);
    setNeedsRoleSelection(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginWithGoogle,
        setUserRole,
        logout,
        isAuthenticated: !!user && !needsRoleSelection,
        needsRoleSelection,
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