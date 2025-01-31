// require
const express = require("express");
const userVerify = require("../../../middlewares/auth/user.verify");
const paramsValidation = require("../../../validations/shared/params.validation");
const {
  getBrandProductInitialization,
  updateBrandProductInitialization,
  deleteBrandProductInitialization,
} = require("../../../controllers/inventory-management/product/brand-product-initialization/brand.product.initialization.controller");

// router
const brandProductInitializationRouter = express.Router();

// use
brandProductInitializationRouter.use(userVerify);

// get all
brandProductInitializationRouter.get("/:id", getBrandProductInitialization);

// update
brandProductInitializationRouter.put("/update/:id", [paramsValidation], updateBrandProductInitialization);

// delete
brandProductInitializationRouter.delete(
  "/delete/:id",
  deleteBrandProductInitialization
);

// export
module.exports = brandProductInitializationRouter;
