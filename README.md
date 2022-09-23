<!-- #Projeto Integrador Gama Academy / ACATE - Gamagram -->

# 💻 &nbsp;Sobre o repositório
Projeto final da Gama Academy Dev For Tech da turma de Node.js ministrado pelo professor Ricardo Bontempo.

Esta é uma API no intuito de simular uma rede social chamada Gamagram. Explorando o Estilo Arquitetural REST com Node.js.

<br>

# 🛠 Tecnologias utilizadas 
### Back end

 [![JavaScript](https://img.shields.io/badge/-JavaScript-333333?style=flat&logo=javascript)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
 [![Node.js](https://img.shields.io/badge/-Node.js-333333?style=flat&logo=node.js)](https://nodejs.org/pt-br/)
 [![Express](https://img.shields.io/badge/-Express-333333?style=flat&logo=express)](http://expressjs.com/pt-br/)
 [![MySQL](https://img.shields.io/badge/-MySQL-333333?style=flat&logo=Mysql)](https://www.mysql.com/)
 [![Knex.js](https://tinyurl.com/ba56k89e)](knexjs.org/guide/#configuration-options)
 [![Knex.js]( https://img.shields.io/badge/JWT-grey.svg?logo=JSON%20web%20tokens)](knexjs.org/guide/#configuration-options)



### Front End

[![HTML5](https://img.shields.io/badge/-HTML-333333?style=flat&logo=HTML5)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/-CSS-333333?style=flat&logo=CSS3)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/-JavaScript-333333?style=flat&logo=javascript)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![Vue.js](https://img.shields.io/badge/-Vue.js-333333?style=flat&logo=vue.js)](https://vuejs.org)
[![Quasar]( https://img.shields.io/badge/-Quasar-333333?style=flat&logo=quasar)](https://quasar.dev)



#### **Testes**

  [![Insomnia](https://img.shields.io/badge/-Insomnia-333333?style=flat&logo=insomnia)](https://insomnia.rest/download)
  [![Postman](https://img.shields.io/badge/-Postman-333333?style=flat&logo=postman)](https://www.postman.com/)

#### **DevOps**

  [![GitHub](https://img.shields.io/badge/-GitHub-333333?style=flat&logo=github)](https://github.com)
  ![Heroku](https://img.shields.io/badge/-Heroku-333333?style=flat&logo=heroku)
  ![AWS]( https://img.shields.io/badge/AWS-grey.svg?logo=amazon-aws) 
  ![Firebase](https://img.shields.io/badge/-Firebase-333333?style=flat&logo=firebase)
 
  


#### **Ferramentas de Desenvolvimento**

  [![Visual Studio Code](https://img.shields.io/badge/-Visual%20Studio%20Code-333333?style=flat&logo=visual-studio-code&logoColor=007ACC)](https://code.visualstudio.com/)
  [![Insomnia](https://img.shields.io/badge/-Insomnia-333333?style=flat&logo=insomnia)](https://insomnia.rest/download)
  [![MySQL](https://img.shields.io/badge/-MySQL-333333?style=flat&logo=Mysql)](https://www.mysql.com/)
   
  <br>
  

# 😀 Pré requisitos globais: 

### para instalar o http-status-codes
> npm i --save http-status-codes
### para rodar as migrations
> npx knex migrate:latest

<br>

# 💽 Instalação:
> npm install

> criar um arquivo .env e colocar as seguintes variáveis de ambiente:
~~~
AWS_REGION=
AWS_ACESS_KEY_ID=
AWS_SECRET_ACESS_KEY=
AWS_BUCKET_NAME=
DB_CLIENT=
DB_NAME=
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_PORT=
JWT_SECRET=
~~~

<br>

# 🏦 Banco de Dados

<p align="center">
<img src="./Gamagram - DER.png" alt="DER do banco de dados" width="700px" align="center">
<p/>
<br>

# 🛒Regras de negócio

## O que será possivel fazer
 - [x] Cadastro 
 - [x] Login
 - [x] Ver os dados do perfil
 - [x] Editar dados do perfil
 - [x] Ver postagens de outros usuários
- [ ] Ver quantidade de curtidas numa postagem
- [x] Ver os comentários em uma postagem
 - [ ] Curtir postagens
 - [x] Comentar posts
 - [ ] Descurtir posts
 - [x] Excluir o próprio comentário
 - [x] Criar post
 - [x] Excluir o próprio post
 - [x] Editar o próprio post
 - [x] Editar o próprio comentário
 - [x] Buscar usuários

## O que não será possível fazer
 - Ver a localização de uma postagem
 - Ver usuarios que curtiram as postagens 
 - Curtir comentários
 - Comentar em outros comentários
 - Publicar stories
 - Adicionar filtros nas imagens
 - Seguir usuários

# 🛣 Endpoints


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

## 🦸 Autores

<table>
  <tr>
    <td align="center"><a href="https://github.com/artstar10"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/37708374?v=4" width="100px;" alt=""/><br /><sub><b>Arthur Neves</b></sub></a><br /><a href="" title="Git"></a></td>
    <td align="center"><a href="https://github.com/Gahbr"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/80289718?v=4" width="100px;" alt=""/><br /><sub><b>Gabriel Ribeiro</b></sub></a><br /><a href="https://github.com/Gahbr" title="Git"></a></td>
    <td align="center"><a href="https://github.com/ricardosuco"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/45463245?v=4" width="100px;" alt=""/><br /><sub><b>Ricardo Avelino</b></sub></a><br /><a href="https://github.com/artstar10" title="Git"></a></td>
    <td align="center"><a href="https://github.com/samarapaulasantos"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/52473984?v=4" width="100px;" alt=""/><br /><sub><b>Samara Paula</b></sub></a><br /><a href="https://github.com/samarapaulasantos" title="Git"></a></td>

  </tr>
 
</table>
