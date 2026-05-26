'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { login } from "../services/auth";
import { User } from "../services/user";

interface AuthContextData {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  updateUser: (userData: User) => void;
  isAuthenticated: boolean;
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
    const user = await login({ email, password });

    if(!user) throw new Error();

    const userData = {
      id: user?.id, 
      email, 
      nome: user?.nome, 
      cpf: user?.cpf, 
      sexo: user?.sexo, 
      dataNascimento: user?.dataNascimento 
    };

    updateUser(userData);
  }

  function signOut() {
    localStorage.removeItem("user");
    setUser(null);
  }

  function updateUser(userData: User) {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  }

  return (
    <AuthContext.Provider value={{user, signIn, signOut, updateUser, isAuthenticated: !!user}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}