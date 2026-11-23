# Patinhas Unidas (ConectaDoa)

Sistema de gestão de doações para ONGs. Projeto Integrador Extensionista II (ADS).

Roda em ambiente local: frontend com Vite+, API com Node.js e Express, banco MySQL.

## Pré-requisitos
- Node.js 22 ou mais recente
- Vite+ (`vp`)
- MySQL 8 rodando na máquina
- Git

## Como rodar

1. Clone o repositório e entre na pasta:
   git clone https://github.com/Viniciusant-souz/conectadoa.git
   cd conectadoa

2. Instale as dependências:
   vp install

3. Crie o banco e os dados de exemplo. No cliente do MySQL:
   SOURCE database/schema.sql;
   SOURCE database/seed.sql;

4. Copie `.env.example` para `.env` e preencha a senha do banco e o `JWT_SECRET`:
   cp .env.example .env

5. Em um terminal, inicie a API:
   vp run api

6. Em outro terminal, inicie o frontend:
   vp dev

7. Abra http://localhost:5173 no navegador.

## Usuário de demonstração
- E-mail: voluntario@exemplo.com
- Senha: conectadoa123