"use client"

import { useState } from "react";
import { FormContainer, FormDescription, FormSign, FormTitle } from "../components/FormSign";
import Button from "../components/ui/Button";
import { InputContainer, LabelContainer } from "../components/ui/Input";
import { UserFormData, userSchema } from "../schemas/user-schema";
import { getUserById, updateUser, UpdateUserPayload } from "../services/user";
import { formatCPF } from "../utils/format-cpf";
import { removeMask } from "../utils/remove-mask";
import { useMutation, useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/auth-context";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const { user } = useAuth();

  if(!user) {
    router.push("/signin");
  }

  const userId = user?.id;

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<UserFormData>({
    resolver:
      zodResolver(
        userSchema
      ),
  });

  const cpfValue = watch("cpf");

  const mutation = useMutation({
    mutationFn: async (data: UpdateUserPayload) => {
      const updatedUser = await updateUser(userId!, data);
      return updatedUser;
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  function onSubmit(data: UserFormData) {
    const payload: UpdateUserPayload = {
      nome: data.nome,
      cpf: data.cpf,
      email: data.email,
      sexo: data.sexo,
      dataNascimento: `${data.dataNascimento}T00:00:00`,
      senha: data.password || undefined,
    };

    setIsSubmitting(true);
    mutation.mutate(payload);
  }

  return (
    <FormContainer>
      <FormTitle>Editar conta</FormTitle>

      <FormDescription>Atualize seus dados</FormDescription>

      <FormSign
        onSubmit={handleSubmit(
          onSubmit
        )}
        noValidate
      >
        <div className="mb-4">
          <LabelContainer htmlFor="nome">Nome completo</LabelContainer>
          <InputContainer
            id="nome"
            type="text"
            placeholder="Seu nome"
            {...register("nome", { required: true })}
            className={errors.nome?.message ? "border-red-500" : ""}
          />
          {errors.nome?.message && <span className="text-red-700 text-xs">{errors.nome?.message}</span>}
        </div>

        <div className="mb-4">
          <LabelContainer htmlFor="cpf">CPF</LabelContainer>
          <InputContainer
            id="cpf"
            type="text"
            placeholder="000.000.000-00"
            value={formatCPF(cpfValue || "")}
            onChange={(e) =>
              setValue("cpf", removeMask(e.target.value))
            }
            className={errors.cpf?.message ? "border-red-500" : ""}
          />
          {errors.cpf?.message && <span className="text-red-700 text-xs">{errors.cpf?.message}</span>}
        </div>

        <div className="mb-4">
          <LabelContainer htmlFor="birthDate">Data de nascimento</LabelContainer>
          <InputContainer
            id="birthDate"
            type="date"
            {...register("dataNascimento")}
            className={errors.dataNascimento?.message ? "border-red-500" : ""}
          />
          {errors.dataNascimento?.message && <span className="text-red-700 text-xs">{errors.dataNascimento?.message}</span>}
        </div>

        <div className="mb-4">
          <LabelContainer htmlFor="email">E-mail</LabelContainer>
          <InputContainer
            id="email"
            type="email"
            placeholder="seu@email.com"
            {...register("email")}
            className={errors.email?.message ? "border-red-500" : ""}
          />
          {errors.email?.message && <span className="text-red-700 text-xs">{errors.email?.message}</span>}
        </div>

        <div className="mb-4">
          <LabelContainer htmlFor="sex">Sexo</LabelContainer>
          <select
            id="sex"
            {...register("sexo")}
            className="w-full bg-[#121214] border border-[#323238] rounded-lg p-4 text-[#e1e1e6]"
          >
            <option value="">Selecione</option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
          </select>
          {errors.sexo?.message && <span className="text-red-700 text-xs">{errors.sexo?.message}</span>}
        </div>

        <div className="mb-4">
          <LabelContainer htmlFor="password">Nova senha</LabelContainer>
          <InputContainer
            id="password"
            type="password"
            placeholder="••••••••"
            {...register("password")}
            className={errors.password?.message ? "border-red-500" : ""}
          />
          {errors.password?.message && <span className="text-red-700 text-xs">{errors.password?.message}</span>}
        </div>

        <div className="mb-4">
          <LabelContainer htmlFor="confirmPassword">Confirmar senha</LabelContainer>
          <InputContainer
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            {...register("confirmPassword")}
            className={errors.confirmPassword?.message ? "border-red-500" : ""}
          />
          {errors.confirmPassword?.message && <span className="text-red-700 text-xs">{errors.confirmPassword?.message}</span>}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {mutation.isPending ? "Salvando..." : "Salvar alterações"}
        </Button>
      </FormSign>
    </FormContainer>
  );
}