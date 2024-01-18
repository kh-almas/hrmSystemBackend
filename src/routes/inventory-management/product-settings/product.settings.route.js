// require
const express = require("express");
const userVerify = require("../../../middlewares/auth/user.verify");
const paramsValidation = require("../../../validations/shared/params.validation");
const { getProductSettings, updateProductSettings } = require('../../../controllers/inventory-management/product/settings/settings.controller');
const modelValidation = require("../../../validations/inventory-management/product/model/model.validation");

// router
const productSettingsRouter = express.Router();

// use
productSettingsRouter.use(userVerify);

// get all
productSettingsRouter.get("/", getProductSettings);

// update
productSettingsRouter.put("/update/:id", updateProductSettings);

// export
module.exports = productSettingsRouter;
