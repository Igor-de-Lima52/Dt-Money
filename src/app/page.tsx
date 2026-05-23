import Header from "./components/Header";
import MoneyCard from "./components/MoneyCard";
import DoubleCardSection from "./components/DoubleCardSection";
import TransactionsSection from "./components/TransactionsSection";

export default function Home() {
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

        {/* New Transaction Button */}
        {/* <div className="flex justify-end mb-6">
          <button
            onClick={() => {
              setSelectedTransaction(undefined);
              setTransactionModalOpen(true);
            }}
            className="bg-[#00b37e] hover:bg-[#00875f] transition-colors text-white font-['Roboto:Bold',sans-serif] px-6 py-3 rounded-[6px] flex items-center gap-2"
          >
            Nova transação
          </button>
        </div> */}
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
        />

        <InvestmentModal
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
