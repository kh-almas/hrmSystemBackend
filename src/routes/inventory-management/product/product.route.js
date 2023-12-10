// require
const express = require("express");
const userVerify = require("../../../middlewares/auth/user.verify");
const {addProductList, getProductList, updateProductList, deleteProductList, addProductOptions, getProductOptions} = require("../../../controllers/inventory-management/product/product-list/product.list.controller");
const addProductListValidation = require("../../../validations/inventory-management/product/product-list/add.product.list.validation");
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


// post
productRouter.post("/options/add", addProductOptions);

// get
productRouter.get("/options/list", getProductOptions);


// export
module.exports = productRouter;
