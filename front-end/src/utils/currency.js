function currency(value){
    if(isNaN(value)) return value
    if( value === '') return '_'
    const num = parseFloat(value).toFixed(2)
    return parseFloat(num).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default currency