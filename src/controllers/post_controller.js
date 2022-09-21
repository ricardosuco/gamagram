const knexfile = require("../knexfile");
const knex = require("knex")(knexfile);
const { uploadImage, deleteImage } = require("../services");

//TODO: Inserir quantidade de comentarios e quantidade de curtidas por postagem (criar rotina que conta comentarios e curtidas)

// Retorna todos os posts cadastrados no banco de dados, exceto do usuario atual. Este é o "feed"
const listAllPosts = async (req, res) => {
    const { id } = req.user

    try {
        let posts = await knex("posts")
            .select("users.id as user_id", "posts.id as post_id", "posts.caption", "posts.created_at", "users.username", "users.image as profile_image", "likes.id as like")
            .where("posts.user_id", "!=", id)
            .innerJoin("users", "users.id", "posts.user_id")
            .leftJoin("likes", "posts.id", "likes.post_id")
            .orderBy("created_at", "desc")
        if (!posts || posts.length < 1) {
            return res.status(400).json({ message: "Nenhum post encontrado" });
        }

        let photos = await knex("photos")
        let arrPosts = []
        let comments = await knex("comments")
        .select("comments.content", "users.username", "comments.user_id", "comments.id as comment_id", "comments.created_at", "comments.post_id")
        .innerJoin("users", "users.id", "comments.user_id")
        let likes = await knex("likes")
        posts.forEach(async (post) =>{
            let arrPhotos = []
            photos.forEach((photo) =>{
                if (post.post_id === photo.post_id){
                    arrPhotos.push(photo.image)
                }
            })
            let arrComments = [] 
            comments.forEach((comment) => {
                if (post.post_id === comment.post_id){
                    let objComment = {
                        content: comment.content,
                        username: comment.username,
                        user_id: comment.user_id,
                        comment_id: comment.comment_id,
                        created_at: comment.created_at
                    }
                    arrComments.push(objComment)
                }
            })

            // let like = await knex("likes").where({user_id: id}).andWhere({post_id: post.post_id}).first()
            // console.log(like)
            // like ? post.like = true : post.like = false
            post.like ? post.like = true : post.like = false
            post.comments = arrComments
            post.image = arrPhotos
            arrPosts.push(post)
        })
        return res.status(200).json(arrPosts)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Ocorreu um erro inesperado" });
    }
        
};

//Retorna post referente ao id passado por parametro junto com todos os comentarios e likes
const showPostById = async (req, res) => {
    const user_id = req.user.id;
    const { id } = req.params

    try {
        let posts = await knex("posts").where("posts.id", id)
            .select("posts.id as post_id", "users.id as user_id", "posts.caption", "posts.created_at", "users.username", "photos.image")
            .innerJoin("photos", "posts.id", "photos.post_id")
            .innerJoin("users", "posts.user_id", "users.id")
            console.log(posts)
        let comments = await knex("comments")
            .select("comments.content", "users.username", "comments.user_id", "comments.id as comment_id", "comments.created_at")
            .where("comments.post_id", id)
            .innerJoin("users", "comments.user_id", "users.id")
        if (!posts || posts.length < 1) {
            return res.status(400).json({ message: "Post não encontrado" });
        } 
        if (posts.length > 1) {
            let arrPhotos = [];
            posts.forEach(async (item) => {
                arrPhotos.push({
                    image: item.image
                })
            let like = await knex("likes").where({user_id}).andWhere({post_id: id}).first()
            like ? item.like = true : item.like = false
            })
            posts[0].image = arrPhotos;
        }
        let like = await knex("likes").where({user_id}).andWhere({post_id: id}).first()
        like ? posts[0].like = true : posts[0].like = false
        posts[0].comments = comments;
        return res.status(200).json(posts[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Ocorreu um erro inesperado" });
    }
};

const createNewPost = async (req, res) => {

  //Verifica se existe imagem na request
  if (!req.files) {
        return res.status(400).json({ message: "Imagem é obrigatória" });
  }
  const { caption } = req.body;
  const { image } = req.files;
  const { id } = req.user;

  let trx
  try {
      //Instancia o db com transaction para reverter alteração caso ocorra erro
    trx = await knex.transaction();
    let [post_id] = await knex("posts").transacting(trx).insert({caption, user_id: id}).returning('id');
    if (!post_id) {
      return res.status(400).json({ message: "Erro ao criar post" });
    }
    if (image.length > 1) {
        let arrImages = [];
        image.forEach(async (item) => {
            let extension = item.name.split(".").pop();
            if (extension.toLowerCase() !== "jpg" && extension.toLowerCase() !== "png") {
                trx.rollback();
                return res.status(400).json({ message: "Formato de imagem inválido" });
            }
            item.name = new Date().getTime() + "." + extension
            arrImages.push({
                image: process.env.AWS_BUCKET_URL + item.name,
                post_id: post_id.id || post_id
            })
            let photo = await uploadImage(item.name, item.data)
        })
        let insertedPhotos = await knex("photos").transacting(trx).insert(arrImages)
        if (!insertedPhotos) {
            trx.rollback();
            return res.status(400).json({ message: "Erro ao criar post" });
        }
        trx.commit();
        return res.status(200).json({message: "Post criado com sucesso"})
    }

    //Valida extensão da imagem
    let extension = image.name.split(".").pop();
    if (extension.toLowerCase() !== "jpg" && extension.toLowerCase() !== "png") {
        trx.rollback();
        return res.status(400).json({ message: "Formato de imagem inválido" });
    }

    //Renomeia a imagem para o timestamp atual
    image.name = new Date().getTime() + "." + extension;
    let photo = await uploadImage(image.name, image.data);
    console.log(post_id.id)
    let insertedPhoto = await knex("photos").transacting(trx).insert({image: photo, post_id: post_id.id || post_id});
    if (!insertedPhoto) {
        trx.rollback();
        return res.status(400).json({message: "Erro ao criar post"})
    }
    trx.commit();
    return res.status(201).json({message: "Post criado com sucesso!"});
  } catch (error) {
    trx.rollback();
    console.log(error);
    return res.status(500).json({ message: "Ocorreu um erro inesperado" });
  }
};

//Atualiza post do usuario logado a partir do id post
const updatePost = async (req, res) => {
    const { id } = req.params
    const user_id = req.user.id
    const { caption } = req.body

    try {
        let updatedPost = await knex("posts").where("id", id).andWhere("user_id", user_id).update({caption})
        if (!updatedPost) {
            return res.status(400).json({message: "Erro ao atualizar post"})
        } 
            return res.status(200).json({message: "Post atualizado com sucesso"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Ocorreu um erro inesperado" });
    }
        
}

//Deleta post do usuario logado a partir do id do post
const deletePost = async (req, res) => {
    const { id } = req.params
    const user_id = req.user.id

    try {
        let deletedPost = await knex("posts").select("image", "posts.id").innerJoin("photos", "posts.id", "photos.post_id").where("posts.id", id).andWhere("posts.user_id", user_id)
        if (!deletedPost || deletedPost.length < 1) {
            return res.status(400).json({ message: "Post não encontrado" });
        }
            deletedPost.forEach(async (item) => {
                let name = item.image.split("/").pop()
                await deleteImage(name)
                await knex("posts").where("id", item.id).del()
            })
            return res.status(200).json({message: "Post deletado com sucesso"})
    } catch(error) {
        console.log(error)
        return res.status(500).json({ message: "Ocorreu um erro inesperado" });
    }
};

module.exports = { listAllPosts, showPostById, createNewPost, updatePost, deletePost };
