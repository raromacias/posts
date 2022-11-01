require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {PORT} = process.env
const app = express()

app.use(express.json())
app.use(cors())

const {isAuthenticated } = require('./middleware/isAuthenticated')
const {login, logout, register} = require('./controllers/auth')
const {getAllPosts, getCurrentUserPosts, deletePost, addPost, editPost} = require('./controllers/posts')

app.post(`/register`, register)
app.post(`/login`, login)
app.post(`/logout`, logout)
app.get(`/posts`, getAllPosts)
app.get('userposts/:userId', getCurrentUserPosts)
app.post(`/posts`, isAuthenticated, addPost)
app.put(`/posts/:id`, isAuthenticated, editPost)
app.delete(`/posts/:id`, isAuthenticated, deletePost)









app.listen(PORT, () => console.log(`up on ${PORT}`))