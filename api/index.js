require('dotenv').config()
const express = require('express')
const cors = require('cors')
const productRoutes = require('./routes/ProductRoutes')
const app = express()
const db = require('./config/db')

const port = 4000

app.use(cors({
    credentials: true,
    origin: process.env.APP_URL
  }));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/products', productRoutes)

app.listen(port)