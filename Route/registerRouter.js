const express = require("express")
const { registerUser } = require("../controllers/registerController")
const { Roleregister } = require("../controllers/roleRegister")


const RegRouter=express.Router()
const RoleRoute=express.Router()

RoleRoute.post("/rolereg",Roleregister)

RegRouter.post("/register",registerUser)

module.exports={RegRouter,RoleRoute}
