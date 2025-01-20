# API de Aplicação de Criptomoedas

Esta API permite que os usuários se registrem, façam login e acessem dados de criptomoedas. Integra-se com o Yahoo Finance para buscar preços de criptomoedas, processa os dados e os fornece exclusivamente para usuários autenticados.

---

## 🚀 Funcionalidades

- Registro de novos usuários
- Login de usuários existentes
- Recuperação de dados de criptomoedas via Yahoo Finance
- Autenticação com JWT para acesso seguro às informações
- Hashing de senhas para segurança adicional

---

## 🛠 Tecnologias Utilizadas

- **Express**: Framework para o backend
- **Prisma**: ORM para interações com o banco de dados
- **JWT (JSON Web Tokens)**: Autenticação
- **Axios**: Requisições HTTP
- **Bcrypt**: Hashing de senhas
- **Yahoo Finance 2**: Recuperação de dados de criptomoedas
- **CORS**: Compartilhamento de recursos entre origens

---

## 📌 Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (v16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

---

## 🔧 Como Configurar o Projeto

1. Clone este repositório:

   ```bash
   git clone https://github.com/seu-usuario/sua-repositorio.git
   cd sua-repositorio
