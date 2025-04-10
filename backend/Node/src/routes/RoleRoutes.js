const routes = require("express").Router()
const roleController= require("../controllers/RoleController")
routes.get("/roles",roleController.getAllRoles)
routes.post("/roles",roleController.addRole)
routes.delete("/roles/:id",roleController.deleteRole)
routes.get("/roles/:id",roleController.getRoleById)

//v-imp
module.exports = routes