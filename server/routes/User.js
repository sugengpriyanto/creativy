const express = require('express');
const route = express.Router();
const Users = require('../models/User')
const bcrypt = require('bcrypt');

// READ - Get all users
route.get('/', async (req, res) => {
    try {
        const users = await Users.find()
        res.json(users)
    }
    catch(err) {
        res.json({message: err.message})
    }
})

// READ - Get specific user
route.get('/:id', async (req, res) => {
    try {
        const user = await Users.findById(req.params.id)
        res.json(user)
    }
    catch(err) {
        res.json({message: err.message})
    }
})

// UPDATE - specific user
route.put('/:id', async (req, res) => {
    //hash password first
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
    }

    //update
    try {
        const updatedUser = await Users.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.json(updatedUser)
    }
    catch{
        res.json({message: err.message})
    }
})

// DELETE - specific user
route.delete('/:id', async (req, res) => {
    try {
        await Users.findByIdAndDelete(req.params.id)
        res.json("User Deleted")
    }
    catch (err) {
        res.json({message: err.message})
    }
})

module.exports = route