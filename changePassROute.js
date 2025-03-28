const express = require("express")
const { changePassword } = require("../controllers/changePasswordController")
const { authenticationtoken } = require("../middleware/authMiddleware")



const changeRoute=express.Router()
changeRoute.post("/",authenticationtoken,changePassword)


module.exports={changeRoute}