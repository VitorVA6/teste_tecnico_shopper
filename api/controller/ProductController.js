const Product = require('../model/Product')
const {priceMissing, priceIsValid, codeMissing, codeIsValid} = require('../utils/validations')
const errs = require('../utils/errors')

module.exports = class ProductController{

    static async validate(req, res){
        
        const {csvData} = req.body
        let validations = csvData.map(el => ({...el, name: 'not found', current_price: 'not found', errors: []}))

        if(!csvData) return res.status(400).json({error: 'Arquivo inválido'})

        if(csvData.length===0) return res.status(400).json({error: 'Arquivo não possui nenhum dado'})

        if(csvData[0].product_code===undefined || csvData[0].new_price===undefined){
            return res.status(400).json({error: 'Arquivo não possui os campos necessários'})
        }

        for (let i = 0; i < validations.length; i++) {

            if(!priceMissing(validations[i].new_price)) validations[i].errors = [...validations[i].errors, errs.missing_price]
            else if(!priceIsValid(validations[i].new_price)) validations[i].errors = [...validations[i].errors, errs.invalid_price]

            const result = await Product.getById(validations[i].product_code)

            if(result.length === 0) validations[i].errors = [...validations[i].errors, errs.code_non_exist]
            else{
                const product = result[0]
                validations[i].current_price = product.sales_price
                validations[i].name = product.name
                if(validations[i].errors.length === 0){
                    let cost_price = parseFloat(product.cost_price)
                    let new_price = parseFloat(validations[i].new_price)
                    let sales_price = parseFloat(product.sales_price)

                    if( cost_price > new_price) validations[i].errors = [...validations[i].errors, errs.low_price]
                    if((new_price > sales_price*1.1) || (new_price < sales_price*0.9)) validations[i].errors = [...validations[i].errors, errs.price_out_range] 
                    
                    const packInfo = await Product.getPackById(validations[i].product_code)

                    if(packInfo.length > 0){
                        const productExist = csvData.find(el => el.product_code == packInfo[0].product_id)
                        if(productExist){
                            if(isNaN(productExist.new_price)||productExist.new_price==='') validations[i].errors=[...validations[i].errors, errs.component_price_NaN]
                            else if(parseFloat(productExist.new_price)*parseInt(packInfo[0].qty) !== new_price) {
                                validations[i].errors=[...validations[i].errors, errs.component_price_error]
                            }
                        }else{
                            validations[i].errors = [...validations[i].errors, errs.missing_component_data]
                        }
                    }
                }
            }
        }
        return res.status(200).json(validations)
    }

    static async update(req, res){
        res.status(200).json({message: 'Produtos atualizados com sucesso'})
    }
}