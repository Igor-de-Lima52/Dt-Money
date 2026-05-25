import TransactionsFilters from "./TransactionsFilters";
import TransactionsList from "./TransactionsList";

export default function TransactionsSection() {
  return(
    <section className="pb-8">
      <TransactionsFilters />
      <TransactionsList />        
    </section>
  );
}