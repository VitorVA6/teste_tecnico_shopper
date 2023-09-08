const Product = require('../controller/ProductController')
const rounter = require('express').Router()

rounter.post('/validate', Product.validate)
rounter.put('/update', Product.update)

module.exports = rounter