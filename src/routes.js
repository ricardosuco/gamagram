const express = require('express')
const teste = require('./controllers/UserController')

const routes = express();

// User
routes.get('/', teste)
// routes.get('/users', UserController.list)
// routes.get('/username', UserController.show)
// routes.put('/user', UserController.update)
// routes.post('/user', UserController.create)


module.exports = routes