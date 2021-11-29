const express = require('express');
const route = express.Router();
const Orders = require('../models/Order')

// CREATE - Order
route.post('/add', async (req, res) => {
    const newOrder = new Orders(req.body)

    try {
        const savedOrder = await newOrder.save()
        res.json(savedOrder)
    }
    catch(err) {
        res.json({message: err.message})
    }
})

// READ - Get all order
route.get('/', async (req, res) => {
    try {
        const order = await Orders.find()
        res.json(order)
    }
    catch(err) {
        res.json({message: err.message})
    }
})

// READ - Get specific order
route.get('/:id', async (req, res) => {
    try {
        const order = await Orders.findById(req.params.id)
        res.json(order)
    }
    catch(err) {
        res.json({message: err.message})
    }
})

// UPDATE - specific Order
route.put('/:id', async (req, res) => {
    //update
    try {
        const updatedOrder = await Orders.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.json(updatedOrder)
    }
    catch{
        res.json({message: err.message})
    }
})

// DELETE - specific Order
route.delete('/:id', async (req, res) => {
    try {
        await Orders.findByIdAndDelete(req.params.id)
        res.json("Order Deleted")
    }
    catch (err) {
        res.json({message: err.message})
    }
})

module.exports = route