const express = require('express');
const route = express.Router();
const Products = require('../models/Product')

// CREATE - product
route.post('/add', async (req, res) => {
    const newProduct = new Products({
        title: req.body.title,
        description: req.body.description,
        userId: req.body.userId
    })

    try {
        const savedProduct = await newProduct.save()
        res.json(savedProduct)
    }
    catch(err) {
        res.json({message: err.message})
    }
})

// READ - Get all products
route.get('/', async (req, res) => {
    try {
        const products = await Products.find()
        res.json(products)
    }
    catch(err) {
        res.json({message: err.message})
    }
})

// READ - Get specific product
route.get('/:id', async (req, res) => {
    try {
        const product = await Products.findById(req.params.id)
        res.json(product)
    }
    catch(err) {
        res.json({message: err.message})
    }
})

// UPDATE - specific product
route.put('/:id', async (req, res) => {
    //update
    try {
        const updatedProduct = await Products.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.json(updatedProduct)
    }
    catch{
        res.json({message: err.message})
    }
})

// DELETE - specific Product
route.delete('/:id', async (req, res) => {
    try {
        await Products.findByIdAndDelete(req.params.id)
        res.json("Product Deleted")
    }
    catch (err) {
        res.json({message: err.message})
    }
})

module.exports = route