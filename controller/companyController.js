// CREATE COMPANY - createCompany
// UPDATE COMPANY NAME - updateCompany

const db = require("../src/db")
const middleware = require("../middleware/middle_ware")

const createCompany = function(req, res){
    // This is the command to create a new company if one is not already existing
    // SQL: INSERT INTO available_companies(company_name) VALUES (?)

    let admin_id = req._token.admin_id
    console.log("The admin id is", admin_id)
    let company_name = req.body.company_name

    let sqlCommand = "INSERT INTO available_companies(company_name) VALUES (?)"
    let params = [company_name]

    // GET COMPANY ID & USER ID TO INSERT INTO admin_company_relation

    db.query(sqlCommand, params, function(err, results){
        if(err){
            console.log("Failed to create company", err)
            res.sendStatus(500)
        } 
        
        if(results.length == 0){
            console.log("Failed to fetch admin", err)
            res.sendStatus(403)
            return
        }

        if(results.length > 1){
            res.sendStatus(500)
            return
        }
        
        let company_id = results.id
        
        let sqlCommand = "INSERT INTO admin_company_relation(admin_id, company_id) VALUES (?, LAST_INSERT_ID())"
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

const updateCompany = function(req, res){
    // This sthe command to update an existing company name
    // SQL: UPDATE available_companies SET company_name = ? WHERE company_id = ?

    let company_id = req.params.company_id
    let company_name = req.body.company_name

    let sqlCommand = "UPDATE available_companies SET company_name = ? WHERE company_id = ?"
    let params = [company_name, company_id]

    db.query(sqlCommand, params, function(err, results){
        if(err){
            console.log("Failed to update company", err)
            res.sendStatus(500)
        } else {
            res.sendStatus(200)
        }
    })
}

const listCompanies = function(req, res){
    // This is to list the available companies to get the company_id if ever needed
    // SQL: SELECT * FROM available_companies

    let sqlCommand = "SELECT * FROM available_companies"

    db.query(sqlCommand, function(err, results){
        if(err){
            console.log("Failed to fetch companies", err)
            res.sendStatus(500)
        } else {
            res.json(results)
        }
    })
}

module.exports = {
    createCompany, updateCompany, listCompanies
}