'use client';

import { useState, useCallback, createContext, useContext, ReactNode } from 'react';
import { useSession as useBetterAuthSession, signOut } from './auth-client';

interface Toast {
  id: string;
  message: string;
  type: 'error' | 'success' | 'info';
}

interface AuthContextType {
  user: any | null;
  session: any | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  logout: () => Promise<void>;
  toasts: Toast[];
  addToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isPending } = useBetterAuthSession();
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: Toast['type'] = 'error') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, []);

  const user = data?.user ?? null;
  const session = data?.session ?? null;

  const value: AuthContextType = {
    user,
    session,
    isLoading: isPending,
    isAuthenticated: !!user && !!session,
    isAdmin: (user as any)?.role === 'admin',
    logout,
    toasts,
    addToast,
    removeToast,
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

export function useSession() {
  return useBetterAuthSession();
}
