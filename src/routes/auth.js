const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require('bcrypt');

//Registrando usuario
router.post("/register", async (req,res)=>{
   
  try {
    //Encriptando a senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = await User.create({
        name: req.body.name,
        image: req.body.image,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        site: req.body.site,
        bio: req.body.bio,
        phone: req.body.phone,
        gender: req.body.gender,
      });

    res.status(200).json(user);

  } catch (error) {
        console.log(error);
  }
 
});

//Fazendo o login
router.post('/login',  async(req,res)=>{
   try {
      const user = await User.findOne({ where: {email:req.body.email}});
      const validPassword =  await bcrypt.compare(req.body.password, user.password );
   
      !user && res.status(404).json("usuario nao encontrado")
      !validPassword && res.status(400).json("Senha incorreta!");

      res.status(200).json(user)
   } catch (error) {
    res.status(500).json(error)
   }
    
})

module.exports = router
