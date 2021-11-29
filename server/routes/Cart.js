const express = require('express');
const route = express.Router();
const Carts = require('../models/Cart')

// CREATE - Cart
route.post('/add', async (req, res) => {
    const newCart = new Carts(req.body)

    try {
        const savedCart = await newCart.save()
        res.json(savedCart)
    }
    catch(err) {
        res.json({message: err.message})
    }
})

// READ - Get all cart
route.get('/', async (req, res) => {
    try {
        const cart = await Carts.find()
        res.json(cart)
    }
    catch(err) {
        res.json({message: err.message})
    }
})

// READ - Get specific cart
route.get('/:id', async (req, res) => {
    try {
        const cart = await Carts.findById(req.params.id)
        res.json(cart)
    }
    catch(err) {
        res.json({message: err.message})
    }
})

// UPDATE - specific Cart
route.put('/:id', async (req, res) => {
    //update
    try {
        const updatedCart = await Carts.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.json(updatedCart)
    }
    catch{
        res.json({message: err.message})
    }
})

// DELETE - specific Cart
route.delete('/:id', async (req, res) => {
    try {
        await Carts.findByIdAndDelete(req.params.id)
        res.json("Cart Deleted")
    }
    catch (err) {
        res.json({message: err.message})
    }
})

module.exports = route