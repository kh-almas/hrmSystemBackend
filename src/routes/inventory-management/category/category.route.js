// require
const express = require("express");
const userVerify = require("../../../middlewares/auth/user.verify");
const paramsValidation = require("../../../validations/shared/params.validation");
const {addCategory, getCategory, updateCategory, deleteCategory} = require('../../../controllers/inventory-management/product/category/category.controller');
const categoryValidation = require("../../../validations/inventory-management/product/category/category.validation");

// router
const categoryRouter = express.Router();

// use
categoryRouter.use(userVerify);

// post
categoryRouter.post("/add", [categoryValidation], addCategory);

// get all
categoryRouter.get("/all", getCategory);

// update
categoryRouter.put("/update/:id", [paramsValidation, categoryValidation], updateCategory);

// delete
categoryRouter.delete("/delete/:id", [paramsValidation], deleteCategory);

// export
module.exports = categoryRouter;
