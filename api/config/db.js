const mysql = require('mysql2')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'shopper'
})

db.getConnection(() => {
    console.log('Conectado ao banco shopper com sucesso.')
})

module.exports = db