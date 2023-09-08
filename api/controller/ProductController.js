const Product = require('../model/Product')
const {priceMissing, priceIsValid, codeMissing, codeIsValid} = require('../utils/validations')
const errs = require('../utils/errors')

module.exports = class ProductController{

    static async validate(req, res){
        let validations = []

        const {csvData} = req.body

        if(!csvData) return res.status(400).json({error: 'Arquivo inválido'})

        if(csvData.length===0) return res.status(400).json({error: 'Arquivo não possui nenhum dado'})

        if(csvData[0].product_code===undefined || csvData[0].new_price===undefined){
            return res.status(400).json({error: 'Arquivo não possui os campos necessários'})
        }

        csvData.forEach(async element => {
            let errors = []

            if(!priceMissing(element.new_price)) errors = [...errors, errs.missing_price]
            else if(!priceIsValid(element.new_price)) errors = [...errors, errs.invalid_price]

            const result = await Product.getById(element.product_code)

            if(result.length === 0) errors = [...errors, errs.code_non_exist]
            else{
                const product = result[0]
                if(errors.length === 0){
                    let cost_price = parseFloat(product.cost_price)
                    let new_price = parseFloat(element.new_price)
                    let sales_price = parseFloat(product.sales_price)

                    if( cost_price > new_price) errors = [...errors, errs.low_price]
                    if((new_price > sales_price*1.1) || (new_price < sales_price*0.9)) errors = [...errors, errs.price_out_range] 
                    
                    const packInfo = await Product.getPackById(element.product_code)

                    if(packInfo.length > 0){
                        const productExist = csvData.find(el => el.product_code == packInfo[0].product_id)
                        if(productExist){
                            if(isNaN(productExist.new_price)||productExist.new_price==='') errors=[...errors, errs.component_price_NaN]
                            else if(parseFloat(productExist.new_price)*parseInt(packInfo[0].qty) !== new_price) {
                                errors=[...errors, errs.component_price_error]
                            }
                        }else{
                            errors = [...errors, errs.missing_component_data]
                        }
                    }
                }
            }
            console.log(element.product_code, errors)
        });
        
        return res.status(200).json({message: 'Chegou miseravi'})
    }

    static async update(req, res){
        res.status(200).json({message: 'Produtos atualizados com sucesso'})
    }
}