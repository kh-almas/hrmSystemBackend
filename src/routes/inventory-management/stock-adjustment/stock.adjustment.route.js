// require
const express = require("express");
const userVerify = require("../../../middlewares/auth/user.verify");
const stockAdjustmentValidation = require("../../../validations/inventory-management/inventory/stock.adjustment.validation");
const { addStockAdjustment, getAllStockAdjustment, updateStockAdjustment, deleteStockAdjustment} = require("../../../controllers/inventory-management/inventory/stock-adjustment/stock.adjustment.controller");

// router
const stockAdjustmentRouter = express.Router();

// use
stockAdjustmentRouter.use(userVerify);

// post
stockAdjustmentRouter.post("/add", [stockAdjustmentValidation], addStockAdjustment);

// // get all
stockAdjustmentRouter.get("/", getAllStockAdjustment);

// // update
stockAdjustmentRouter.put("/update/:primaryId", [stockAdjustmentValidation], updateStockAdjustment);

// // delete
stockAdjustmentRouter.delete("/delete/:primaryId", deleteStockAdjustment);

// export
module.exports = stockAdjustmentRouter;
