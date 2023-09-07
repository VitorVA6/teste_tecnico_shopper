const db = require('../config/db')

class ProductModel{

    static async getById(id){
        return new Promise(resolve => {
            db.query(`SELECT * FROM products WHERE code = ${id}`, (error, result) => {
                if(error) console.log(error)
                resolve(result)
                
            })
        })
    }

}

module.exports = ProductModel