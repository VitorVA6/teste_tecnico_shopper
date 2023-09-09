const mysql = require('mysql2')

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

db.getConnection(() => {
    console.log('Conectado ao banco shopper com sucesso.')
})

module.exports = db