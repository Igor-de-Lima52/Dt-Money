"use client";

import { useState, useEffect } from "react";
import { Transaction } from "../types";
import { LuX, LuPlus, LuCheck, LuLoader, LuChevronDown } from "react-icons/lu";
import { FiArrowDownCircle, FiArrowUpCircle } from "react-icons/fi";
import { useFinance } from "../contexts/finance-context";
import { useAccount } from "../contexts/account-context";
import { useAuth } from "../contexts/auth-context";
import { Categoria } from "../services/categoria";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: Transaction;
}

export default function TransactionModal({ isOpen, onClose, transaction }: TransactionModalProps) {
  const { user } = useAuth();
  const { contaAtiva } = useAccount();
  const { categories, addTransaction, updateTransaction, addCategory, loadingCategories } = useFinance();

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [type, setType] = useState<"income" | "expense">("income");

  // New category creation
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [savingCategory, setSavingCategory] = useState(false);
  const [categoryError, setCategoryError] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Categories filtered by the current type
  const filteredCategories = categories.filter(
    (c) => c.tipo === (type === "income" ? "Receita" : "Despesa")
  );

  useEffect(() => {
    if (!isOpen) return;
    if (transaction) {
      setDescription(transaction.description);
      setAmount(transaction.amount.toString());
      setCategoryId(transaction.categoryId);
      setType(transaction.type);
    } else {
      setDescription("");
      setAmount("");
      setType("income");
      setCategoryId("");
    }
    setIsCreatingCategory(false);
    setNewCategoryName("");
    setCategoryError("");
    setError("");
  }, [transaction, isOpen]);

  // When type changes (and no category selected yet), auto-select first available
  useEffect(() => {
    if (!transaction) {
      const first = filteredCategories[0];
      setCategoryId(first?.id ?? "");
    }
  }, [type, categories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !contaAtiva || !categoryId) return;
    setError("");
    setSaving(true);
    try {
      const payload = {
        nome: description,
        valor: parseFloat(amount),
        categoriaId: categoryId,
        usuarioId: user.id,
        contaId: contaAtiva.id,
      };
      if (transaction) {
        await updateTransaction(transaction.id, payload);
      } else {
        await addTransaction(payload);
      }
      onClose();
    } catch {
      setError("Erro ao salvar transação. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmNewCategory = async () => {
    const name = newCategoryName.trim();
    if (!name) return;
    const tipo = type === "income" ? "Receita" : "Despesa";
    setSavingCategory(true);
    setCategoryError("");
    try {
      const nova: Categoria = await addCategory(name, tipo);
      setCategoryId(nova.id);
      setNewCategoryName("");
      setIsCreatingCategory(false);
    } catch {
      setCategoryError("Erro ao salvar categoria. Tente novamente.");
    } finally {
      setSavingCategory(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.75)] flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#202024] rounded-[6px] shadow-[0px_4px_32px_0px_rgba(0,0,0,0.8)] w-full max-w-[535px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-10">
          <div className="flex items-start justify-between mb-8">
            <h2 className="font-bold text-[#e1e1e6] text-2xl">
              {transaction ? "Editar transação" : "Nova transação"}
            </h2>
            <button onClick={onClose} className="text-[#7c7c8a] hover:text-[#c4c4cc] transition-colors">
              <LuX className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Type selector */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setType("income")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 rounded-[6px] transition-colors border-2 ${
                  type === "income"
                    ? "bg-[#00b37e]/10 border-[#00b37e]"
                    : "bg-[#29292e] border-transparent"
                }`}
              >
                <FiArrowUpCircle className="w-6 h-6 text-[#00b37e]" />
                <span className="text-[#c4c4cc]">Entrada</span>
              </button>
              <button
                type="button"
                onClick={() => setType("expense")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 rounded-[6px] transition-colors border-2 ${
                  type === "expense"
                    ? "bg-[#f75a68]/10 border-[#f75a68]"
                    : "bg-[#29292e] border-transparent"
                }`}
              >
                <FiArrowDownCircle className="w-6 h-6 text-[#f75a68]" />
                <span className="text-[#c4c4cc]">Saída</span>
              </button>
            </div>

            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição"
              required
              className="w-full bg-[#121214] rounded-[6px] px-4 py-4 text-[#e1e1e6] placeholder:text-[#7c7c8a] focus:outline-none focus:ring-2 focus:ring-[#00b37e]"
            />

            <input
              type="number"
              step="0.01"
              min="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Valor"
              required
              className="w-full bg-[#121214] rounded-[6px] px-4 py-4 text-[#e1e1e6] placeholder:text-[#7c7c8a] focus:outline-none focus:ring-2 focus:ring-[#00b37e]"
            />

            {/* Category */}
            <div className="flex flex-col gap-2">
              {!isCreatingCategory ? (
                <div className="flex gap-2">
                  <div className="relative flex-1 flex items-center">
                    <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      required
                      disabled={loadingCategories}
                      className="w-full bg-[#121214] rounded-[6px] px-4 pr-10 py-4 text-[#e1e1e6] focus:outline-none focus:ring-2 focus:ring-[#00b37e] disabled:opacity-50 appearance-none cursor-pointer"
                    >
                      {loadingCategories ? (
                        <option>Carregando...</option>
                      ) : filteredCategories.length === 0 ? (
                        <option value="">Nenhuma categoria disponível</option>
                      ) : (
                        filteredCategories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.nome}
                          </option>
                        ))
                      )}
                    </select>
                    <LuChevronDown className="absolute right-4 w-4 h-4 text-[#7c7c8a] pointer-events-none" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsCreatingCategory(true)}
                    title="Nova categoria"
                    className="cursor-pointer bg-[#29292e] hover:bg-[#323238] transition-colors px-4 rounded-[6px] text-[#00b37e] flex items-center justify-center border border-[#323238]"
                  >
                    <LuPlus className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleConfirmNewCategory(); } }}
                      placeholder={`Nova categoria (${type === "income" ? "Receita" : "Despesa"})`}
                      autoFocus
                      disabled={savingCategory}
                      className="flex-1 bg-[#121214] rounded-[6px] px-4 py-4 text-[#e1e1e6] placeholder:text-[#7c7c8a] focus:outline-none focus:ring-2 focus:ring-[#00b37e]"
                    />
                    <button
                      type="button"
                      onClick={handleConfirmNewCategory}
                      disabled={savingCategory || !newCategoryName.trim()}
                      className="cursor-pointer bg-[#00875f] hover:bg-[#015f43] transition-colors px-4 rounded-[6px] text-white flex items-center justify-center disabled:opacity-50"
                    >
                      {savingCategory ? <LuLoader className="w-5 h-5 animate-spin" /> : <LuCheck className="w-5 h-5" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setIsCreatingCategory(false); setNewCategoryName(""); setCategoryError(""); }}
                      disabled={savingCategory}
                      className="cursor-pointer bg-[#29292e] hover:bg-[#323238] transition-colors px-4 rounded-[6px] text-[#f75a68] flex items-center justify-center border border-[#323238]"
                    >
                      <LuX className="w-5 h-5" />
                    </button>
                  </div>
                  {categoryError && <p className="text-[#f75a68] text-sm">{categoryError}</p>}
                </div>
              )}
            </div>

            {error && <p className="text-[#f75a68] text-sm">{error}</p>}

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-[#00875f] hover:bg-[#015f43] transition-colors text-white font-bold py-4 rounded-[6px] mt-2 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving ? (
                <><LuLoader className="w-5 h-5 animate-spin" /> Salvando...</>
              ) : (
                transaction ? "Salvar alterações" : "Cadastrar"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
