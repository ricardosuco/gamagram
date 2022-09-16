const knexfile = require("../knexfile");
const knex = require("knex")(knexfile);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { uploadImage, deleteImage } = require('../services');

const list = async (req, res) => {
  const { search } = req.query;
  try {
    let users
    if (search) {
      users = await knex("users").select("name", "username", "image")
        .where("name", "like", `%${search}%`)
        .orWhere("username", "like", `%${search}%`)
        .orWhere("email", "like", `%${search}%`);
    } else {
      users = await knex("users").select("name", "username", "image");
    }
    res.send(users);
  } catch (error) {
    res.status(500).json({ message: "Ocorreu um erro inesperado" });
    console.log(error);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username.trim() || !password.trim())
    res.status(400).json({ message: "O email é obrigatório" });

  try {
    const foundUser = await knex("users")
      .where("email", username)
      .orWhere("username", username)
      .first();
    if (!foundUser) {
      return res.status(400).json({ message: "Email ou senha inválido" });
    }

    const verifyPassword = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );
    if (!verifyPassword) {
      return res.status(400).json({ message: "Email ou senha inválido" });
    }

    const token = jwt.sign({ id: foundUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const { password, ...user } = foundUser;
    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocorreu um erro inesperado" });
  }
};

const show = async (req, res) => {
  const { username } = req.params;
  try {
    let user = await knex("users")
      .where("email", username)
      .orWhere("username", username)
      .first();
    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado" });
    }
    const { password, ...foundUser } = user;
    res.send(foundUser);
  } catch (error) {
    res.status(500).json({ message: "Ocorreu um erro inesperado" });
    console.log(error);
  }
};

const create = async (req, res) => {
  const { name, image, username, email, password, site, bio, phone, gender } =
    req.body;

  if (!name.trim()){
    return  res.status(400).json({ message: "O campo nome é obrigatório" });
  } else if (!username.trim()){
    return res.status(400).json({ message: "O usename nome é obrigatório" });
  } else if (!email.trim()){
    return res.status(400).json({ message: "O email nome é obrigatório" });
  } else if (!password.trim()){
    return res.status(400).json({ message: "O password nome é obrigatório" });
  } else if (password.trim().length <  6 ){
    return res.status(400).json({ message: "A senha deve ter no mínimo 6 caracteres" });
  }

  try {
    //
    const verifyEmailAndUsername = await knex("users")
      .where("email", email)
      .orWhere("username", username)
      .first();
    if (verifyEmailAndUsername) {
      return res
        .status(400)
        .json({ message: "Email ou username já existem" });
    }

    const encriptedPassword = await bcrypt.hash(password, 10);

    const user = await knex("users").insert({
      name,
      image,
      username,
      email,
      password: encriptedPassword,
      site,
      bio,
      phone,
      gender,
    });

    return res.status(201).json({ message: "Usuário cadastrado com sucesso" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Ocorreu um erro inesperado" });
  }
};
const update = async (req, res) => {};

const deleteUser = async (req, res) => {
  const { id } = req.user;

  try {
    const deletedUser = await knex("users").where("id", id).del();
    if (!deletedUser) {
      return res
        .status(400)
        .json({ message: "Não foi possível deletar este usuário" });
    }

    return res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Ocorreu um erro inesperado" });
  }
};

module.exports = { list, show, create, update, deleteUser, login };
