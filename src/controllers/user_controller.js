const knexfile = require("../knexfile");
const knex = require("knex")(knexfile);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { uploadImage, deleteImage } = require("../services");

// Retorna todos os usuários cadastrados no banco de dados, exceto o usuário atual logado
// Filtra por username, name e email, se passado uma querystring com chave "search"
const listAllUsers = async (req, res) => {
  const { search } = req.query;
  const { id } = req.user;
  try {
    let users;
    if (search) {
      users = await knex("users")
        .select("name", "username", "image")
        .orWhere("name", "like", `%${search}%`)
        .andWhere("id", "!=", id)
        .orWhere("username", "like", `%${search}%`)
        .andWhere("id", "!=", id)
        .orWhere("email", "like", `%${search}%`)
        .andWhere("id", "!=", id);
    } else {
      users = await knex("users")
        .select("name", "username", "image")
        .where("id", "!=", id);
    }
    if (!users || users.length < 1) {
      return res
        .status(400)
        .json({ message: "Não foi encontrado nenhum usuário na pesquisa" });
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
    return res.status(500).json({ message: "Ocorreu um erro inesperado" + error});
  }
};

//Exibe um usuario quando passado o username no parametro, uma especie de ver perfil
const showUserByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    let user = await knex("users").where("username", username).first();
    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado" });
    }
    let posts = await knex("posts").where("user_id", user.id).innerJoin("photos", "posts.id", "photos.post_id").select("posts.*", "photos.image");
    user.posts = posts;
    const { password, ...foundUser } = user;
    return res.send(foundUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Ocorreu um erro inesperado" });
  }
};

const create = async (req, res) => {
  let { name, username, email, password, site, bio, phone, gender } =
    req.body;

  let image;

  if (req.files) {
    image = req.files.image;
  }

  if (!name) {
    return res.status(400).json({ message: "O campo nome é obrigatório" });
  } else if (!username) {
    return res.status(400).json({ message: "O username nome é obrigatório" });
  } else if (!email) {
    return res.status(400).json({ message: "O email nome é obrigatório" });
  } else if (!password) {
    return res.status(400).json({ message: "O password nome é obrigatório" });
  } else if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "A senha deve ter no mínimo 6 caracteres" });
  }

  try {
    //
    const verifyEmailAndUsername = await knex("users")
      .where("email", email)
      .orWhere("username", username)
      .first();
    if (verifyEmailAndUsername) {
      return res.status(400).json({ message: "Email ou username já existem" });
    }
    let photo = "";
    if (image) {
      let extension = image.name.split(".").pop();
      image.name = new Date().getTime() + "." + extension;
      photo = await uploadImage(image.name, image.data);
    }

    password = await bcrypt.hash(password, 10);

    const user = await knex("users").insert({
      name,
      image: photo,
      username,
      email,
      password,
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
const updateUser = async (req, res) => {
  const { id } = req.user;
  let { name, username, email, password, site, bio, phone, gender } =
    req.body;

  let image;

  if (req.files) {
    image = req.files.image;
  }

  if (!name) {
    return res.status(400).json({ message: "O campo nome é obrigatório" });
  } else if (!username) {
    return res.status(400).json({ message: "O username nome é obrigatório" });
  } else if (!email) {
    return res.status(400).json({ message: "O email nome é obrigatório" });
  } else if (password && password.length < 6) {
    return res
      .status(400)
      .json({ message: "A senha deve ter no mínimo 6 caracteres" });
  }

    //Verificar se isso é mesmo necessário ja que existe a constraints unique
  try {
    if (req.user.email !== email || req.user.username !== username) {
    const verifyEmailAndUsername = await knex("users")
      .where("email", email)
      .orWhere("username", username)
      .first();
    if (verifyEmailAndUsername) {
      if(verifyEmailAndUsername.id !== id) return res.status(400).json({ message: "Email ou username já existem" });
    }
  }

    let photo = "";
    if (image) {
      let extension = image.name.split(".").pop();
      image.name = new Date().getTime() + "." + extension;
      photo = await uploadImage(image.name, image.data);
    }

    if (password) {
      password = await bcrypt.hash(password, 10);
    }

    let userUpdated
    if (photo) userUpdated = await knex("users").where("id", id).update({name, image: photo,username,email,password,site,bio, phone, gender})
    else userUpdated = await knex("users").where("id", id).update({name, username, email, password, site, bio, phone, gender})
    if (!userUpdated) {
      return res
        .status(400)
        .json({ message: "Não foi possível atualizar o usuário" });
    }
    return res.status(200).json({ message: "Usuário atualizado com sucesso" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Ocorreu um erro inesperado" });
  }
};

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

module.exports = {
  listAllUsers,
  showUserByUsername,
  create,
  updateUser,
  deleteUser,
  login,
};
