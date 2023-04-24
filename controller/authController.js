let db = require("../src/db")
// let argon = require("argon2")
let jwt = require("jsonwebtoken")

let JWT_SECRET = process.env.JWT_SECRET

// let register = async function(req, res){

//     let first_name = req.body.first_name
//     let last_name = req.body.last_name
//     let email_address = req.body.email_address
//     let password = req.body.password

//     let password_hash = await argon.hash(password)

//     let sqlCommand = "INSERT into admin_login (first_name, last_name, email_address, password_hash) values (?, ?, ?, ?)"
//     let params = [first_name, last_name, email_address, password_hash]

//     db.query(sqlCommand, params, function(err, results){
//         if(err){
//             console.log("Registartion Unsuccessful", err)
//             res.sendStatus(500)
//         } else {
//             console.log("Successfully Registered", results)
//             res.sendStatus(201)
//         }
//     })
// }

let login = async function(req, res){

    let email_address = req.body.email_address
    let password = req.body.password

    let sqlCommand = "Select password_hash, id from admin_login where email_address = ?"
    let params = [email_address]

    db.query(sqlCommand, params, async function(err, results){
        //If the wrong password was entered
        if(err){
            console.log("Could not fetch login info", err)
            res.sendStatus(500)
            return
        }

        // If the email doesn't exist
        if(results.length == 0){
            res.sendStatus(403)
            return
        }

        // If multiple emails are returned
        if(results.length > 1){
            res.sendStatus(500)
            return
        }

        let admin_id = results[0].id
        let password_hash = results[0].password
        // let password_hash = results[0].password_hash

        // let goodPass = await argon.verify(password_hash, password)
        let goodPass = password === password_hash;

        if(goodPass){

            let token = {
                "email": email_address,
                "admin_id": admin_id
            }
            // token.email = email_address
            // token.admin_id = admin_id
                // "email": email_address,
                // // "fullname": results[0].full_name
                // "id": id

            
            let signedToken = jwt.sign(token, JWT_SECRET, {expiresIn: "2hr"})

            res.json(signedToken)
        } else {
            res.sendStatus(403)
        }
    })
}

module.exports = { login }

// module.exports = {
//     register, login
// }