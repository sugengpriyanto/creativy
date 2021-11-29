const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');

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

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'images')
    },
    filename: (req, res, cb) => {
        cb(null, req.body.filename)
    }
})

const upload = multer({storage: storage})
app.post('/upload', upload.single('file'), (req, res) => {
    res.status(200).json("Uploaded Successfully")
})

app.get('/', (req, res) => {
    res.json("HomePage")
})

app.use('/users', userRouter)
app.use('/auth', authRouter)
app.use('/products', productRouter)

app.listen(port, () => console.log(`Server running on port: ${port}`))