const knexfile = require("../knexfile");
const knex = require("knex")(knexfile);

const listAllComments = async (req, res) => {
  const { post_id } = req.params;

  try {
    let comments = await knex("comments")
      .select("comments.content", "users.username", "comments.id as comment_id", "comments.created_at", "comments.post_id")
      .where("comments.post_id", post_id)
      .innerJoin("users", "comments.user_id", "users.id");
    if (!comments || comments.length < 1) {
      return res
        .status(400)
        .json({ message: "Nenhum comentário encontrado para este post" });
    }
    return res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Ocorreu um erro inesperado" });
  }
};

const createNewComment = async (req, res) => {
  const { id } = req.user;
  const { content, post_id } = req.body;

  try {
    const foundPost = await knex("posts").where("id", post_id).first();
    if (!foundPost) {
        return res.status(400).json({ message: "Impossível comentar post inexistente" });
    }
    const comment = await knex("comments").insert({
      content,
      post_id,
      user_id: id,
    });
    if (!comment) {
    return res.status(400).json({ message: "Erro ao criar comentário" });
    }
    return res.status(201).json({ message: "Comentário criado com sucesso" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Ocorreu um erro inesperado" });
  }
};
const updateComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const user_id = req.user.id;

  try {
    const comment = await knex("comments")
      .where("id", id)
      .andWhere("user_id", user_id)
      .update({ content }).debug();
    if (!comment) {
      return res.status(400).json({ message: "Erro ao atualizar comentário! Comentário não encontrado." });
    }
    return res
      .status(201)
      .json({ message: "Comentário atualizado com sucesso" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Ocorreu um erro inesperado" });
  }
};
const deleteComment = async (req, res) => {
  const { id } = req.params
  const user_id = req.user.id

  try {
    const deletedComment = await knex("comments").where("id", id).andWhere("user_id", user_id).del();
    if (!deletedComment) {
      return res
        .status(400)
        .json({ message: "Não foi possível deletar este comentário" });
    }
      return res.status(200).json({message: "Comentário deletado com sucesso"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Ocorreu um erro inesperado" });
  }
};

module.exports = {
  listAllComments,
  createNewComment,
  updateComment,
  deleteComment,
};
