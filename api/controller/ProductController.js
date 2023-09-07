const Product = require('../model/Product')

module.exports = class ProductController{
    static async validate(req, res){

        const products = await Product.getById(18)
        return res.status(200).json(products)
    }
}