// require
const express = require("express");
const userVerify = require("../../../middlewares/auth/user.verify");
const purchaseRequisitionValidation = require("../../../validations/inventory-management/inventory/purchase.requisition.validation");
const {
  addPurchaseRequisition,
  getAllPurchaseRequisition,
  updatePurchaseRequisition,
  deletePurchaseRequisition,
  getSinglePurchaseRequisition,
} = require("../../../controllers/inventory-management/purchase/purchase-requisition/purchase.requisition.controller");

// router
const purchaseRequisitionRouter = express.Router();

// use
purchaseRequisitionRouter.use(userVerify);

// post
purchaseRequisitionRouter.post(
  "/",
  // [purchaseRequisitionValidation],
  addPurchaseRequisition
);

// get all
purchaseRequisitionRouter.get("/", getAllPurchaseRequisition);

// get single
purchaseRequisitionRouter.get("/single/:primaryId", getSinglePurchaseRequisition);

// update
purchaseRequisitionRouter.put(
  "/update/:primaryId",
  [purchaseRequisitionValidation],
  updatePurchaseRequisition
);

// delete
purchaseRequisitionRouter.delete(
  "/delete/:primaryId",
  deletePurchaseRequisition
);

// export
module.exports = purchaseRequisitionRouter;
