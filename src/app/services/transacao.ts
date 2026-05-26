import { api } from "./api";
import { Categoria } from "./categoria";
import { Conta } from "./conta";

// Shape returned by the backend
export interface TransacaoAPI {
  id: string;
  nome: string;
  descricao: string;
  valor: number;
  categoria: Categoria;
  conta: Conta;
  dataCriacao: string; // ISO string
}

export interface CreateTransacaoDTO {
  nome: string;
  descricao?: string;
  valor: number;
  categoriaId: string;
  usuarioId: string;
  contaId: string;
}

// type derived from categoria.tipo: "Receita" → income, "Despesa" → expense
export const tipoToTransactionType = (tipo: string): "income" | "expense" =>
  tipo === "Receita" ? "income" : "expense";

export const getTransacoesByConta = (contaId: string) =>
  api.get<TransacaoAPI[]>(`/transacoes/conta/${contaId}`).then((r) => r.data);

export const createTransacao = (data: CreateTransacaoDTO) =>
  api.post<TransacaoAPI>("/transacoes", data).then((r) => r.data);

export const updateTransacao = (id: string, data: CreateTransacaoDTO) =>
  api.put<TransacaoAPI>(`/transacoes/${id}`, data).then((r) => r.data);

export const deleteTransacao = (id: string) =>
  api.delete(`/transacoes/${id}`);
