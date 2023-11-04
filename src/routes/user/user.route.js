// require
const express = require("express");
const userVerify = require("../../middlewares/auth/user.verify");
const {getAllUser, postUser, deleteUserController} = require("../../controllers/user/user.controller");

// router
const userRouter = express.Router();

// use
userRouter.use(userVerify);

// post
userRouter.post("/", postUser);

// get
userRouter.get("/", getAllUser);

userRouter.delete("/:id", deleteUserController);

// export
module.exports = userRouter;
