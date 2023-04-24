const db = require("../src/db")
const middleware = require("./middle_ware")


let companyCheck = function(req, res, next){

    let company_idString = req.params.company_id
    let company_id = parseInt(company_idString)
    let admin_id = req._token.admin_id

    let sqlCommand = "SELECT admin_id, company_id FROM admin_company_relation WHERE admin_id = ? and company_id = ?"
    let params = [admin_id, company_id]

    db.query(sqlCommand, params, function(err, results){
        if(err){
            console.log("Failed to check company relation", err)
            res.sendStatus(500)
            return
        }

        if(results.length == 0){
            console.log("Not added to company")
            res.sendStatus(403)
            return
        }

        console.log("The results for the company_checker:", results)
        next();
    })
}

module.exports = {companyCheck}