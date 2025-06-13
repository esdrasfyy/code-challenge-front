# Desafio de Desenvolvimento Frontend: Formulário de Cadastro de Usuário

Este repositório contém o ponto de partida para o seu desafio de desenvolvimento frontend. Você deverá construir uma aplicação Next.js para um processo de cadastro de usuários em múltiplas etapas, consumindo uma API de backend fornecida.

## Visão Geral do Desafio

Seu objetivo é desenvolver um formulário de cadastro de usuário dividido em 3 etapas, utilizando Next.js, TypeScript, e Zustand para gerenciamento de estado. O formulário deverá implementar validações de frontend com máscaras de input e, na etapa final, enviar os dados para a API de Registro de Usuários.

## Requisitos Fundamentais

### Estrutura da Aplicação:

- Crie uma aplicação Next.js com:
  - Uma página principal (/) que hospede o formulário multi-step
  - [Opcional] Uma página de gerenciamento de usuários (/users) para listagem, edição e exclusão
- Todo o código deve ser escrito em TypeScript.
- Adote Tailwind CSS e/ou Chakra UI para a estilização dos componentes, garantindo responsividade e acessibilidade.

### Gerenciamento de Estado com Zustand:

Crie uma store Zustand dedicada para gerenciar o estado global do formulário de cadastro. Isso inclui:

- Os dados de cada etapa do formulário, que devem mapear diretamente para os campos esperados pela API.
- O número da etapa atual do formulário.
- Funções para avançar (`nextStep`) e retroceder (`prevStep`) entre as etapas.
- Um estado para controlar o status da submissão à API (ex: `isLoading`, `isSuccess`, `isError`, `errorMessage`).

### Etapas do Formulário (3 Steps):

#### Step 1: Dados Pessoais

- **Campos**: Nome Completo (input de texto), Email (input de tipo email), Telefone (input de texto).
- **Validações (Frontend)**: Todos os campos obrigatórios. Email: formato válido. Telefone: número mínimo de dígitos após a máscara preenchido.
- **Máscaras**: Implementar máscara para Telefone ((XX) XXXXX-XXXX ou (XX) XXXX-XXXX).

#### Step 2: Endereço

- **Campos**: CEP (input de texto), Endereço (input de texto), Número (input de texto), Cidade (input de texto), Estado (um select ou dropdown com as 27 siglas de estados brasileiros válidas: AC, AL, AP, AM, BA, CE, DF, ES, GO, MA, MT, MS, MG, PA, PB, PR, PE, PI, RJ, RN, RS, RO, RR, SC, SP, SE, TO).
- **Validações (Frontend)**: Todos os campos obrigatórios. CEP: formato válido (XXXXX-XXX). Estado: deve ser uma das siglas válidas.
- **Máscaras**: Implementar máscara para CEP (XXXXX-XXX).

#### Step 3: Confirmação e Envio

- **Campos**: Exibir todos os dados coletados para revisão. Checkbox "Aceito os termos e condições" (obrigatório).
- **Validações (Frontend)**: Checkbox deve estar marcado para o envio.
- **Ação de Finalizar Cadastro**:
  - Realizar uma requisição POST para a API de Registro de Usuários.
  - Implementar estado visual de "carregando" (ex: spinner).
- **Tratamento de Respostas da API**:
  - Sucesso (HTTP Status 201 Created): Exibir mensagem de sucesso (modal ou nova tela). Opcionalmente, limpar formulário e retornar à primeira etapa.
  - Erro (HTTP Status 400, 409, 500): Exibir mensagem de erro clara e amigável, utilizando a mensagem da API. Manter os dados do formulário preenchidos para correção.

### Experiência do Usuário (UX):

- Mensagens de erro de validação (frontend) claras, preferencialmente abaixo do campo problemático.
- Os botões "Próximo" e "Finalizar Cadastro" desabilitados até que a etapa atual seja válida.
- Indicar visualmente a etapa atual (ex: "Etapa 1 de 3" ou barra de progresso).
- Navegação suave e intuitiva entre as etapas.

## Recursos Fornecidos

- **API de Registro de Usuários**: A API de backend já está funcional e pode ser acessada em `http://localhost:7000`. Você deve assumir que a API estará rodando.
- **URL do Repositório da API (para consulta)**: https://github.com/iza-seguros/api-test-front
- **Documentação Interativa da API (Swagger UI)**: Acesse `http://localhost:7000/` após iniciar a API.
- **Endpoint de Cadastro**: `POST /users`
  - **Campos Esperados (JSON Body)**: `full_name`, `email`, `phone`, `zip_code`, `address`, `number`, `city`, `state`, `terms_accepted`.
  - **Validações de Backend (complementares)**: Todos os campos obrigatórios; email válido e único; phone e zip_code com formato brasileiro; state sigla brasileira válida; terms_accepted deve ser true.
  - **Códigos de Resposta Relevantes**: 201 Created (sucesso), 400 Bad Request (erros de validação), 409 Conflict (email já existe), 500 Internal Server Error (erro interno).

## Recursos Opcionais (Diferenciais)

### Tela de Gerenciamento de Usuários

Crie uma rota `/users` que implemente:

1. **Listagem de Usuários**:

   - Tabela com paginação
   - Busca/filtro por nome ou email
   - Ordenação por colunas

2. **Edição de Usuário**:

   - Modal ou nova página para edição
   - Reutilização do formulário de cadastro (com preenchimento dos dados)
   - Integração com endpoint PUT da API

3. **Exclusão de Usuário**:

   - Confirmação antes da exclusão
   - Integração com endpoint DELETE da API
   - Feedback visual após operação

4. **Visualização de Detalhes**:
   - Modal com todos os dados do usuário
   - Histórico de alterações (se API suportar)

### Requisitos Técnicos Opcionais:

- Cache de dados com Zustand
- Atualização em tempo real da lista após operações
- Animações de transição entre estados
- Exportação de dados (CSV/JSON)

## Como Começar

1. **Faça um Fork Privado**: Crie um fork privado deste repositório para sua conta GitHub.
2. **Compartilhe o Repositório**: Adicione o usuário @felipebenevides como colaborador no seu repositório bifurcado, concedendo acesso de leitura.
3. **Clone seu Fork**: Clone o seu fork privado para sua máquina local.

```bash
git clone <URL_DO_SEU_FORK_PRIVADO>
cd <nome-do-seu-repositorio>
```
