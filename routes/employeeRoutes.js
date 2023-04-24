const express = require("express")

let router = new express.Router()

let employeeController = require("../controller/employeeController")
let middleware = require("../middleware/middle_ware")
let companyChecker = require("../middleware/midde_ware_companyCheck")

// All should be protected
//Create Employee POST /users
router.post("/company/:company_id/branch/:branch_id/employee", middleware.checkJWT, companyChecker.companyCheck, employeeController.createEmployee)

//Update an Employee PATCH
router.patch("/company/:company_id/branch/:branch_id/employee/:id", middleware.checkJWT, companyChecker.companyCheck, employeeController.updateEmployee)

//Delete an Employee
router.delete("/company/:company_id/branch/:branch_id/employee/:id", middleware.checkJWT, companyChecker.companyCheck, employeeController.deleteEmployee)

//List an Employee
router.get("/company/:company_id/branch/:branch_id/employee/:id", middleware.checkJWT, companyChecker.companyCheck, employeeController.showEmployee)

//LIST all Employees
router.get("/company/:company_id/branch/:branch_id/employee", middleware.checkJWT, companyChecker.companyCheck, employeeController.listEmployees)

module.exports = router;
