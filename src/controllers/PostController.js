const knexfile = require("../knexfile");
const knex = require("knex")(knexfile);
const { uploadImage, deleteImage } = require("../services");

//Aqui terá toda a regra de negocio que envolve o upload das imagens e a listagem de comentarios.
// Os comentarios devem ser retornados junto a cada post

const list = async (req, res) => {};

const show = async (req, res) => {};

const create = async (req, res) => {
    if (!req.files) {
      return res.status(400).json({ message: "Imagem é obrigatória" });
    }
  const { caption } = req.body;
  const { image } = req.files;
  const { id } = req.user;
  try {
    await knex.transaction(async (trx) => {
    const [post_id] = await trx("posts").insert({caption: "Teste", user_id: id});
    if (!post_id) {
      return res.status(400).json({ message: "Erro ao criar post" });
    }
    if (image.length > 1) {
        let arrUrlImages = [];
        image.forEach(async (item) => {
            let extension = item.name.split(".").pop();
            item.name = new Date().getTime() + "." + extension
            let photo = await uploadImage(item.name, item.data)
            console.log(photo)
            arrUrlImages.push(photo)
        })
        console.log(arrUrlImages)
        return res.status(200).json(arrUrlImages)
    }
    let extension = image.name.split(".").pop();
    image.name = new Date().getTime() + "." + extension;
    let photo = await uploadImage(image.name, image.data);
    console.log(photo)

    return res.status(201).json(post_id);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Ocorreu um erro inesperado" });
  }
};

const update = async (req, res) => {};

const deletePost = async (req, res) => {};

module.exports = { list, show, create, update, deletePost };
