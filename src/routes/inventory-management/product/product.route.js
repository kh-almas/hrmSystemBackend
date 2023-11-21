// require
const express = require("express");
const userVerify = require("../../../middlewares/auth/user.verify");
const addProductList = require("../../../controllers/inventory-management/product/product-list/add.product.list.controller");
const getProductList = require("../../../controllers/inventory-management/product/product-list/get.product.list.controller");
const addProductListValidation = require("../../../validations/inventory-management/product/product-list/add.product.list.validation");
const addSubcategoryValidation = require("../../../validations/inventory-management/product/subcategory/add.subcategory.validation");
const addSubcategory = require("../../../controllers/inventory-management/product/subcategory/add.subcategory.controller");
const getSubcategory = require("../../../controllers/inventory-management/product/subcategory/get.subcategory.controller");
const updateProductList = require("../../../controllers/inventory-management/product/product-list/update.product.list.controller");
const deleteProductList = require("../../../controllers/inventory-management/product/product-list/delete.product.list.controller");
const updateSubcategory = require("../../../controllers/inventory-management/product/subcategory/update.subcategory.controller");
const deleteSubcategory = require("../../../controllers/inventory-management/product/subcategory/delete.subcategory.controller");
const paramsValidation = require("../../../validations/shared/params.validation");

// router
const productRouter = express.Router();

// use
productRouter.use(userVerify);

// post
productRouter.post("/add-product", [addProductListValidation], addProductList);
productRouter.post(
  "/add-subcategory",
  [addSubcategoryValidation],
  addSubcategory
);

// get
productRouter.get("/product-list", getProductList);
productRouter.get("/subcategory-list", getSubcategory);

// update
productRouter.put(
  "/update-product/:id",
  [paramsValidation, addProductListValidation],
  updateProductList
);
productRouter.put(
  "/update-subcategory/:id",
  [paramsValidation, addSubcategoryValidation],
  updateSubcategory
);

// delete
productRouter.delete(
  "/delete-product/:id",
  [paramsValidation],
  deleteProductList
);
productRouter.delete(
  "/delete-subcategory/:id",
  [paramsValidation],
  deleteSubcategory
);

// export
module.exports = productRouter;
