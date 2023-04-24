const db = require("../src/db")

const createAdmin = function(req, res){
    // This is the command to create/invite a new user
    // SQL: INSERT INTO admin_company_relation WHERE email_address = ?

    // need to check if I am available in the available_companies table
    let company_id = req.params.company_id
    let email_address = req.body.email_address

    let admin_id = ""

    let findAdminID = "SELECT id from admin_login WHERE email_address = ?"
    let emailParams = [email_address]
    db.query(findAdminID, emailParams, function(err, results){
        if(err){
            console.log("Failed to fetch admin", err)
            res.sendStatus(500)
            return
        }

        // check how many results back, then follow up with an if/else clause
        // if multiple comes back, don't add them
        
        if(results.length == 0){
            console.log("Failed to fetch admin", err)
            res.sendStatus(403)
            return
        }

        if(results.length > 1){
            res.sendStatus(500)
            return
        }
        
        admin_id = results[0].id

        console.log("The admin_id is:", admin_id)
        
        let sqlCommand = "INSERT INTO admin_company_relation (admin_id, company_id) VALUES (?, ?)"
        let params = [admin_id, company_id]

        db.query(sqlCommand, params, function(err, results){
            if(err){
                console.log("Failed to add user to admin relationship table", err)
                res.sendStatus(500)
            } else {
                res.sendStatus(202)
            }
        })
    })
}

const removeAdmin = function(req, res){

    let company_id = req.params.company_id
    let admin_id = req.params.admin_id

    let sqlCommand = "DELETE FROM admin_company_relationship where admin_id = ? and company_id = ?"
    let params = [admin_id, company_id]

    db.query(sqlCommand, params, function(err, results){
        if(err){
            console.log("Could not delete admin from company", err)
            res.sendStatus(500)
        } else {
            console.log("Deleted Admin from Company", results)
            res.sendStatus(200)
        }
    })
}

module.exports = {
    createAdmin, removeAdmin
}