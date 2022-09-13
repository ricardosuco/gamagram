const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require('bcrypt');
const { json } = require('express');

//Registrando usuario
router.post("/register", async (req,res)=>{
   
  try {
    //Encriptando a senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = await User.newUser({
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
      const user = await User.findUser({email:req.body.email});
      user != '[object Object]' && res.status(404).send("Usuário não foi encontrado! ");
      // console.log(req.body.password+ user.shift().password);

      const validPassword =  await bcrypt.compare(req.body.password, user.shift().password )
      !validPassword && res.status(400).json("Senha incorreta!");
      validPassword && res.status(200).json(await User.findUser({email:req.body.email}))
 

   } catch (error) {
    res.status(500).json(error)
   }
    
})

module.exports = router
