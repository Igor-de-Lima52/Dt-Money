import { api } from "./api";
import { Banco } from "./banco";

export interface Conta {
  id: string;
  nome: string;
  status: boolean;
  banco: Banco;
}

export interface CreateContaDTO {
  nome: string;
  usuarioId: string;
  bancoId: string;
}

export const getContasByUsuario = (usuarioId: string) =>
  api.get<Conta[]>(`/contas/usuario/${usuarioId}`).then((r) => r.data);

export const createConta = (data: CreateContaDTO) =>
  api.post<Conta>("/contas", data).then((r) => r.data);
