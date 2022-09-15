const Sequelize = require('sequelize')
const db = require ('../db')


const Post = db.define('post', {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey:true
    },
    user_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references: {
            model: 'users', // 'users' refers to table name
            key: 'id', // 'id' refers to column name in users table
        }
    },
    image:{
        type:Sequelize.STRING(255),
        
    },
    caption: {
        type:Sequelize.STRING(255),
        allowNull:true
    },
   
})


module.exports = Post;