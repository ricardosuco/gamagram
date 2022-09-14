
CREATE DATABASE gamagram; 

USE GAMAGRAM;

DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
    id int not null auto_increment primary key,
    nome text not null,
    imagem text,
    username varchar(30) unique not null,
    email varchar(50) unique not null,
    password text not null,
    site text,
    bio text,
    telefone text,
    genero text
);

DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
    id int not null auto_increment primary key,
    usuario_id int not null,
    created_at timestamp default now(),
    updated_at timestamp default now(),
    legenda text not null,
    foreign key (usuario_id) references usuarios (id)
);

DROP TABLE IF EXISTS comentarios;

CREATE TABLE comentarios (
    id int not null auto_increment primary key,
    post_id int not null,
    usuario_id int not null,
    created_at timestamp default now(),
    updated_at timestamp default now(),
    conteudo text not null,
    foreign key (post_id) references posts (id),
    foreign key (usuario_id) references usuarios (id)
);

DROP TABLE IF EXISTS fotos;

CREATE TABLE fotos (
    id int not null auto_increment primary key,
    post_id int not null,
    created_at timestamp default now(),
    updated_at timestamp default now(),
    imagem text not null,
    foreign key (post_id) references posts (id)
);

DROP TABLE IF EXISTS likes;

CREATE TABLE likes (
    post_id int not null,
    usuario_id int not null,
    foreign key (post_id) references posts (id),
    foreign key (usuario_id) references usuarios (id)
);