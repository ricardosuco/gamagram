const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt')

router.get("/", (req,res)=>{
    res.send("oi usuario root")
})

/* 
 //atualizar usuario
 router.put('/:id', async (req,res)=>{
    if(req.body.id === req.params.id || req.user.isAdmin){
        if(req.body.password){
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt )
            } catch (error) {
                return res.status(500).json(err)
            }
        }

        try {
            const user = await User.findUser
        } catch (error) {
            
        }

    }else {
        return res.status(403).json("Você só pode atualizar a sua conta");
    }

  

 }) */
module.exports = router