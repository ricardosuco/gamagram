
CREATE DATABASE gamagram; 

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id serial primary key,
    name text not null,
    image text,
    username text not null unique,
    email text not null unique,
    password text not null,
    site text,
    bio text,
    telephone text,
    gender text
);

DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
    id serial primary key,
    user_id int not null,
    created_at timestamp default now(),
    caption text not null,
    foreign key (user_id) references users (id)
);

DROP TABLE IF EXISTS comments;

CREATE TABLE comments (
    id serial primary key,
    post_id int not null,
    usuer_id int not null,
    created_at timestamp default now(),
    content text not null,
    foreign key (post_id) references posts (id),
    foreign key (user_id) references users (id)
);

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
    id serial primary key,
    post_id int not null,
    created_at timestamp default now(),
    image text not null,
    foreign key (post_id) references posts (id)
);

DROP TABLE IF EXISTS likes;

CREATE TABLE likes (
    post_id int not null,
    user_id int not null,
    foreign key (post_id) references posts (id),
    foreign key (user_id) references user (id)
)

