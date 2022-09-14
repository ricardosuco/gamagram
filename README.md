<!-- #Projeto Integrador Gama Academy / ACATE - Gamagram -->

# 💻 &nbsp;Sobre o repositório

Explorando o Estilo Arquitetural REST com Node.js

API no intuito de simular uma rede social

<br>

# 🛠 Tecnologias utilizadas 

- Node.js
- MySQL
- Javascript
- Express

#### **Tecnologias**

  ![Node.js](https://img.shields.io/badge/-Node.js-333333?style=flat&logo=node.js) 
  ![MySQL](https://img.shields.io/badge/-MySQL-333333?style=flat&logo=Mysql) 
  ![JavaScript](https://img.shields.io/badge/-JavaScript-333333?style=flat&logo=javascript)
  ![Express](https://img.shields.io/badge/-Express-333333?style=flat&logo=express)

#### **Testes**

  ![Insomnia](https://img.shields.io/badge/-Insomnia-333333?style=flat&logo=insomnia)
  ![Postman](https://img.shields.io/badge/-Postman-333333?style=flat&logo=postman)

#### **DevOps**

  ![GitHub](https://img.shields.io/badge/-GitHub-333333?style=flat&logo=github)

#### **Ferramentas de Desenvolvimento**

  ![Visual Studio Code](https://img.shields.io/badge/-Visual%20Studio%20Code-333333?style=flat&logo=visual-studio-code&logoColor=007ACC)
  ![Insomnia](https://img.shields.io/badge/-Insomnia-333333?style=flat&logo=insomnia)
  <br>
  

# 😀 Pré requisitos globais: 

<!-- ALTERAR OS PRE-REQUISITOS ABAIXO CONFORME NOSSO PROJETO -->

### para instalar o Typescript
> npm i -g typescript
### para gerar o tsconfig.json
> tsc --init
### para instalar o Typescript em Dev
> npm i --save-dev typescript
### para instalar o @types do node.js
> npm i --save-dev @types/node
### para instalar o express
> npm i --save express
### para instalar o types do express
> npm i --save @types/express
### para instalar o ts-node-dev para auxiliar no desenvolvimento de Typescript dentro do node
> npm i --save-dev ts-node-dev
### para instalar o http-status-codes
> npm i --save http-status-codes
### para rodar as migrations
> npx knex migrate:latest

<br>

# 💽 Instalação:
> npm install

<br>

# Gamagram

## O que será possivel fazer
- Cadastro
- Login
- Ver os dados do perfil
- Editar dados do perfil
- Ver postagens de outros usuários
		- Ver quantidade de curtidas numa postagem
		- Ver os comentários em uma postagem
- Curtir postagens
- Excluir o próprio comentário
- Excluir o próprio post
- Editar o próprio post
- Editar o próprio comentário
- Buscar usuários

## O que não será possível fazer
- Ver a localização de uma postagem
- Ver usuarios que curtiram as postagens 
- Curtir comentários
- Comentar em outros comentários
- Publicar stories
- Adicionar filtros nas imagens
- Seguir usuários

# Endpoints


### [GET] - Usuário - "/username"

#### Dados Enviados
- Token
  
#### Dados Retornados
- URL da foto de perfil
- Nome
- Username
- Bio
- Email
- Telefone
- Genero
 ---

### [POST] - Usuário - "/user/:id"

#### Dados Enviados
- URL da foto de perfil
- Nome
- Username
- Senha
- Bio
- Email
- Telefone
- Genero
  
#### Dados Retornados
- Sucesso / Erro
 
### [PUT] - Usuário - "/user/:id"

#### Dados Enviados
- Token
- URL da foto de perfil
- Nome
- Username
- Bio
- Email
- Telefone
- Genero
  
#### Dados Retornados
- Sucesso / Erro
 
### [GET]  - Post - "/post"
#### Dados Enviados
- Token
#### Dados Retornados
- Postagens [ ]
	- ID
	- Usuario
		- URL da foto
		- username
	- Fotos [ ]
	- Quantidade de curtidas
	- Curtida pelo usuario logado
	- Comentarios
		- Username
		- Texto do comentario
	- Data
---

### [POST]  - Post - "/post"
#### Dados Enviados
- Token
- URL da Foto
- Texto da legenda
#### Dados Retornados
- Sucesso / Erro
---

### [PUT]  - Post - "/post/:id"
#### Dados Enviados
- Token
- ID do post a ser alterado
- URL da Foto
- Texto da legenda
#### Dados Retornados
- Sucesso / Erro
---

### [DELETE] - Postagem - "/post/:id"
#### Dados Enviados
- Token
- ID da postagem
  
#### Dados Retornados
- Sucesso/Erro
---

### [POST] - Login - "/login"
#### Dados Enviados
- username ou email
- senha
#### Dados Retornados
- Token de autenticação
---

### [PUT] - Comentário - "/comments"
#### Dados enviados
- Id do post a ser comentado
- Texto do comentário
#### Dados Retornados
- Sucesso / erro
---

### [PUT] - Comentário - "/comments/:id"
#### Dados enviados
- Id do post a ser comentado
- Id do comentario a ser alterado
- Texto do comentário
#### Dados Retornados
- Sucesso / erro
--- 

### [DELETE] - Comentário - "/comments/:id"
#### Dados Enviados
- Token
- ID do comentario

#### Dados Retornados
- Sucesso/Erro



