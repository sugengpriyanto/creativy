const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.header('auth-token')
    if(!token) return res.json("You are not authenticated")

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    }
    catch(err) {
        res.json({message: err.message})
    }
}

module.exports = auth;