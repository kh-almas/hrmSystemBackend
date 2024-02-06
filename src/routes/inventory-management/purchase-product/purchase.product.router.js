// require
const express = require("express");
const userVerify = require("../../../middlewares/auth/user.verify");
const {addOpeningStock, getAllOpeningStock, deleteOpeningStock, updateOpeningStock} = require("../../../controllers/inventory-management/inventory/opening-stock/opening.stock.controller");
const purchaseProductValidation = require("../../../validations/inventory-management/inventory/purchase.product.validation");
const {addPurchaseProduct, getAllPurchaseProduct, updatePurchaseProduct, deletePurchaseProduct} = require("../../../controllers/inventory-management/inventory/purchase-product/purchase.product.controller");

// router
const purchaseProductRouter = express.Router();

// use
purchaseProductRouter.use(userVerify);

// post
purchaseProductRouter.post("/", [purchaseProductValidation], addPurchaseProduct);

// get all
purchaseProductRouter.get("/", getAllPurchaseProduct);

// update
purchaseProductRouter.put("/update/:primaryId", [purchaseProductValidation], updatePurchaseProduct);

// delete
purchaseProductRouter.delete("/delete/:primaryId", deletePurchaseProduct);

// export
module.exports = purchaseProductRouter;
