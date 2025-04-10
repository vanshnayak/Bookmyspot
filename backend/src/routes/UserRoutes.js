//router
const routes = require("express").Router()
//controller --> userController
const userController = require("../controllers/UserController")
//get
routes.post("/users",userController.signup)
routes.get("/users",userController.getAllUsers)
routes.get("/user/:id",userController.getUserById)
routes.delete("/user/:id",userController.deleteUserById)
routes.post("/user/login",userController.loginUser)
routes.post("/user/forgotpassword",userController.forgotPassword)
routes.post("/user/resetpassword",userController.resetpassword)
//post
//routes.post("/users",userController.addUser)

//delete

//get



module.exports = routes
