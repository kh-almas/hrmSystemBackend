// require
const express = require("express");
const userVerify = require("../../../middlewares/auth/user.verify");
const {addStockReconciliation, getAllStockReconciliation, updateStockReconciliation, deleteStockReconciliation} = require("../../../controllers/inventory-management/inventory/stock-reconcilation/stock.reconcilation.controller");
const {addDiscount, getAllDiscount, updateDiscount, deleteDiscount} = require("../../../controllers/inventory-management/inventory/discount/discount.controller");
const discountValidation = require("../../../validations/inventory-management/inventory/discount.validation");

// router
const discountRouter = express.Router();

// use
discountRouter.use(userVerify);

// post
discountRouter.post("/add", [discountValidation], addDiscount);

// get all
discountRouter.get("/", getAllDiscount);

// update
discountRouter.put("/update/:primaryId", [discountValidation], updateDiscount);

// delete
discountRouter.delete("/delete/:primaryId", deleteDiscount);

// export
module.exports = discountRouter;
