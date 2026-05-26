export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: TransactionType;
}

export interface Investment {
  id: string;
  nome: string;
  amount: number;
  type: string;
  date: string;
}

export interface Goal {
  id: string;
  nome: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
}
