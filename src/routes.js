const express = require('express')
const userController = require('./controllers/userController')
const commentController = require('./controllers/CommentController')
const postController = require('./controllers/postController')
const auth = require('./middleware/auth')

const routes = express();

routes.post('/register', userController.create)
routes.post('/login', userController.login)

routes.use(auth)

// Rotas autenticadas
 
//User
routes.get('/users', userController.list)
routes.get('/:username', userController.show)
routes.put('/user', userController.update)
routes.delete('/user', userController.deleteUser)

//Post
routes.get('/posts', postController.list)
routes.get('/post/:id', postController.show)
routes.post('/post', postController.create)
routes.put('/post/:id', postController.update)
routes.delete('/post/:id', postController.deletePost)

//Comment
routes.get('/comments', commentController.list)
routes.post('/comment', commentController.create)
routes.put('/comment/:id', commentController.update)
routes.delete('/comment/:id', commentController.deleteComment)


module.exports = routes