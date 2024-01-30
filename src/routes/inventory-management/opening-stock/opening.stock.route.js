// require
const express = require("express");
const userVerify = require("../../../middlewares/auth/user.verify");
const paramsValidation = require("../../../validations/shared/params.validation");
const { addModel, getModel, updateModel, deleteModel } = require('../../../controllers/inventory-management/product/model/model.controller');
const modelValidation = require("../../../validations/inventory-management/product/model/model.validation");
const {addOpeningStock, getAllOpeningStock, deleteOpeningStock} = require("../../../controllers/inventory-management/inventory/opening-stock/opening.stock.controller");
const openingStockValidation = require("../../../validations/inventory-management/inventory/opening.stock.validation");

// router
const openingStockRouter = express.Router();

// use
openingStockRouter.use(userVerify);

// post
openingStockRouter.post("/add", [openingStockValidation], addOpeningStock);

// get all
openingStockRouter.get("/", getAllOpeningStock);

// update
// openingStockRouter.put("/update/:id", [paramsValidation, modelValidation], updateModel);

// delete
openingStockRouter.delete("/delete/:batchNo", deleteOpeningStock);

// export
module.exports = openingStockRouter;
