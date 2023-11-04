// require
const express = require("express");
const {postRoleController, updateRoleController, getRoleController, getSingleRoleController, deleteRoleController} = require("../../controllers/user/role.controller");
const rolesValidation = require("../../validations/users/roles.validation");
const userVerify = require("../../middlewares/auth/user.verify");

// router
const roleRouter = express.Router();
roleRouter.use(userVerify);


roleRouter.get("/", getRoleController);
roleRouter.post("/", [rolesValidation], postRoleController);
roleRouter.get("/:id", getSingleRoleController);
roleRouter.put("/:id", [rolesValidation], updateRoleController);
roleRouter.delete("/:id", deleteRoleController);

// export
module.exports = roleRouter;
