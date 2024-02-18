// require
const express = require("express");
const userVerify = require("../../../middlewares/auth/user.verify");
const paramsValidation = require("../../../validations/shared/params.validation");
const taxValidation = require("../../../validations/inventory-management/product/tax/tax.validation");
const {addTax, getAllTax, updateTax, deleteTax} = require("../../../controllers/inventory-management/product/tax/tax.controller");

// router
const taxRouter = express.Router();

// use
taxRouter.use(userVerify);

// post
taxRouter.post("/", [taxValidation], addTax);

// get all
taxRouter.get("/", getAllTax);

// update
taxRouter.put("/update/:id", [paramsValidation, taxValidation], updateTax);

// delete
taxRouter.delete("/delete/:id", [paramsValidation], deleteTax);

// export
module.exports = taxRouter;
