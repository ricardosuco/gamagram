/* const router = require('express').Router();
const Post = require('../models/Posts');
const User = require('../models/User');


//listar todos os posts
router.get('/', async(req,res)=>{
    const posts =  await Post.findAll();
   res.status(200).json(posts)
})

//criar um post
router.post('/', async (req,res)=>{
    const newPost = new Post(req.body)
    try {
        console.log(newPost);
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }

})

//atualizar post
router.put('/:id', async (req,res)=>{
 try {
    const post =  await Post.findByPk(req.params.id);
    
    if(post.user_id == req.body.user_id){
        var data = req.body;
        await  post.set(data);
        await post.save();
        res.status(200).json("Post atualizado")
    } else{
        res.status(403).json("Você só pode atualizar o seu próprio post")
    }
 } catch (error) {
    res.status(500).json(error)
 }
})

//deletar um post
router.delete('/:id', async (req,res)=>{
    try {
        const post =  await Post.findByPk(req.params.id);
        
        if(post.user_id == req.body.user_id){
            const post = await Post.destroy({where:{id:req.params.id}})
            res.status(200).json("Post deletado")
        } else{
            res.status(403).json("Você só pode deletar o seu próprio post")
        }
     } catch (error) {
        res.status(500).json(error)
     }
 })

 //listar 1 post
 router.get('/:id', async (req,res)=>{
   try {
        const post =  await Post.findByPk(req.params.id);
        res.status(200).json(post)

   } catch (error) {
     res.status(500).json(error)
   }

})

 //dar like em um post


module.exports = router; */