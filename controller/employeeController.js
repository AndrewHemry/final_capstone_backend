const db = require("../src/db")

const createEmployee = async function(req, res){
    // This is adding Employee to the Employee Table

    // NEED TO CHECK FOR DUPLICATE EMAILS - IF EMAIL EXISTS, USER CANNOT BE ADDED
    let company_id = req.params.company_id
    let companyBranch_id = req.params.branch_id

    let first_name = req.body.first_name
    let last_name = req.body.last_name
    let employee_email = req.body.employee_email
    let job_title = req.body.job_title

    let sqlCommand = "INSERT INTO employee(company_id, first_name, last_name, employee_email, job_title) VALUES (?, ?, ?, ?, ?);"
    let params = [company_id, first_name, last_name, employee_email, job_title]

    // Second Params are part of a batch query to insert employee into employee table, then take the ID and insert it into the branch directory table
    let sqlCommand2 = "INSERT INTO branch_directory(companyBranch_id, employee_id) VALUES (?, LAST_INSERT_ID());"
    let params2 = [companyBranch_id]

    db.query(sqlCommand, params, function(err, results){
        if(err){
            console.log("Failed to create new user in the database", err)
            res.sendStatus(500)
            return
        } 

        db.query(sqlCommand2, params2, function(err2, results2){
            if(err){
                console.log("Failed to create new employee", err2)
            } else {
                console.log("Created employee", results2)
                res.sendStatus(202)
            }
        })
    })
    // IF COMPANY CHANGE, CHECK TO SEE IF BRANCH ID EXISTS FOR THAT COMPANY, IF NOT, DROP THAT BRANCH ID?

}


// UPDATE ALL FUNCTIONS FOR THIS ONE AND BELOW

const updateEmployee = function(req, res){
    // This is the command to update the existing user but without removing the previous values
    // SQL: UPDATE users_information SET is_active = CONCAT( is_active, ?)
    // ONLY ADMINS OF THE SAME COMPANY CAN UPDATE EMPLOYEES - THEY CAN UPDATE NAME, BRANCH, EMAIL, IS_EMPLOYEE, AND ACTIVE.

    let company_id = req.params.company_id
    let branch_id = req.params.branch_id
    let employee_id = req.params.id

    let first_name = req.body.first_name
    let last_name = req.body.last_name
    let employee_email = req.body.employee_email
    let is_active = req.body.is_active
    let job_title = req.body.job_title

    let sqlCommand = "UPDATE employee SET first_name = ?, last_name = ?, employee_email = ?, is_active = ?, job_title = ? WHERE id = ?"
    let params = [first_name, last_name, employee_email, is_active, job_title, id]

    console.log("This is the sqlCommand", sqlCommand)
    console.log("These are the params", params)

    db.query(sqlCommand, params, function(err, results){
        if(err){
            console.log("Failed to update user", err)
            res.sendStatus(500)
        } else {
            res.sendStatus(202)
        }
    })
}

const deleteEmployee = function(req, res){
    // This is the command to delete an existing user in the users_table
    // SQL: DELETE FROM users_table where id = ?
    // ADMINS WITHIN THAT SHARE THE SAME COMPANY ID SHOULD BE ABLE TO DELETE AN EMPLOYEE, ONLY IF COMPANY ID's MATCH
    
    let id = req.params.id
    let sqlCommand = "DELETE FROM user_information where id = ?"
    let params = [id]

    db.query(sqlCommand, params, function(err, results){
        if(err){
            console.log("Failed to delete user", err)
            res.sendStatus(500)
        } else {
            res.sendStatus(200)
        }
    })
}

const showEmployee = function(req, res){
    // This is the query to list all users in the database
    // SQL Select id, connected_id, first_name, last_name, user_email, is_employee, is_active, created_at

    let id = req.params.id

    let sqlCommand = "Select id, connected_id, first_name, last_name, user_email, is_employee, is_active, created_at FROM user_information WHERE id = ?"
    let params = [id]

    db.query(sqlCommand, params, function(err, results){
        if(err){
            console.log("Failed to fetch user from the database")
            res.sendStatus(500)
        } else {

            if(results.length == 0){
                res.json(null)
            } else {
                res.json(results[0])
            }
        }
    })
}

// const listEmployees = function(req, res){
//     // This is the query to list all users in the database
//     // SQL Select id, first_name, last_name, is_active
//     // LIST ALL EMPLOYEES FOR A SPECIFIC COMPANY

//     db.query("SELECT id, first_name, last_name, is_active FROM user_information", function(err, results){
//         if(err){
//             console.log("Failed to fetch users from the database", err)
//             res.sendStatus(500)
//         } else {
//             res.json(results)
//         }
//     })
// }


module.exports = {
    createEmployee, updateEmployee, deleteEmployee, showEmployee
}
