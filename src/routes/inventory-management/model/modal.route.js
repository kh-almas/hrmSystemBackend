// require
const express = require("express");
const userVerify = require("../../../middlewares/auth/user.verify");
const paramsValidation = require("../../../validations/shared/params.validation");
const { addModel, getModel, updateModel, deleteModel } = require('../../../controllers/inventory-management/product/model/model.controller');
const modelValidation = require("../../../validations/inventory-management/product/model/model.validation");

// router
const modalRouter = express.Router();

// use
modalRouter.use(userVerify);

// post
modalRouter.post("/add", [modelValidation], addModel);

// get all
modalRouter.get("/all", getModel);

// update
modalRouter.put("/update/:id", [paramsValidation, modelValidation], updateModel);

// delete
modalRouter.delete("/delete/:id", [paramsValidation], deleteModel);

// export
module.exports = modalRouter;
