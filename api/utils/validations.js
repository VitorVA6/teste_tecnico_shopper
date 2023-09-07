function priceMissing(price){
    if(price === '') return false
    return true
}

function priceIsValid(price){
    if(isNaN(price)) return false
    return true
}


module.exports = {
    priceMissing,
    priceIsValid,
}