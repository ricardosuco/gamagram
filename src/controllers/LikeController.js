const knexfile = require("../knexfile");
const knex = require("knex")(knexfile);

const create = async (req, res) => {
    const { id: user_id } = req.user
    const { post_id } = req.params

        const like = await knex("likes").insert({user_id, post_id})
        if (!like) {
            return res.status(400).json({message: "Não foi possível dar like no post"})
        }
        try {
        return res.status(200).json({message: "ok"})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Ocorreu um erro inesperado"})
    }
 };



module.exports = { create };
