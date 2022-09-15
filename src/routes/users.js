const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt')

/* router.get("/", (req,res)=>{
    res.send("oi usuario root")
})

 //atualizar usuario
 router.put('/:id', async (req,res)=>{
    console.log(req.body.id);
    if(req.body.id == req.params.id ){
        if(req.body.password){
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt )
            } catch (error) {
                return res.status(500).json(error)
            }
        }

        try {
            const user = await User.findByPk(req.params.id)
            var data = req.body;
            await  user.set(data);
            await user.save();
            res.status(200).json("Conta atualizada!")
        } catch (error) {
            return res.status(500).json(error);
        }

    }else {
        return res.status(403).json("Você só pode atualizar a sua conta");
    }

 })

 //Deletar um usuario
 router.delete('/:id', async (req,res)=>{
    if(req.body.id == req.params.id || req.body.isAdmin){
        try {
            const user = await User.destroy({where:{id:req.params.id}})
            res.status(200).json("Conta foi deletada!")
        } catch (error) {
            return res.status(500).json(error);
        }

    }else {
        return res.status(403).json("Você só pode deletar a sua conta");
    }

 })

//Selecionar um usuario
router.get("/:id", async (req,res)=>{
    try {
        const user = await User.findByPk(req.params.id);
        //não mostrar campos sensíveis
        const {password, updatedAt, createdAt, ...other} = user.toJSON() 
        res.status(200).json(other)

    } catch (error) {
        res.status(500).json(error)
    }
})
 */
module.exports = router