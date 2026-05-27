"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "./components/Header";
import MoneyCard from "./components/ui/MoneyCard";
import TransactionsSection from "./components/ui/TransactionsSection";
import AccountModal from "./components/AccountModal";
import TransactionModal from "./components/TransactionModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import { useAuth } from "./contexts/auth-context";
import { useAccount } from "./contexts/account-context";
import { useFinance } from "./contexts/finance-context";
import { Transaction } from "./types";

// Separate component so useSearchParams works inside Suspense
function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading } = useAuth();
  const { contaAtiva, contas, loadingContas } = useAccount();
  const { transactions, deleteTransaction } = useFinance();

  const modal = searchParams.get("modal");
  const deleteId = searchParams.get("id");

  // Which modal is open — driven entirely by URL
  const accountModalOpen = modal === "conta";
  const txModalOpen = modal === "transacao";
  const editTxId = modal === "editar" ? searchParams.get("id") : null;
  const deleteModalOpen = modal === "deletar" && !!deleteId;

  const selectedTx: Transaction | undefined =
    editTxId ? transactions.find((t) => t.id === editTxId) : undefined;

  // Helpers to open/close modals via URL
  const openModal = (name: string, extra?: Record<string, string>) => {
    const params = new URLSearchParams({ modal: name, ...extra });
    router.push(`/?${params.toString()}`);
  };
  const closeModal = () => router.push("/");

  // Redirect unauthenticated users
  useEffect(() => {
    if(loading) return;
    if (!user) router.replace("/signin");
  }, [user, router]);

  // Totals
  const totalIncome = transactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);
  const totalExpense = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);
  const totalBalance = totalIncome - totalExpense;

  if (!user) return null;

  return (
    <div className="h-full bg-[#121214] w-full min-h-screen">
      <Header onNewTransaction={() => openModal("transacao")} />

      <div className="w-full min-h-screen relative -mt-16 px-6 md:px-12 lg:px-30 md:-mt-20 pb-20 z-10">

        {/* No account banner */}
        {!loadingContas && contas.length === 0 && (
          <div className="mt-8 mb-6 bg-[#29292e] border border-[#323238] rounded-lg p-6 text-center">
            <p className="text-[#c4c4cc] mb-4">
              Você ainda não tem uma conta cadastrada. Cadastre para começar!
            </p>
            <button
              onClick={() => openModal("conta")}
              className="bg-[#00875f] hover:bg-[#015f43] transition-colors text-white font-bold px-6 py-3 rounded-lg"
            >
              Cadastrar conta
            </button>
          </div>
        )}

        {/* Summary Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 mt-4">
          <MoneyCard title="Entradas" amount={totalIncome} />
          <MoneyCard title="Saídas" amount={totalExpense} />
          <MoneyCard title="Total" amount={totalBalance} />
        </section>

        {/* Transactions */}
        {contaAtiva && (
          <TransactionsSection
            onEdit={(tx) => openModal("editar", { id: tx.id })}
            onDelete={(id) => openModal("deletar", { id })}
          />
        )}
      </div>

      {/* Modals — state driven by URL */}
      <AccountModal
        isOpen={accountModalOpen}
        onClose={closeModal}
      />

      <TransactionModal
        isOpen={txModalOpen || !!editTxId}
        onClose={closeModal}
        transaction={selectedTx}
      />

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={closeModal}
        onConfirm={async () => {
          if (deleteId) await deleteTransaction(deleteId);
        }}
        title="Excluir transação"
        message="Tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita."
      />
    </div>
  );
}

// Suspense boundary required by Next.js for useSearchParams
export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#121214]" />}>
      <HomeContent />
    </Suspense>
  );
}
