"use client";

import { useState } from "react";
import { LuLoader } from "react-icons/lu";
import { useFinance } from "../../contexts/finance-context";
import { Transaction } from "../../types";
import {
  TransactionContainer,
  TransactionTitle,
  TransactionValue,
  TransactionCategory,
  TransactionDate,
} from "./TransactionLine";
import TransactionsFilters from "./TransactionsFilters";

interface TransactionsListProps {
  onEdit: (tx: Transaction) => void;
  onDelete: (id: string) => void;
}

export default function TransactionsList({ onEdit, onDelete }: TransactionsListProps) {
  const { transactions, loading } = useFinance();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all");
  const [sortOrder, setSortOrder] = useState<"recent" | "oldest">("recent");

  const filtered = transactions
    .filter((tx) => {
      const matchSearch = tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchType = filterType === "all" || tx.type === filterType;
      return matchSearch && matchType;
    })
    .sort((a, b) => {
      // Sort by date string (pt-BR: DD/MM/YYYY) converted to comparable value
      const parse = (d: string) => {
        const [day, month, year] = d.split("/");
        return new Date(`${year}-${month}-${day}`).getTime();
      };
      return sortOrder === "recent" ? parse(b.date) - parse(a.date) : parse(a.date) - parse(b.date);
    });

  return (
    <section className="pb-8">
      <TransactionsFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterType={filterType}
        setFilterType={setFilterType}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {loading ? (
        <div className="flex items-center justify-center py-16 gap-2 text-[#7c7c8a]">
          <LuLoader className="w-6 h-6 animate-spin" />
          <span>Carregando transações...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#29292e] rounded-[6px] p-8 text-center">
          <p className="text-[#7c7c8a]">
            {transactions.length === 0
              ? "Nenhuma transação cadastrada nesta conta."
              : "Nenhuma transação encontrada para os filtros aplicados."}
          </p>
        </div>
      ) : (
        <div className="space-y-2 overflow-y-auto max-h-[350px] xl:max-h-[420px] custom-scrollbar">
          {filtered.map((tx) => (
            <TransactionContainer
              key={tx.id}
              id={tx.id}
              onEdit={() => onEdit(tx)}
              onDelete={() => onDelete(tx.id)}
            >
              <TransactionTitle title={tx.description} />
              <TransactionValue amount={tx.amount} type={tx.type} />
              <TransactionCategory category={tx.category} />
              <TransactionDate date={tx.date} />
            </TransactionContainer>
          ))}
        </div>
      )}
    </section>
  );
}