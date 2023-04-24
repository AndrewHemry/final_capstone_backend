const express = require("express")

let router = new express.Router()

let adminController = require("../controller/adminController")
let middleware = require("../middleware/middle_ware")
let companyChecker = require("../middleware/midde_ware_companyCheck")

// Should be protected
// To create a new Admin/Send them an invitation
router.post("/company/:company_id/invite", middleware.checkJWT, companyChecker.companyCheck, adminController.createAdmin)

// Add Remove From Company Directory/Relationship table
router.delete("/company/:company_id/remove/:admin_id", middleware.checkJWT, companyChecker.companyCheck, adminController.removeAdmin)


module.exports = router;