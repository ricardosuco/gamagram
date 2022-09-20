const express = require('express')
const userController = require('./controllers/user_controller')
const commentController = require('./controllers/comment_controller')
const postController = require('./controllers/post_controller')
const likeController = require('./controllers/like_controller')
const auth = require('./middleware/auth')

const routes = express();

routes.post('/register', userController.create)
routes.post('/login', userController.login)

routes.use(auth)

// Rotas autenticadas
 
//User
routes.get('/users', userController.listAllUsers)
routes.get('/user/:username', userController.showUserByUsername)
routes.put('/user', userController.updateUser)
routes.delete('/user', userController.deleteUser)

//Post
routes.get('/posts', postController.listAllPosts)
routes.get('/post/:id', postController.showPostById)
routes.post('/post', postController.createNewPost)
routes.put('/post/:id', postController.updatePost)
routes.delete('/post/:id', postController.deletePost)

//Comment
routes.get('/comment/:post_id', commentController.listAllComments)
routes.post('/comment', commentController.createNewComment)
routes.put('/comment/:id', commentController.updateComment)
routes.delete('/comment/:id', commentController.deleteComment)

//Like
routes.post('/like/:post_id', likeController.create)
routes.delete('/like/:post_id', likeController.deleteLike)


module.exports = routes