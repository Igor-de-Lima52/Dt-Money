import { api } from "./api";

interface LoginData {
  email: string;

  password: string;
}

export async function login(data: LoginData) {
  const response = await api.post("/api/usuarios/login", {
        email: data.email,
        senha: data.password,
      });

  return response.data;
}