'use client'

import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      setLoading(false)
    } else {
      setLoading(false)
      router.push('/login');
    }
  }, [router]);

  const login = async (email: string, password: string) => { 
    const data = { email, password };

    try {
      const response = await fetch('/api/users', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json(); 
      console.log(result); 
      if (!response.ok) {
        toast.error(result?.[0].message);
        return
      }


      localStorage.setItem('authToken', result.token); 
      setIsAuthenticated(true);
      toast.success(result.message)
      router.push('/'); 
    } catch (error) {
      toast.error('Invalid credentials'); 
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    router.push('/login'); // Redirect on logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
