"use client";

import Header from "./components/Header";
import MoneyCard from "./components/ui/MoneyCard";
import DoubleCardSection from "./components/ui/DoubleCardSection";
import TransactionsSection from "./components/ui/TransactionsSection";
import { useAuth } from "./contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  
  const { user } = useAuth();
   
  // if(!user) {
  //   router.replace("/signin");
  // }

  useEffect(() => {
    if (!user) {
      router.replace("/signin");
    }
  }, [user, router]);


  return (
    <div className="h-full bg-[#121214] w-full">
      <Header />

      <div className="w-full h-screen md:relative mt-40 px-6 md:px-12 lg:px-30 md:-mt-20">
        {/* Summary Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MoneyCard title="Entradas" amount={1000} />
          <MoneyCard title="Saídas" amount={500} />
          <MoneyCard title="Total" amount={2000} />
        </section>

        <DoubleCardSection />
        <TransactionsSection />

        {/* Modals */}
        {/* <TransactionModal
          isOpen={transactionModalOpen}
          onClose={() => {
             setTransactionModalOpen(false);
             setSelectedTransaction(undefined);
           }}
           onSave={handleSaveTransaction}
           transaction={selectedTransaction}
         /> */}

        {/* <InvestmentModal
          isOpen={investmentModalOpen}
          onClose={() => {
            setInvestmentModalOpen(false);
            setSelectedInvestment(undefined);
          }}
          onSave={handleSaveInvestment}
          investment={selectedInvestment}
        />

        <GoalModal
          isOpen={goalModalOpen}
          onClose={() => {
            setGoalModalOpen(false);
            setSelectedGoal(undefined);
          }}
          onSave={handleSaveGoal}
          goal={selectedGoal}
        />

        <DeleteConfirmModal
          isOpen={deleteModalOpen}
          onClose={() => {
            setDeleteModalOpen(false);
            setItemToDelete(null);
          }}
          onConfirm={handleConfirmDelete}
          title="Confirmar exclusão"
          message="Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita."
        /> */}
        </div>
      </div>
  );
}
