require('dotenv').config()
const {SECRET} = process.env
const {User} = require('../models/user')
const bcrypt = require(`bcryptjs`)
const jwt = require('jsonwebtoken')

const createToken = (username, id) => {
          return jwt.sign({username, id}, SECRET, {expiresIn: '2 days'})
}

module.exports = {



 
login: (req,res) => {
         console.log('logged in')
      },

logout: (req, res) => {
    console.log('logged out')
},

register: async (req, res) => {
    try {
       const {username, password} = req.body
       const foundUser = await User.findOne({where: {username:username}})
       if(foundUser){
        res.status(400).send("User already exists")
       } else {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const newUser = await User.create({username:username, hashedPass: hash})
        const token = createToken(newUser.dataValues.username,newUser.dataValues.id)
        console.log(newUser)
        const exp = Date.now() + 1000 * 60 * 60 * 48
        res.status(200).send({username:newUser.dataValues.username, userId:newUser.dataValues.id, token: token, exp:exp})
       }
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}
}

