import { api } from "./api";

export interface Categoria {
  id: string;
  nome: string;
  tipo: string; // "Receita" | "Despesa"
}

export const getCategorias = () =>
  api.get<Categoria[]>("/categorias").then((r) => r.data);

export const createCategoria = (nome: string, tipo: string) =>
  api.post<Categoria>("/categorias", { nome, tipo }).then((r) => r.data);
