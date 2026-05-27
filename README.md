# 💰 DT Money

Sistema de controle financeiro completo para gerenciamento de contas bancárias, receitas e despesas, com autenticação de usuário e dashboard financeiro em tempo real.

---

## 🚀 Visão Geral

O **DT Money** é uma aplicação full-stack para controle financeiro pessoal, permitindo que usuários criem contas bancárias, registrem transações e acompanhem seu saldo de forma organizada e intuitiva.

O sistema foi construído com foco em boas práticas de frontend moderno, arquitetura baseada em contextos e consumo de API REST.

---

## ✨ Funcionalidades

- 🔐 Autenticação de usuários (login e logout)
- 🏦 Criação e gerenciamento de contas bancárias
- 💸 Cadastro de transações (receitas e despesas)
- ✏️ Edição de transações
- 🗑️ Exclusão de transações
- 📊 Dashboard com resumo financeiro:
  - Entradas
  - Saídas
  - Saldo total
- 🗂️ Organização por categorias
- 💾 Persistência de sessão com localStorage
- 🔄 Atualização dinâmica com React Query
- 📱 Interface responsiva

---

## 🧠 Tecnologias Utilizadas

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- Axios
- TanStack React Query
- React Icons

---

## 🏗️ Arquitetura

- Context API para estado global
- Separação por serviços (`services/`)
- Validação de formulários com Zod
- Consumo de API REST via Axios
- Gerenciamento de cache e sincronização com React Query

---

## 🔗 Backend

Este projeto consome uma API desenvolvida em Spring Boot:

https://github.com/Igor-de-Lima52/FintechBack

---

## ⚙️ Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/Igor-de-Lima52/FintechFront.git
```

### 2.Instale as dependências
```bash
npm install
```

### 3. Execute o projeto
```bash
npm run dev
```

## 📌 Observações
- O backend precisa estar rodando para o sistema funcionar corretamente
- O projeto utiliza autenticação baseada em localStorage
- O estado global é gerenciado via Context API

## Possíveis melhorias futuras
- Refresh token automático
- Melhor controle de cache com React Query
- Filtros avançados de transações
- Exportação de relatórios financeiros (PDF/Excel)
- Dark/Light mode
- Relatório e CRUD para investimento