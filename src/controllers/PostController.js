const knexfile = require("../knexfile");
const knex = require("knex")(knexfile);
const { uploadImage, deleteImage } = require("../services");

//Aqui terá toda a regra de negocio que envolve o upload das imagens e a listagem de comentarios.
// Os comentarios devem ser retornados junto a cada post

//TODO: Concluir a regra de negocio do list e do show; Criar a rotina de update

const list = async (req, res) => {
    const { id } = req.user

    try {
        let posts = await knex("posts").where("user_id", "!=", id).orderBy("created_at", "desc")
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Ocorreu um erro inesperado" });
    }
        
};

const show = async (req, res) => {
    const { id } = req.user

    try {
        let posts = await knex("posts").where("user_id", id).innerJoin("photos", "posts.id", "photos.post_id")
        if (!posts) {
            return res.status(400).json({ message: "Não há posts deste usuário" });
        } 
        return res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Ocorreu um erro inesperado" });
    }
};

const create = async (req, res) => {

  //Verifica se existe imagem na request
  if (!req.files) {
        return res.status(400).json({ message: "Imagem é obrigatória" });
  }
  const { caption } = req.body;
  const { image } = req.files;
  const { id } = req.user;

  try {
    //Instancia o db com transaction para reverter alteração caso dê erro
    await knex.transaction(async (trx) => {
    const [post_id] = await trx("posts").insert({caption, user_id: id});
    if (!post_id) {
      return res.status(400).json({ message: "Erro ao criar post" });
    }
    if (image.length > 1) {
        let arrImages = [];
        image.forEach(async (item) => {
            let extension = item.name.split(".").pop();
            if (extension.toLowerCase() !== "jpg" && extension.toLowerCase() !== "png") {
                return res.status(400).json({ message: "Formato de imagem inválido" });
            }
            item.name = new Date().getTime() + "." + extension
            arrImages.push({
                image: process.env.AWS_BUCKET_URL + item.name,
                post_id
            })
            let photo = await uploadImage(item.name, item.data)
        })
        let insertedPhotos = await trx("photos").insert(arrImages)
        if (!insertedPhotos) {
            return res.status(400).json({ message: "Erro ao criar post" });
        }
        return res.status(200).json({message: "Post criado com sucesso"})
    }

    //Valida extensão da imagem
    let extension = image.name.split(".").pop();
    if (extension.toLowerCase() !== "jpg" && extension.toLowerCase() !== "png") {
        return res.status(400).json({ message: "Formato de imagem inválido" });
    }

    //Renomeia a imagem para o timestamp atual
    image.name = new Date().getTime() + "." + extension;
    let photo = await uploadImage(image.name, image.data);
    
    let insertedPhoto = await trx("photos").insert({image: photo, post_id})
    if (!insertedPhoto) {
        return res.status(400).json({message: "Erro ao criar post"})
    }
    return res.status(201).json({message: "Post criado com sucesso!"});
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Ocorreu um erro inesperado" });
  }
};

const update = async (req, res) => {
    //Criar rota para atualizar post
};

const deletePost = async (req, res) => {
    const { id } = req.params
    const user_id = req.user.id

    try {
        let deletedPost = await knex("posts").where({id, user_id}).del()
        if (!deletedPost) {
            return res.status(401).json({message: "Erro ao deletar post"})
        }
    
        return res.status(200).json({message: "Post deletado com sucesso"})
    } catch(error) {
        console.log(error)
        return res.status(500).json({ message: "Ocorreu um erro inesperado" });
    }
};

module.exports = { list, show, create, update, deletePost };
