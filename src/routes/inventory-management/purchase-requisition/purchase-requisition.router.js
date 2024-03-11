// require
const express = require("express");
const userVerify = require("../../../middlewares/auth/user.verify");
const {addPurchaseRequisition, getAllPurchaseRequisition, updatePurchaseRequisition, deletePurchaseRequisition} = require("../../../controllers/inventory-management/inventory/purchase-requisition/purchase.requisition.controller");
const purchaseRequisitionValidation = require("../../../validations/inventory-management/inventory/purchase.requisition.validation");

// router
const purchaseRequisitionRouter = express.Router();

// use
purchaseRequisitionRouter.use(userVerify);

// post
purchaseRequisitionRouter.post("/", [purchaseRequisitionValidation], addPurchaseRequisition);

// get all
purchaseRequisitionRouter.get("/", getAllPurchaseRequisition);

// update
purchaseRequisitionRouter.put("/update/:primaryId", [purchaseRequisitionValidation], updatePurchaseRequisition);

// delete
purchaseRequisitionRouter.delete("/delete/:primaryId", deletePurchaseRequisition);

// export
module.exports = purchaseRequisitionRouter;
