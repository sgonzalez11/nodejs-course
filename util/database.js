const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodecourse',
    password: 'Lucecita0510'
});

module.exports = pool.promise();
