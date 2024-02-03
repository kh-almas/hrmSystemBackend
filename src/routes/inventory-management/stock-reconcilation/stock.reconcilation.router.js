// require
const express = require("express");
const userVerify = require("../../../middlewares/auth/user.verify");
const { addStockAdjustment, getAllStockAdjustment, updateStockAdjustment, deleteStockAdjustment} = require("../../../controllers/inventory-management/inventory/stock-adjustment/stock.adjustment.controller");
const stockReconciliationValidation = require("../../../validations/inventory-management/inventory/stock.reconcilation.validation");
const {addStockReconciliation, getAllStockReconciliation, updateStockReconciliation, deleteStockReconciliation} = require("../../../controllers/inventory-management/inventory/stock-reconcilation/stock.reconcilation.controller");

// router
const stockReconciliationRouter = express.Router();

// use
stockReconciliationRouter.use(userVerify);

// post
stockReconciliationRouter.post("/add", [stockReconciliationValidation], addStockReconciliation);

// get all
stockReconciliationRouter.get("/", getAllStockReconciliation);

// update
stockReconciliationRouter.put("/update/:batchNo", [stockReconciliationValidation], updateStockReconciliation);

// // delete
stockReconciliationRouter.delete("/delete/:batchNo", deleteStockReconciliation);

// export
module.exports = stockReconciliationRouter;
