const util = require("util");
const mySql = require("mySql");


const conection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Chuck1980",
    database: "employees_db"
});

connection.connect();
connection.query = util.promisify(connection.query);
module.exports = connection;