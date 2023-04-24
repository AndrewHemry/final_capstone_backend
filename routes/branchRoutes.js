const express = require("express")

let router = new express.Router()

let branchController = require("../controller/branchController")
let middleware = require("../middleware/middle_ware")
let companyChecker = require("../middleware/midde_ware_companyCheck")

// All should be protected
//Create Company Branch /branch -- Company ID as part of the body
router.post("/company/:company_id/branch", middleware.checkJWT ,companyChecker.companyCheck, branchController.createCompanyBranch)

//Update a Company Branch Name /company/:company_id/branch/:branch_id
router.patch("/company/:company_id/branch/:branch_id", middleware.checkJWT, companyChecker.companyCheck, branchController.updateCompanyBranch)

//Delete a Company Branch /company/:company_id/branch/:branch_id
router.delete("/company/:company_id/branch/:branch_id", middleware.checkJWT, companyChecker.companyCheck, branchController.deleteCompanyBranch)

//List a Company Branch GET /company/:company_id/branch/:branch_id
router.get("/company/:company_id/branch/:branch_id", middleware.checkJWT, companyChecker.companyCheck, branchController.showCompanyBranch)

//LIST all Branches GET /company/:company_id/branch
router.get("/company/:company_id/branch", middleware.checkJWT, companyChecker.companyCheck, branchController.listCompanyBranches)

// LIST all employees within the specified company and branch
router.get("/company/:company_id/branch/:branch_id/directory", middleware.checkJWT, companyChecker.companyCheck, branchController.showBranchDirectory)

module.exports = router;
