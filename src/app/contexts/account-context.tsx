'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./auth-context";
import { Conta, getContasByUsuario, createConta, CreateContaDTO } from "../services/conta";

interface AccountContextData {
  contas: Conta[];
  contaAtiva: Conta | null;
  setContaAtiva: (conta: Conta) => void;
  loadingContas: boolean;
  addConta: (data: CreateContaDTO) => Promise<Conta>;
  refreshContas: () => Promise<void>;
}

const AccountContext = createContext({} as AccountContextData);

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [contas, setContas] = useState<Conta[]>([]);
  const [contaAtiva, setContaAtivaState] = useState<Conta | null>(null);
  const [loadingContas, setLoadingContas] = useState(false);

  const fetchContas = async () => {
    if (!user) return;
    setLoadingContas(true);
    try {
      const data = await getContasByUsuario(user.id);
      const ativas = data.filter((c) => c.status);
      setContas(ativas);

      // Restore previously selected account from localStorage
      const savedContaId = localStorage.getItem(`contaAtiva_${user.id}`);
      const saved = ativas.find((c) => c.id === savedContaId);
      setContaAtivaState(saved ?? ativas[0] ?? null);
    } catch (err) {
      console.error("Erro ao buscar contas:", err);
    } finally {
      setLoadingContas(false);
    }
  };

  useEffect(() => {
    if (!user) {
      setContas([]);
      setContaAtivaState(null);
      return;
    }
    fetchContas();
  }, [user]);

  const setContaAtiva = (conta: Conta) => {
    setContaAtivaState(conta);
    if (user) {
      localStorage.setItem(`contaAtiva_${user.id}`, conta.id);
    }
  };

  const addConta = async (data: CreateContaDTO) => {
    const nova = await createConta(data);
    setContas((prev) => [...prev, nova]);
    if (!contaAtiva) {
      setContaAtiva(nova);
    }
    return nova;
  };

  const refreshContas = async () => {
    await fetchContas();
  };

  return (
    <AccountContext.Provider
      value={{ contas, contaAtiva, setContaAtiva, loadingContas, addConta, refreshContas }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  return useContext(AccountContext);
}
