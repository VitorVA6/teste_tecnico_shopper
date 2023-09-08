const errs = {
    invalid_price: {
        title: 'Preço inválido',
        message: 'Preço informado não é numérico.'
    },
    code_non_exist: {
        title: 'Código não existe',
        message: 'O código passado não corresponde a nenhum produto.'
    },
    missing_price: {
        title: 'Preço não informado',
        message: 'Não foi informado o valor do novo preço.'
    },
    low_price: {
        title: 'Preço muito baixo',
        message: 'O preço de venda deve ser maior que o preço de custo.'
    },
    price_out_range: {
        title: 'Preço fora do intervalo aceito',
        message: 'O preço de reajuste não deve ser maior ou menor do que 10% do preço atual.'
    },
    missing_component_data: {
        title: 'Dados incompletos do pacote',
        message: 'É necessário adicionar ao arquivo, os dados de todos os produtos que compõem esse pacote.'
    },
    component_price_NaN: {
        title: 'Preço dos componentes não é numérico',
        message: 'O preço dos produtos que compõem esse pacote, não são numéricos ou não foram informados.'
    },
    component_price_error: {
        title: 'Preço dos componentes não bate',
        message: 'Os preços dos componentes somados, não resultam no preço do pacote.'
    }
}

module.exports = errs