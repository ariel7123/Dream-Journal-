/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType, ApiResponse } from '../types';
import { authAPI } from '../services/api';

// Create the context
export const AuthContext = createContext<AuthContextType | null>(null);

// Props for the provider
interface AuthProviderProps {
  children: ReactNode;
}

// Auth Provider component
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const response = await authAPI.getMe() as ApiResponse<User>;
          if (response.success && response.data) {
            setUser(response.data);
          }
        } catch {
          // Token is invalid, remove it
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [token]);

  // Login function
  const login = async (email: string, password: string) => {
    const response = await authAPI.login(email, password) as ApiResponse<{
      token: string;
      user: User;
    }>;

    if (response.success && response.data) {
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      setUser(response.data.user);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    const response = await authAPI.register(name, email, password) as ApiResponse<{
      token: string;
      user: User;
    }>;

    if (response.success && response.data) {
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      setUser(response.data.user);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
