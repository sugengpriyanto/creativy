const express = require('express');
const route = express.Router();
const bcrypt = require('bcrypt');
const Users = require('../models/User');
const jwt = require('jsonwebtoken')

//Register
route.post('/register', async (req, res) => {
    //check if username exist
    const usernameExist = await Users.findOne({username: req.body.username})
    if(usernameExist) return res.json("Username already used")

    //check if email exist
    const emailExist = await Users.findOne({email: req.body.email})
    if(emailExist) return res.json("Email already used")

    //if email does not exist, hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //create new user
    const newUser = new Users({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    })

    try {
        const savedUser = await newUser.save()
        res.json(savedUser)
    }
    catch(err) {
        res.json({message: err.message})
    }
})

//Login
route.post('/login', async (req, res) => {
    //check if email does not exist
    const user = await Users.findOne({email: req.body.email})
    if(!user) return res.json("Email does not exist")

    //decrypt password
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.json("Password incorrect")

    //create token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token').json(token)
})

module.exports = route