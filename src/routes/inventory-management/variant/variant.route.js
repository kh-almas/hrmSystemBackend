// require
const express = require("express");
const userVerify = require("../../../middlewares/auth/user.verify");
const getContactParamsValidation = require("../../../validations/inventory-management/contact/get.contact.params.validation");
const paramsValidation = require("../../../validations/shared/params.validation");
const addVariantValidation = require('../../../validations/inventory-management/product/variant/add.variant.validation')
const { addVariant, getAllVariant, updateVariant, deleteVariant, getAllVariantValue } = require('../../../controllers/inventory-management/product/variant/varient.controller');

// router
const variantRouter = express.Router();

// use
variantRouter.use(userVerify);

// post
variantRouter.post("/add", [addVariantValidation], addVariant);

// get all
variantRouter.get("/all", getAllVariant);
// get all
variantRouter.get("/value", getAllVariantValue);

// update
variantRouter.put("/update/:id", [paramsValidation, addVariantValidation], updateVariant);

// delete
variantRouter.delete("/delete/:id", [paramsValidation], deleteVariant);

// export
module.exports = variantRouter;
