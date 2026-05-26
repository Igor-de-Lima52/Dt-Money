import { Transaction } from "../../types";
import TransactionsList from "./TransactionsList";

interface TransactionsSectionProps {
  onEdit: (tx: Transaction) => void;
  onDelete: (id: string) => void;
}

export default function TransactionsSection({ onEdit, onDelete }: TransactionsSectionProps) {
  return (
    <TransactionsList onEdit={onEdit} onDelete={onDelete} />
  );
}