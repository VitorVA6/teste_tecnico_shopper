const Product = require('../controller/ProductController')
const rounter = require('express').Router()

rounter.get('/validate', Product.validate)

module.exports = rounter