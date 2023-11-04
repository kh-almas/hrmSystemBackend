// require
const express = require("express");
const login = require("../../controllers/auth/login.controller");
const loginValidation = require("../../validations/auth/login.validation");
const userVerify = require("../../middlewares/auth/user.verify");

// router
const authRouter = express.Router();

// post
authRouter.post("/login", [loginValidation], login);
authRouter.post("/verify", [userVerify], (req, res) => {
  return res.status(200).json({
    status: "ok",
    body: { message: "user verified", decoded: req.decoded },
  });
});

// export
module.exports = authRouter;
