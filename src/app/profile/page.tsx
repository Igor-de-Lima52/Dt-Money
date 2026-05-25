'use client'

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import {
  userSchema,
  UserFormData,
} from "@/app/schemas/user-schema";

import {
  getUserById,
  updateUser,
  UpdateUserPayload,
} from "@/app/services/user";

import {
  FormContainer,
  FormDescription,
  FormSign,
  FormTitle,
} from "@/app/components/FormSign";

import {
  InputContainer,
  LabelContainer,
} from "@/app/components/ui/Input";

import Button from "@/app/components/ui/Button";

import {
  formatCPF,
} from "@/app/utils/format-cpf";

import {
  removeMask,
} from "@/app/utils/remove-mask";

import {
  useAuth,
} from "@/app/contexts/auth-context";

export default function ProfilePage() {
  const router = useRouter();

  const { user } = useAuth();

  const userId = user?.id;
  
  const { data: userData, isLoading } = useQuery({ queryKey: ["user", userId], queryFn: () => getUserById(userId), enabled: !!userId});
  
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<UserFormData>({
    resolver:
      zodResolver(
        userSchema
      ),
  });

  const cpfValue = watch("cpf");


  useEffect(() => {
    if (!userData) return;

    reset({
      name:
        userData.name,

      cpf:
        userData.cpf,

      email:
        userData.email,

      sex:
        userData.sex,

      birthDate:
        userData.birthDate?.split(
          "T"
        )[0],

      password: "",

      confirmPassword:
        "",
    });
  }, [userData, reset]);

  const mutation = useMutation({mutationFn: (data: UpdateUserPayload) => updateUser(userId!, data)});

  function onSubmit(data: UserFormData) {
    const payload: UpdateUserPayload = {
      nome: data.name,
      cpf: data.cpf,
      email: data.email,
      sexo: data.sex,
      dataNascimento: `${data.birthDate}T00:00:00`,
      senha: data.password || undefined,
    };

    mutation.mutate(payload);
  }

  if (isLoading) {
    return (
      <p>
        Carregando...
      </p>
    );
  }

  return (
    <FormContainer>
      <FormTitle>
        Editar conta
      </FormTitle>

      <FormDescription>
        Atualize seus dados
      </FormDescription>

      <FormSign
        onSubmit={handleSubmit(
          onSubmit
        )}

        noValidate
      >
        <div>
          <LabelContainer htmlFor="name">
            Nome completo
          </LabelContainer>

          <InputContainer
            id="name"
            type="text"
            placeholder="Seu nome"

            {...register(
              "name"
            )}

            className={
              errors.name
                ? "border-red-500"
                : ""
            }
          />

          {errors.name && (
            <span className="text-red-700 text-xs">
              {
                errors.name
                  .message
              }
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <div className="w-full">
            <LabelContainer htmlFor="cpf">
              CPF
            </LabelContainer>

            <InputContainer
              id="cpf"
              type="text"
              placeholder="000.000.000-00"

              value={formatCPF(
                cpfValue || ""
              )}

              onChange={(e) =>
                setValue(
                  "cpf",

                  removeMask(
                    e.target.value
                  )
                )
              }

              className={
                errors.cpf
                  ? "border-red-500"
                  : ""
              }
            />

            {errors.cpf && (
              <span className="text-red-700 text-xs">
                {
                  errors.cpf
                    .message
                }
              </span>
            )}
          </div>

          <div className="w-full">
            <LabelContainer htmlFor="birthDate">
              Data nascimento
            </LabelContainer>

            <InputContainer
              id="birthDate"
              type="date"

              {...register(
                "birthDate"
              )}

              className={
                errors.birthDate
                  ? "border-red-500"
                  : ""
              }
            />

            {errors.birthDate && (
              <span className="text-red-700 text-xs">
                {
                  errors
                    .birthDate
                    .message
                }
              </span>
            )}
          </div>
        </div>

        <div>
          <LabelContainer htmlFor="email">
            E-mail
          </LabelContainer>

          <InputContainer
            id="email"
            type="email"
            placeholder="seu@email.com"

            {...register(
              "email"
            )}

            className={
              errors.email
                ? "border-red-500"
                : ""
            }
          />

          {errors.email && (
            <span className="text-red-700 text-xs">
              {
                errors.email
                  .message
              }
            </span>
          )}
        </div>

        <div>
          <LabelContainer htmlFor="sex">
            Sexo
          </LabelContainer>

          <select
            id="sex"

            {...register(
              "sex"
            )}

            className="
              w-full
              bg-[#121214]
              border
              border-[#323238]
              rounded-lg
              p-4
              text-[#e1e1e6]
            "
          >
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

          {errors.sex && (
            <span className="text-red-700 text-xs">
              {
                errors.sex
                  .message
              }
            </span>
          )}
        </div>

        <div>
          <LabelContainer htmlFor="password">
            Nova senha
          </LabelContainer>

          <InputContainer
            id="password"
            type="password"
            placeholder="••••••••"

            {...register(
              "password"
            )}

            className={
              errors.password
                ? "border-red-500"
                : ""
            }
          />

          {errors.password && (
            <span className="text-red-700 text-xs">
              {
                errors.password
                  .message
              }
            </span>
          )}
        </div>

        <div>
          <LabelContainer htmlFor="confirmPassword">
            Confirmar senha
          </LabelContainer>

          <InputContainer
            id="confirmPassword"
            type="password"
            placeholder="••••••••"

            {...register(
              "confirmPassword"
            )}

            className={
              errors
                .confirmPassword
                ? "border-red-500"
                : ""
            }
          />

          {errors.confirmPassword && (
            <span className="text-red-700 text-xs">
              {
                errors.confirmPassword.message
              }
            </span>
          )}
        </div>

        <Button type="submit">
          {mutation.isPending ? "Salvando..." : "Salvar alterações"}
        </Button>
      </FormSign>
    </FormContainer>
  );
}