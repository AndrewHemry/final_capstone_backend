const express = require("express")

let router = new express.Router()

let companyController = require("../controller/companyController")
let middleware = require("../middleware/middle_ware")
let companyChecker = require("../middleware/midde_ware_companyCheck")

//Create Company
router.post("/company", middleware.checkJWT, companyController.createCompany)

//Update a Company Name /company/:company_id/branch/:branch_id - Should be Protected
router.patch("/company/:company_id", middleware.checkJWT, companyChecker.companyCheck, companyController.updateCompany)

// Show all Employees for Company

// Update Employee at Company Level

// List Companies (Internal Only?)
router.get("/company", companyController.listCompanies)

module.exports = router;
