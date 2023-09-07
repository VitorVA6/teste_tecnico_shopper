const Product = require('../controller/ProductController')
const rounter = require('express').Router()

rounter.post('/validate', Product.validate)

module.exports = rounter