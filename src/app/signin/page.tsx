"use client"

import { z } from "zod";
import Button from "../components/ui/Button"
import { FormContainer, FormDescription, FormLink, FormSign, FormTitle } from "../components/FormSign"
import { InputContainer, LabelContainer } from "../components/ui/Input"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/auth-context";

const schema = z.object({
  email: z.email({ error: "E-mail inválido" }),
  password: z.string().min(8, { error: "A senha deve conter pelo menos 8 caracteres." })
})

type LoginFormData = z.infer<typeof schema>

export default function Login() {
  const { signIn } = useAuth();
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(schema)
  })

  const router = useRouter();

  async function onSubmit(data: LoginFormData) {
    try {
      await signIn(data.email, data.password);
      router.push("/");
    } catch {
      alert("E-mail e/ou senha incorretos!")
    }
  }

  function handleNavigate(e: React.MouseEvent<HTMLElement>, route: string) {
    e.preventDefault();
    router.push(route);
  }
  return (
    <FormContainer>
      <FormTitle>Bem-vindo de volta!</FormTitle>
      <FormDescription>Faça login para continuar</FormDescription>
      <FormSign onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <LabelContainer htmlFor="email">E-mail</LabelContainer>
          <InputContainer placeholder="seu@email.com" type="email" required id="email" {...register("email")} // value={email} onChange={(e) => setEmail(e.target.value)} 
          />
          {errors.email && (
            <span className="text-red-700 text-xs">{errors.email.message}</span>
          )}
        </div>
        <div>
          <LabelContainer htmlFor="password">Senha</LabelContainer>
          <InputContainer placeholder="••••••••" type="password" required id="password" {...register("password")} // value={password} onChange={(e) => setPassword(e.target.value)} 
          />
          {errors.password && (
            <span className="text-red-700 text-xs">{errors.password.message}</span>
          )}
        </div>
        <Button type="submit">Entrar</Button>
        <FormLink>
          <button
            onClick={(e) => handleNavigate(e, "/signup")}
            className="cursor-pointer text-[#00b37e] hover:text-[#00875f] font-bold transition-colors"
          >
            Cadastre-se
          </button>
        </FormLink>
      </FormSign>
    </FormContainer>
  );
}