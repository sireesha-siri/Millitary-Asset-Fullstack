// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  user_id: string;
  username: string;
  email: string;
  full_name: string;
  roles: string[];
  baseAccess?: string[];
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (page: string) => boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const rolePermissions = {
  'Admin': ['dashboard', 'purchases', 'transfers', 'assignments', 'expenditures'],
  'Base Commander': ['dashboard', 'purchases', 'transfers', 'assignments', 'expenditures'],
  'Logistics Officer': ['purchases', 'transfers'],
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('militaryUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false); // Finish loading regardless
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch("https://millitary-asset-backend-3.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) return false;

      const data = await response.json();
      const userData: User = {
        user_id: data.user.user_id,
        username: data.user.username,
        email: data.user.email,
        full_name: data.user.full_name,
        roles: data.user.roles,
      };

      setUser(userData);
      localStorage.setItem("militaryUser", JSON.stringify(userData));
      localStorage.setItem("token", data.token);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('militaryUser');
    localStorage.removeItem('token');
  };

  const hasPermission = (page: string): boolean => {
    if (!user) return false;
    return user.roles.some(role => rolePermissions[role]?.includes(page));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, hasPermission, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
