require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {SERVER_PORT} = process.env
const app = express()
const { sequelize } = require("./util/database")


app.use(express.json())
app.use(cors())

const {isAuthenticated } = require('./middleware/isAuthenticated')
const {login, register} = require('./controllers/auth')
const {getAllPosts, getCurrentUserPosts, deletePost, addPost, editPost} = require('./controllers/posts')
const {Post} = require('./models/post')
const {User} = require('./models/user')

Post.belongsTo(User)
User.hasMany(Post)


app.post(`/register`, register)
app.post(`/login`, login)

app.get(`/posts`, getAllPosts)
app.get('/userposts/:userId', getCurrentUserPosts)
app.post(`/posts`, isAuthenticated, addPost)
app.put(`/posts/:id`, isAuthenticated, editPost)
app.delete(`/posts/:id`, isAuthenticated, deletePost)





sequelize.sync().then(()=> {
    
    app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))
})
  .catch(err=> console.log(err))


