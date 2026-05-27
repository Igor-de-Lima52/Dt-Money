'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./auth-context";
import { useAccount } from "./account-context";
import { Transaction } from "../types";
import { Categoria, getCategorias, createCategoria } from "../services/categoria";
import {
  TransacaoAPI,
  CreateTransacaoDTO,
  tipoToTransactionType,
  getTransacoesByConta,
  createTransacao,
  updateTransacao,
  deleteTransacao,
} from "../services/transacao";

// Map backend TransacaoAPI to frontend Transaction
function toTransaction(t: TransacaoAPI): Transaction {
  return {
    id: t.id,
    description: t.nome,
    amount: t.valor,
    category: t.categoria.nome,
    categoryId: t.categoria.id,
    type: tipoToTransactionType(t.categoria.tipo),
    date: new Date(t.dataCriacao).toLocaleDateString("pt-BR"),
  };
}

interface FinanceContextData {
  transactions: Transaction[];
  categories: Categoria[];
  loading: boolean;
  loadingCategories: boolean;
  addTransaction: (data: CreateTransacaoDTO) => Promise<void>;
  updateTransaction: (id: string, data: CreateTransacaoDTO) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  addCategory: (nome: string, tipo: string) => Promise<Categoria>;
  refreshTransactions: () => Promise<void>;
}

const FinanceContext = createContext({} as FinanceContextData);

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { contaAtiva } = useAccount();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);

  // Load categories once when user is authenticated
  useEffect(() => {
    if (!user) {
      setCategories([]);
      return;
    }
    const fetchCategorias = async () => {
      setLoadingCategories(true);
      try {
        const data = await getCategorias();
        setCategories(data);
      } catch (err) {
        console.error("Erro ao carregar categorias:", err);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategorias();
  }, [user]);

  // Load transactions whenever the active account changes
  const fetchTransactions = async () => {
    if (!contaAtiva) {
      setTransactions([]);
      return;
    }
    setLoading(true);
    try {
      const data = await getTransacoesByConta(contaAtiva.id);
      setTransactions(data.map(toTransaction));
    } catch (err) {
      console.error("Erro ao carregar transações:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [contaAtiva]);

  // CRUD
  const addTransaction = async (data: CreateTransacaoDTO) => {
    const created = await createTransacao(data);
    setTransactions((prev) => [toTransaction(created), ...prev]);
  };

  const updateTransactionFn = async (id: string, data: CreateTransacaoDTO) => {
    const updated = await updateTransacao(id, data);
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? toTransaction(updated) : t))
    );
  };

  const deleteTransactionFn = async (id: string) => {
    await deleteTransacao(id);
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const addCategory = async (nome: string, tipo: string): Promise<Categoria> => {
    const nova = await createCategoria(nome, tipo);
    setCategories((prev) => [...prev, nova]);
    return nova;
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        categories,
        loading,
        loadingCategories,
        addTransaction,
        updateTransaction: updateTransactionFn,
        deleteTransaction: deleteTransactionFn,
        addCategory,
        refreshTransactions: fetchTransactions,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  return useContext(FinanceContext);
}
