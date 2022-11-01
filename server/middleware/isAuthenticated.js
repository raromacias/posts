require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env

module.exports = {
    isAuthenticated: (req, res, next) => {
        //This variable looks for Authorization in the request
        const headerToken = req.get('Authorization')

        if (!headerToken) {
            //If there is no authorization then an error is sent back 
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }
        //initializing the variable token
        let token


        try {
            //this line refers to the secret token that each user gets to get access to the app
            token = jwt.verify(headerToken, SECRET)
           // Headertoken is the JSONWeb Token string and Secret fetches the secret which decodes the string if valid
        } catch (err) {
            err.statusCode = 500
            throw err
        }

        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        next()
    }
}