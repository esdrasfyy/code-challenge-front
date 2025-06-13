# Desafio IZA Seguradora - Desenvolvedor Front-End

<div style="background-color: #EFF1F5; text-align: center">
    <img src="/public/logo.png" alt="IZA Seguradora Logo" style="max-width: 200px; height: auto;">
</div>

## Sobre o Desafio

Este repositório contém o desafio técnico desenvolvido para a empresa **IZA Seguradora**, com foco na criação de uma aplicação web robusta, moderna e funcional.  
A aplicação foi construída com foco em **performance, usabilidade e escalabilidade**, utilizando tecnologias modernas como **Next.js, TypeScript, Zustand e Tailwind CSS**.

---

## Funcionalidades

- Formulário multi-step dividido em:
  - Dados Pessoais
  - Endereço
  - Confirmação
- Máscaras para CPF, telefone e CEP
- Validações com **Yup**
- Gerenciamento global de estado com **Zustand**
- Integração com API externa (`CRUD /users`)
- Listagem de usuários com:
  - Filtros e ordenações
  - Pesquisa por nome e e-mail
  - Scroll infinito (melhor desempenho)
  - Atualização em tempo real
- Exportação e importação de usuários via CSV (tem um arquivo de exemplo no diretorio /data)
- Feedbacks visuais e validações
- Animações com **Framer Motion**
- Cache inteligente de dados com **React Query (useQuery)**

<img src="/public/iza-app.gif" width="500" height="300">

---

## Frontend - Next.js

A aplicação foi construída utilizando **Next.js**, com uma arquitetura escalável, responsiva e performática.  
Foco em UX, modularidade de componentes e integração fluida com o backend simulado.

---

## Tecnologias Utilizadas

- **Next.js**
- **React**
- **TypeScript**
- **Zustand**
- **Tailwind CSS**
- **React Query**
- **Framer Motion**
- **Yup**

---
## Observações sobre a API fornecida

Durante o desenvolvimento, identifiquei alguns pontos de atenção na API que podem impactar o uso por outros candidatos:

- O campo `updated_at` não consta na tabela de `users`, dificultando o controle de atualizações.
- Os usuários retornados na listagem não possuem seus respectivos `id`s, o que inviabiliza operações como edição, exclusão e busca individual.
- Os campos `created_at` e `updated_at` não são retornados na rota de listagem, dificultando a ordenação cronológica.
- A configuração de CORS estava incorreta, bloqueando requisições no ambiente local.

Apesar desses pontos, consegui contornar as limitações na minha implementação. No entanto, deixo registrado para facilitar o trabalho de outros participantes que venham a utilizar essa mesma API.
