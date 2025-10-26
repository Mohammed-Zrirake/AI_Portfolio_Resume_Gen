import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from '../types';
import * as apiService from '../services/apiService';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const sessionUser = await apiService.checkSession();
        setUser(sessionUser);
      } catch (error) {
        console.error("Failed to check session", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkUserSession();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const loggedInUser = await apiService.login(email, password);
    setUser(loggedInUser);
  }, []);
  
  const signup = useCallback(async (email: string, password: string) => {
    const signedUpUser = await apiService.signup(email, password);
    setUser(signedUpUser);
  }, []);

  const logout = useCallback(() => {
    apiService.logout();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};