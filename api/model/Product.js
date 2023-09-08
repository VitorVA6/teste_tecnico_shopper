const db = require('../config/db')

class ProductModel{

    static async getById(id){
        return new Promise(resolve => {
            db.query(`SELECT * FROM products WHERE code = '${id}'`, (error, result) => {
                if(error) console.log(error)
                resolve(result)
                
            })
        })
    }

    static async getPackById(id){
        return new Promise(resolve => {
            db.query(`SELECT * FROM packs WHERE pack_id = '${id}'`, (error, result) => {
                if(error) console.log(error)
                resolve(result)
            })
        })
    }

    static async updateProduct(id, price){
        return new Promise(resolve => {
            db.query(`UPDATE products SET sales_price = '${price}' WHERE code = '${id}'`, (error) => {
                if(error) console.log(error)
                resolve()
            })
        })
    }

    static async updatePack(id, price, costPrice){
        return new Promise(resolve => {
            db.query(`UPDATE products SET sales_price = '${price}', cost_price = '${costPrice}' WHERE code = '${id}'`, (error) => {
                if(error) console.log(error)
                resolve()
            })
        })
    }

}

module.exports = ProductModel