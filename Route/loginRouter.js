const express = require("express")
const { loginUser } = require("../controllers/loginController")
const { loginrole } = require("../controllers/rolelogin")

const LogRouter=express.Router()
const roleRouter=express.Router()

LogRouter.post("/login",loginUser)

roleRouter.post("/logrole",loginrole)




module.exports={LogRouter,roleRouter}
