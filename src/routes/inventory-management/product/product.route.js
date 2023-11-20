// require
const express = require("express");
const userVerify = require("../../../middlewares/auth/user.verify");
const addProductList = require("../../../controllers/inventory-management/product/product-list/add.product.list.controller");
const getProductList = require("../../../controllers/inventory-management/product/product-list/get.product.list.controller");
const addProductListValidation = require("../../../validations/inventory-management/product/product-list/add.product.list.validation");
const addBrandValidation = require("../../../validations/inventory-management/product/brand/add.brand.validation");
const addBrand = require("../../../controllers/inventory-management/product/brand/add.brand.controller");
const getBrand = require("../../../controllers/inventory-management/product/brand/get.brand.controller");
const addCategoryValidation = require("../../../validations/inventory-management/product/category/add.category.validation");
const addCategory = require("../../../controllers/inventory-management/product/category/add.category.controller");
const getCategory = require("../../../controllers/inventory-management/product/category/get.category.controller");
const addModelValidation = require("../../../validations/inventory-management/product/model/add.model.validation");
const addModel = require("../../../controllers/inventory-management/product/model/add.model.controller");
const getModel = require("../../../controllers/inventory-management/product/model/get.model.controller");
const addSubcategoryValidation = require("../../../validations/inventory-management/product/subcategory/add.subcategory.validation");
const addSubcategory = require("../../../controllers/inventory-management/product/subcategory/add.subcategory.controller");
const getSubcategory = require("../../../controllers/inventory-management/product/subcategory/get.subcategory.controller");
const addUnitValidation = require("../../../validations/inventory-management/product/unit/add.unit.validation");
const addVariantValidation = require("../../../validations/inventory-management/variant/add.variant.validation");
const deleteBrand = require("../../../controllers/inventory-management/product/brand/delete.brand.controller");
const updateBrand = require("../../../controllers/inventory-management/product/brand/update.brand.controller");
const updateCategory = require("../../../controllers/inventory-management/product/category/update.category.controller");
const deleteCategory = require("../../../controllers/inventory-management/product/category/delete.category.controller");
const updateModel = require("../../../controllers/inventory-management/product/model/update.model.controller");
const deleteModel = require("../../../controllers/inventory-management/product/model/delete.model.controller");
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
productRouter.post("/add-brand", [addBrandValidation], addBrand);
productRouter.post("/add-category", [addCategoryValidation], addCategory);
productRouter.post("/add-model", [addModelValidation], addModel);
productRouter.post(
  "/add-subcategory",
  [addSubcategoryValidation],
  addSubcategory
);

// get
productRouter.get("/product-list", getProductList);
productRouter.get("/brand-list", getBrand);
productRouter.get("/category-list", getCategory);
productRouter.get("/model-list", getModel);
productRouter.get("/subcategory-list", getSubcategory);

// update
productRouter.put(
  "/update-product/:id",
  [paramsValidation, addProductListValidation],
  updateProductList
);
productRouter.post(
  "/update-category/:id",
  [addCategoryValidation],
  updateCategory
);
productRouter.put(
  "/update-brand/:id",
  [paramsValidation, addBrandValidation],
  updateBrand
);
productRouter.put(
  "/update-model/:id",
  [paramsValidation, addModelValidation],
  updateModel
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
  "/delete-category/:id",
  [paramsValidation],
  deleteCategory
);
productRouter.delete("/delete-brand/:id", [paramsValidation], deleteBrand);
productRouter.delete("/delete-model/:id", [paramsValidation], deleteModel);
productRouter.delete(
  "/delete-subcategory/:id",
  [paramsValidation],
  deleteSubcategory
);

// export
module.exports = productRouter;
