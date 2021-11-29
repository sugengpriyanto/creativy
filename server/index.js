const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const userRouter = require('./routes/User')
const authRouter = require('./routes/Auth')
const productRouter = require('./routes/Product')

const app = express()
dotenv.config()

app.use(cors())
app.use(express.json())

const port = process.env.PORT || 5000
const db = process.env.DB_ATLAS

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Database Connected'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.json("HomePage")
})

app.use('/users', userRouter)
app.use('/auth', authRouter)
app.use('/products', productRouter)

app.listen(port, () => console.log(`Server running on port: ${port}`))