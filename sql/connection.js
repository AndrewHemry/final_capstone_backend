let mysql = require("mysql")

let connection = mysql.createConnection({
    "user": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "database": process.env.DB_NAME,
})

pool.query("select now()", function(err, results){
    if(err){
        console.log("Failed to Connect", err)
    } else {
        console.log("Connected to Database", results)
    }
})

module.exports = pool;

// connection.query("select now()", function(err, results){
//     if(err){
//         console.log("Failed to Connect", err)
//     } else {
//         console.log("Connected to Database", results)
//     }
// })

// module.exports = connection;