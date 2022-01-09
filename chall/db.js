const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'zzlol',
    database: 'babycsp'
});

connection.connect((err) => {
    if (err) throw err;
})

module.exports = connection;