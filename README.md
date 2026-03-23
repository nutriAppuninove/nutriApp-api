# nutriApp API

API backend desenvolvida em Node.js com Express.

---

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes itens instalados na sua máquina:

- [Node.js](https://nodejs.org/) (versão mínima: 18)
- [npm](https://www.npmjs.com/) (já incluído com o Node.js) ou [yarn](https://yarnpkg.com/)

---

## Passo a passo para rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/nutriAppuninove/nutriApp-api.git
```

### 2. Entrar na pasta do projeto

```bash
cd nutriApp-api
```

### 3. Instalar as dependências

Com npm:

```bash
npm install
```

Ou com yarn:

```bash
yarn
```

### 4. Configurar variáveis de ambiente (se necessário)

Caso o projeto utilize variáveis de ambiente, crie um arquivo `.env` na raiz do projeto com base em um arquivo de exemplo (`.env.example`), se disponível:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com os valores adequados para o seu ambiente local.

### 5. Rodar o projeto

Para ambiente de desenvolvimento (com hot reload via nodemon):

```bash
npm run dev
```

Para ambiente de produção:

```bash
npm start
```

---

## Scripts disponíveis

| Script        | Comando          | Descrição                                      |
|---------------|------------------|------------------------------------------------|
| `dev`         | `npm run dev`    | Inicia o servidor em modo de desenvolvimento com nodemon (hot reload) |
| `start`       | `npm start`      | Inicia o servidor em modo de produção          |

---

## Porta padrão

A aplicação roda por padrão na porta **3000**.

Acesse em: [http://localhost:3000](http://localhost:3000)

---

## Possíveis erros comuns e soluções

### Porta já em uso

**Erro:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solução:** Verifique se há outro processo utilizando a porta 3000 e encerre-o, ou altere a porta da aplicação definindo a variável de ambiente `PORT` no arquivo `.env` (ex: `PORT=3001`).

```bash
# No Linux/macOS, para encontrar o processo:
lsof -i :3000

# Encerrar o processo pelo PID encontrado:
kill -9 <PID>
```

---

### Dependências não instaladas

**Erro:**
```
Cannot find module 'express'
```

**Solução:** Execute a instalação das dependências:

```bash
npm install
```

---

### Problemas com o arquivo `.env`

**Erro:** Variáveis de ambiente não carregadas ou indefinidas.

**Solução:**
- Verifique se o arquivo `.env` existe na raiz do projeto.
- Certifique-se de que o arquivo não tem erros de formatação (sem espaços ao redor do `=`).
- Exemplo de formato correto:

```env
NOME_DA_VARIAVEL=valor
```
