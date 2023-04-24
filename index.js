require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const path = require("path");

let PORT = process.env.PORT || 8080

app.use(express.static('./public'));
app.use(express.json());
app.use(cors());

// app.get("/", (req, res) => {
//   res.json("hello world")
// })

let authRoutes = require("./routes/authRoutes")
app.use(authRoutes)

let employeeRoutes = require("./routes/employeeRoutes")
app.use(employeeRoutes)

let companyRoutes = require("./routes/companyRoutes")
app.use(companyRoutes)

let branchRoutes = require("./routes/branchRoutes")
app.use(branchRoutes)

let adminRoutes = require("./routes/adminRoutes")
app.use(adminRoutes)

app.listen(PORT, function(){
    console.log("Application Started on Port:", PORT)
})