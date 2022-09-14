const express = require('express')
// const teste = require('./controllers/UserController')
const { list, show, create, teste, update, deleteUser, login } = require('./controllers/UserController')

const routes = express();

// User
routes.get('/', teste)
// routes.get('/users', UserController.list)
// routes.get('/username', UserController.show)
// routes.put('/user', UserController.update)
routes.post('/register', create)
routes.post('/login', login)


module.exports = routes