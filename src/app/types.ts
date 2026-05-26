export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  description: string; // nome
  amount: number;       // valor
  category: string;     // categoria.nome
  categoryId: string;   // categoria.id (necessário para edição)
  type: TransactionType; // derivado de categoria.tipo
  date: string;         // dataCriacao formatada (pt-BR)
}

// Investment and Goal remain local (Fase 2)
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
