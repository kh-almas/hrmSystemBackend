// require
const express = require("express");
const userVerify = require("../../../middlewares/auth/user.verify");
const {addOpeningStock, getAllOpeningStock, deleteOpeningStock, updateOpeningStock} = require("../../../controllers/inventory-management/inventory/opening-stock/opening.stock.controller");
const purchaseProductValidation = require("../../../validations/inventory-management/inventory/purchase.product.validation");

// router
const purchaseProductRouter = express.Router();

// use
purchaseProductRouter.use(userVerify);

// post
purchaseProductRouter.post("/", [purchaseProductValidation], addOpeningStock);

// get all
purchaseProductRouter.get("/", getAllOpeningStock);

// update
purchaseProductRouter.put("/update/:batchNo", [purchaseProductValidation], updateOpeningStock);

// delete
purchaseProductRouter.delete("/delete/:batchNo", deleteOpeningStock);

// export
module.exports = purchaseProductRouter;
