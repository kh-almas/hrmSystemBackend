// require
const express = require("express");
const userVerify = require("../../../middlewares/auth/user.verify");
const paramsValidation = require("../../../validations/shared/params.validation");
const {addBrand, getBrand, updateBrand, deleteBrand} = require('../../../controllers/inventory-management/product/brand/brand.controller');
const brandValidation = require("../../../validations/inventory-management/product/brand/brand.validation");

// router
const brandRouter = express.Router();

// use
brandRouter.use(userVerify);

// post
brandRouter.post("/add", [brandValidation], addBrand);

// get all
brandRouter.get("/all", getBrand);

// update
brandRouter.put("/update/:id", [paramsValidation, brandValidation], updateBrand);

// delete
brandRouter.delete("/delete/:id", [paramsValidation], deleteBrand);

// export
module.exports = brandRouter;
