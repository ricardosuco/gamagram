const Sequelize = require('sequelize')
const db = require ('../db')
const Post = require('./Posts')

const User = db.define('user', {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING(50),
        allowNull:false
    },

    image: {
        type:Sequelize.STRING(255),
        allowNull:true
    },
    username:{
        type:Sequelize.STRING(50),
        allowNull:false,
        unique: true
    },
    email:{
        type: Sequelize.STRING(50),
        allowNull:false,
        unique: true
    },
    password:{
        type: Sequelize.STRING(100),
        allowNull:false,
    },
    site:{
        type: Sequelize.STRING(100),
        allowNull:true
    },
    bio:{
        type: Sequelize.STRING(255),
        allowNull:true
    },
    phone:{
        type: Sequelize.STRING(15),
        allowNull:true
    },
    gender:{
        type:Sequelize.CHAR(1)
    }
    
})

User.hasMany(Post);

module.exports = User;