"use client"

import { useRouter } from "next/navigation";
import Button from "../components/ui/Button";
import { FormContainer, FormDescription, FormLink, FormSign, FormTitle } from "../components/FormSign";
import { InputContainer, LabelContainer } from "../components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserFormData, userSchema } from "../schemas/user-schema";
import { formatCPF } from "../utils/format-cpf";
import { removeMask } from "../utils/remove-mask";
import { createUser } from "../services/user";

export default function SignUp() {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<UserFormData>({
      resolver: zodResolver(userSchema)
    })
  
  const cpfValue = watch("cpf");

  const router = useRouter();

  async function onSubmit(data: UserFormData) {
    const payload = {
      nome: data.nome,
      cpf: data.cpf,
      email: data.email,
      sexo: data.sexo,
      dataNascimento: `${data.dataNascimento}T00:00:00`,
      senha: data.password
    }

    await createUser(payload);

    router.push("/signin");
  }

  function handleNavigate(e: React.MouseEvent<HTMLElement>, route: string) {
    e.preventDefault();
    router.push(route);
  }

  return(
    <FormContainer>
      <FormTitle>Criar conta</FormTitle>
      <FormDescription>Preencha os dados para começar</FormDescription>
      <FormSign onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <LabelContainer htmlFor="name">Nome completo</LabelContainer>
          <InputContainer placeholder="Seu nome" type="text" required id="name" {...register("nome")} className={`${errors.nome ? "border-red-500" : ""}`} />
          {errors.nome && (
            <span className="text-red-700 text-xs">{errors.nome.message}</span>
          )}
        </div>
        <div className="flex justify-between items-center gap-2">
          <div className="w-[50%]">
            <LabelContainer htmlFor="cpf">CPF</LabelContainer>
            <InputContainer id="cpf" type="text" placeholder="000.000.000-00" value={formatCPF(cpfValue || "")} onChange={(e) => setValue("cpf", removeMask(e.target.value))} className={`${errors.cpf ? "border-red-500" : ""}`} />
            {errors.cpf && (
              <span className="text-red-700 text-xs">{errors.cpf.message}</span>
            )}
          </div>
          <div className="w-[50%]">
            <LabelContainer htmlFor="birthDate">Data de nascimento</LabelContainer>
            <InputContainer id="birthDate" type="date" {...register("dataNascimento")} className={`${errors.dataNascimento ? "border-red-500" : ""} w-[50%]`} />
            {errors.dataNascimento && (
              <span className="text-red-700 text-xs">{errors.dataNascimento.message}</span>
            )}
          </div>
        </div>
        <div>
          <LabelContainer htmlFor="email">E-mail</LabelContainer>
          <InputContainer placeholder="seu@email.com" type="email" required id="email" {...register("email")} className={`${errors.email ? "border-red-500" : ""}`} />
          {errors.email && (
            <span className="text-red-700 text-xs">{errors.email.message}</span>
          )}
        </div>
        <div>
          <LabelContainer htmlFor="sex">Sexo</LabelContainer>
          <select id="sex" {...register("sexo")} className="cursor-pointer w-full bg-[#121214] border border-[#323238] rounded-lg p-4 text-[#e1e1e6]">
            <option value="">
              Selecione
            </option>

            <option value="M">
              Masculino
            </option>

            <option value="F">
              Feminino
            </option>
          </select>

          {errors.sexo && (
            <span className="text-red-700 text-xs">
              {errors.sexo.message}
            </span>
          )}
        </div>
        <div>
          <LabelContainer htmlFor="password">Senha</LabelContainer>
          <InputContainer placeholder="••••••••" type="password" required id="password" {...register("password")} className={`${errors.password ? "border-red-500" : ""}`} />
          {errors.password && (
            <span className="text-red-700 text-xs">{errors.password.message}</span>
          )}
        </div>
        <div>
          <LabelContainer htmlFor="confirmPassword">Confirmar senha</LabelContainer>
          <InputContainer placeholder="••••••••" type="password" required id="confirmPassword" {...register("confirmPassword")} className={`${errors.confirmPassword ? "border-red-500" : ""}`} />
          {errors.confirmPassword && (
            <span className="text-red-700 text-xs">{errors.confirmPassword.message}</span>
          )}
        </div>
        <Button type="submit">Cadastrar</Button>
        <FormLink>
          <button
            onClick={(e) => handleNavigate(e, "/signin")}
            className="cursor-pointer text-[#00b37e] hover:text-[#00875f] font-bold transition-colors"
          >
            Faça login
          </button>
        </FormLink>
      </FormSign>
    </FormContainer>
  );
}