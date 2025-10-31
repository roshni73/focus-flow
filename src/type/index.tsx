export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'viewer';
    phone?: string;
    address?: string;
  }

  export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<User>;
    logout: () => void;
    loading: boolean;
  }

  export interface StatsCard {
    title: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
    icon: string;
  }

  export interface ChartData {
    name: string;
    revenue: number;
    users: number;
  }

  export interface ApiUser {
    id: number;
    name: string;
    email: string;
    phone: string;
    company: {
      name: string;
    };
    website: string;
    address: {
      street: string;
      city: string;
    };
  }