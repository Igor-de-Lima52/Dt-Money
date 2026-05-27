import { api } from "./api";

export interface Banco {
  id: string;
  nome: string;
  codigo: number;
}

export const getBancos = () =>
  api.get<Banco[]>("/bancos").then((r) => r.data);
