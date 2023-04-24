// CREATE COMPANY BRANCH - createCompanyBranch 
// UPDATE COMPANY BRANCH - updateCompanyBranch
// DELETE COMPANY BRANCH - deleteCompanyBranch
// LIST SPECIFIC COMPANY BRANCH - showCompanyBranch
// LIST ALL COMPANY BRANCHES - listCompanyBranches
const db = require("../src/db")

const createCompanyBranch = function(req, res){
    // This is the command to create a new company branch in the "company_branch" table
    // SQL: INSERT INTO company_branch(branch_name) VALUES (?)

    let company_id = req.params.company_id
    let branch_name = req.body.branch_name

    // ADD JOIN ON INSERT FOR AVAILABLE_COMPANY_RELATION
    let sqlCommand = "INSERT INTO company_branch(company_id, branch_name) VALUES (?, ?)"
    let params = [company_id, branch_name]

    db.query(sqlCommand, params, function(err, results){
        if(err){
            console.log("Failed to create a new company branch", err)
            res.sendStatus(500)
        } else {
            res.sendStatus(202)
        }
      
    })
}

const updateCompanyBranch = function(req, res){
    // This is the command to update an existing branch name
    // SQL: UPDATE company_branch SET branch_name = ? where company_id = ? and branch_id = ?

    let company_id = req.params.company_id
    let branch_id = req.params.branch_id

    let branch_name = req.body.branch_name

    let sqlCommand = "UPDATE company_branch SET branch_name = ? WHERE company_id = ? and branch_id = ?"
    let params = [branch_name, company_id, branch_id]

    db.query(sqlCommand, params, function(err, results){
        if(err){
            console.log("Failed to updated branch", err)
            res.sendStatus(500)
        } else {
            res.sendStatus(202)
        }
    })
}

const deleteCompanyBranch = function(req, res){
    // This is the command to delete an existing company branch
    // SQL: DELETE FROM company_branch where company_id = ? and branch_id = ?

    let company_id = req.params.company_id
    let branch_id = req.params.branch_id

    let sqlCommand = "DELETE FROM company_branch WHERE company_id = ? and branch_id = ?"
    let params = [company_id, branch_id]

    db.query(sqlCommand, params, function(err, results){
        if(err){
            console.log("Failed to delete company branch", err)
            res.sendStatus(500)
        } else {
            res.sendStatus(200)
        }
    })
}

const showCompanyBranch = function(req, res){
    // This is the query to list out the company branch and it's specific info
    // SQL: Select company_id, branch_id, branch_name WHERE company_id = ? and branch_id = ?

    let company_id = req.params.company_id
    let branch_id = req.params.branch_id

    let sqlCommand = "Select company_id, branch_id, branch_name FROM company_branch WHERE company_id = ? and branch_id = ?"
    let params = [company_id, branch_id]

    db.query(sqlCommand, params, function(err, results){
        if(err){
            console.log("Failed to fetch company branch", err)
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

const listCompanyBranches = function(req, res){
    // This is the query to list all available company branches
    // SQL: Select branch_id, branch_name WHERE company_id = ?

    let stringID = req.params.company_id
    let company_id = parseInt(stringID)

    let sqlCommand = "Select branch_id, branch_name FROM company_branch WHERE company_id = ?"
    let params = [company_id]

    db.query(sqlCommand, params, function(err, results){
        if(err){
            console.log("Failed to fetch company branches", err)
            res.sendStatus(500)
        } else {
            res.json(results)
        }
    })

}

// SHOW EMPLOYEES WITHIN COMPANY BRANCH
// NEED COMPANY_ID, BRANCH_ID
// SELECT XXXX, INNER JOIN TO SHOW COMPANY NAME AND OTHER DATA FIELDS TOGETHER - INNER JOIN BRANCH_DIRECTORY, EMPLOYEE, AVAILALE_COMPANIES
// SQL: SELECT available_companies.company_name, company_branch.branch_name, employee.first_name, employee.last_name FROM ((branch_directory INNER JOIN employee ON branch_directory.employee_id) INNER JOIN available_companies.company_id)

// SELECT employee.company_id, company_branch.branch_id, company_branch.branch_name, employee.id, employee.first_name, employee.last_name 
// FROM employee
// INNER JOIN company_branch on employee.company_id = company_branch.company_id
// INNER JOIN branch_directory on employee.id = branch_directory.employee_id
// WHERE employee.company_id = 10 and company_branch.branch_id = 6;

const showBranchDirectory = function(req, res){

    let company_id = req.params.company_id
    let branch_id = req.params.branch_id

    let sqlCommand = "SELECT employee.company_id, company_branch.branch_id, company_branch.branch_name, employee.id, employee.first_name, employee.last_name FROM employee INNER JOIN company_branch on employee.company_id = company_branch.company_id INNER JOIN branch_directory on employee.id = branch_directory.employee_id WHERE employee.company_id = ? and company_branch.branch_id = ?;"
    let params = [company_id, branch_id]

    db.query(sqlCommand, params, function(err, results){
        if(err){
            console.log("Failed to fetch directory branch")
            res.sendStatus(500)
        } else {
            console.log("Successfully retrieved the company branch")
            res.json(results)
        }
    })

}

module.exports = {
    createCompanyBranch, updateCompanyBranch, deleteCompanyBranch, listCompanyBranches, showCompanyBranch, showBranchDirectory
}