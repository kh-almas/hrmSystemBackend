// require
const express = require("express");
const userVerify = require("../../../middlewares/auth/user.verify");
const paramsValidation = require("../../../validations/shared/params.validation");
const { addModel, getModel, updateModel, deleteModel } = require('../../../controllers/inventory-management/product/model/model.controller');
const modelValidation = require("../../../validations/inventory-management/product/model/model.validation");
const stockAdjustmentValidation = require("../../../validations/inventory-management/inventory/stock.adjustment.validation");
const { addStockAdjustment, getAllStockAdjustment} = require("../../../controllers/inventory-management/inventory/stock-adjustment/stock.adjustment.controller");


// router
const stockAdjustmentRouter = express.Router();

// use
stockAdjustmentRouter.use(userVerify);

// post
stockAdjustmentRouter.post("/add", [stockAdjustmentValidation], addStockAdjustment);

// // get all
stockAdjustmentRouter.get("/", getAllStockAdjustment);

// // update
// stockAdjustmentRouter.put("/update/:batchNo", [openingStockValidation], updateOpeningStock);

// // delete
// stockAdjustmentRouter.delete("/delete/:batchNo", deleteOpeningStock);

// export
module.exports = stockAdjustmentRouter;
