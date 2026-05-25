'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { login } from "../services/auth";

interface User {
  email: string;
}

interface AuthContextData {
  user: User | null;

  signIn: (email: string, password: string) => Promise<void>;

  signOut: () => void;

  isAuthenticated:boolean;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const storedUser = localStorage.getItem("user");

    return storedUser ? JSON.parse(storedUser) : null;
  });

  async function signIn(email: string, password: string) {
    await login({ email, password });

    const userData = { email };

    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  }

  function signOut() {
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{user, signIn,signOut, isAuthenticated: !!user}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}