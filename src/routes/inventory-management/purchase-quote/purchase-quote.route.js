// require
const express = require("express");
const userVerify = require("../../../middlewares/auth/user.verify");
const {
  addPurchaseQuote,
  getAllPurchaseQuote,
  updatePurchaseQuote,
  deletePurchaseQuote,
} = require("../../../controllers/inventory-management/purchase/purchase-quote/purchase.quote.controller");
const purchaseQuoteValidation = require("../../../validations/inventory-management/inventory/purchase.quote.validation");

// router
const purchaseQuoteRouter = express.Router();

// use
purchaseQuoteRouter.use(userVerify);

// post
purchaseQuoteRouter.post("/", [purchaseQuoteValidation], addPurchaseQuote);

// get all
purchaseQuoteRouter.get("/", getAllPurchaseQuote);

// update
purchaseQuoteRouter.put(
  "/update/:primaryId",
  [purchaseQuoteValidation],
  updatePurchaseQuote
);

// delete
purchaseQuoteRouter.delete("/delete/:primaryId", deletePurchaseQuote);

// export
module.exports = purchaseQuoteRouter;
