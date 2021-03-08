const util = require("util");
const mysql = require("mySql");


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Chuck1980",
    database: "employees_db",
    port: 3306
});

connection.connect();
connection.query = util.promisify(connection.query);
module.exports = connection;