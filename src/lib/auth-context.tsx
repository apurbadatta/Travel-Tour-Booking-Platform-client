'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import api from './api';
import { User, Session } from '@/types';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check session on mount
  useEffect(() => {
    refreshSession();
  }, []);

  const refreshSession = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/api/auth/get-session');
      if (response.data?.session && response.data?.user) {
        setSession(response.data.session);
        setUser(response.data.user);
      } else {
        setSession(null);
        setUser(null);
      }
    } catch (error) {
      console.error('Failed to get session:', error);
      setSession(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await api.post('/api/auth/sign-in/email', {
      email,
      password,
    });
    if (response.data?.user && response.data?.session) {
      setUser(response.data.user);
      setSession(response.data.session);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await api.post('/api/auth/sign-up/email', {
      name,
      email,
      password,
    });
    if (response.data?.user && response.data?.session) {
      setUser(response.data.user);
      setSession(response.data.session);
    }
  };

  const loginWithGoogle = async () => {
    // Redirect to better-auth Google OAuth endpoint
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/sign-in/social?provider=google`;
  };

  const logout = async () => {
    try {
      await api.post('/api/auth/sign-out');
    } finally {
      setUser(null);
      setSession(null);
    }
  };

  const value = {
    user,
    session,
    isLoading,
    isAuthenticated: !!user && !!session,
    isAdmin: user?.role === 'admin',
    login,
    register,
    loginWithGoogle,
    logout,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}