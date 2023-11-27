// require
const express = require("express");
const userVerify = require("../../../middlewares/auth/user.verify");
const addProductList = require("../../../controllers/inventory-management/product/product-list/add.product.list.controller");
const getProductList = require("../../../controllers/inventory-management/product/product-list/get.product.list.controller");
const addProductListValidation = require("../../../validations/inventory-management/product/product-list/add.product.list.validation");
const updateProductList = require("../../../controllers/inventory-management/product/product-list/update.product.list.controller");
const deleteProductList = require("../../../controllers/inventory-management/product/product-list/delete.product.list.controller");
const paramsValidation = require("../../../validations/shared/params.validation");

// router
const productRouter = express.Router();

// use
productRouter.use(userVerify);

// post
productRouter.post("/add", addProductList);


// get
productRouter.get("/list", getProductList);

// update
productRouter.put(
  "/update-product/:id",
  [paramsValidation, addProductListValidation],
  updateProductList
);

// delete
productRouter.delete(
  "/delete-product/:id",
  [paramsValidation],
  deleteProductList
);

// export
module.exports = productRouter;
