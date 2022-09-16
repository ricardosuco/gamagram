const knexfile = require("../knexfile");
const knex = require("knex")(knexfile);
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Usuário não autorizado" });
  }
  try {
    const token = authorization.replace("Bearer ", "").trim();

    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const foundUser = await knex("users").where("id", id).first();
    if (!foundUser) {
      return res.status(401).json({ message: "Usuário não autorizado" });
    }
    const { password, ...user } = foundUser;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Ocorreu um erro inesperado" });
  }
};

module.exports = auth;
