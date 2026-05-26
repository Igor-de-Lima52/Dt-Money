import { z } from "zod";

export const userSchema = z
  .object({
    nome: z
      .string()
      .min(3, "Nome obrigatório"),

    cpf: z
      .string()
      .min(11, {
        error: "CPF inválido"
      }),

    email: z
      .email("E-mail inválido"),
    
    sexo: z.enum(["M", "F"],
      {
        error: "Selecione um sexo",
      }
    ),

    dataNascimento: z
      .string()
      .min(1, "Data obrigatória"),

    password: z
      .string()
      .min(8, "Mínimo 8 caracteres"),

    confirmPassword: z
      .string(),
  })

  .refine(
    (data) =>
      data.password ===
      data.confirmPassword,

    {
      path: ["confirmPassword"],
      message:
        "As senhas não coincidem",
    }
  );

export type UserFormData =
  z.infer<typeof userSchema>;