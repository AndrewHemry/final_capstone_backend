const express = require("express")

let router = new express.Router()
let authController = require("../controller/authController")

//POST /register
router.post("/register", authController.register)

//POST /login
router.post("/login", authController.login)

module.exports = router;