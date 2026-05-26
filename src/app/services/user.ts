import { UserFormData } from "../schemas/user-schema";
import { api } from "./api";

export interface User {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  sexo: "MASCULINO" | "FEMININO";
  dataNascimento: string;
}

export async function getUserById(id: string) {
  const response = await api.get<User>(`/usuarios/${id}`);
  return response.data;
}

export interface UpdateUserPayload {
  nome: string;
  cpf: string;
  email: string;
  sexo: "MASCULINO" | "FEMININO";
  dataNascimento: string;
  senha?: string;
}

export async function updateUser(
  id: string,
  data: UpdateUserPayload
) {
  const response = await api.put(
    `/usuarios/${id}`,
    data
  );

  return response.data;
}


interface CreateUserData {
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  sexo: string;
  dataNascimento: string;
}

export async function createUser(
  data: CreateUserData
) {
  const response = await api.post("/usuarios", data);

  return response.data;
}