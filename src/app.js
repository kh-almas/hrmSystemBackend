// require
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const userRouter = require("./routes/user/user.route");
const roleRouter = require("./routes/user/role.route");
const authRouter = require("./routes/auth/auth.route");
const contactRouter = require("./routes/inventory-management/contact/contact.route");
const productsRouter = require("./routes/inventory-management/product/product.route");
const productSettingsRouter = require("./routes/inventory-management/product-settings/product.settings.route");
const hrmSystemRouter = require("./routes/hrm-system/hrm.system.route");
const fileUploadRouter = require("./file-upload/file.upload");
const variantRouter = require("./routes/inventory-management/variant/variant.route");

// app
const app = express();
const path = require("path");
const unitTypeRouter = require("./routes/inventory-management/unitType/unit.type.route");
const modalRouter = require("./routes/inventory-management/model/modal.route");
const brandRouter = require("./routes/inventory-management/brand/brand.route");
const categoryRouter = require("./routes/inventory-management/category/category.route");
const brandProductInitializationRouter = require("./routes/inventory-management/branch-product-initialization/brand.product.initialization.route");
const openingStockRouter = require("./routes/inventory-management/opening-stock/opening.stock.route");
const stockAdjustmentRouter = require("./routes/inventory-management/stock-adjustment/stock.adjustment.route");
const stockReconciliationRouter = require("./routes/inventory-management/stock-reconcilation/stock.reconcilation.router");
const discountRouter = require("./routes/inventory-management/discount/discount.router");
const purchaseProductRouter = require("./routes/inventory-management/purchase-product/purchase.product.router");
const taxRouter = require("./routes/inventory-management/tax/tax.route");
const purchaseRequisitionRouter = require("./routes/inventory-management/purchase-requisition/purchase-requisition.router");
const purchaseQuoteRouter = require("./routes/inventory-management/purchase-quote/purchase-quote.route");

// use
app.use(cors());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "200mb" }));
app.use(bodyParser.json());
app.use(express.static("./uploads"));

const absolutePath = path.join(__dirname, "uploads");
app.use("/src/uploads", express.static(absolutePath));
app.use("/product/image", express.static(absolutePath));

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/roles", roleRouter);
app.use("/hrm-system", hrmSystemRouter);
app.use("/upload-files", fileUploadRouter);

// resource controller
app.use("/inventory-management/contacts", contactRouter);
app.use("/inventory-management/products", productsRouter);
app.use("/inventory-management/products/settings", productSettingsRouter);
app.use(
  "/inventory-management/branch/products/initialization",
  brandProductInitializationRouter
);
app.use("/inventory-management/stock/opening", openingStockRouter);
app.use("/inventory-management/stock/adjustment", stockAdjustmentRouter);
app.use(
  "/inventory-management/stock/reconciliation",
  stockReconciliationRouter
);
app.use("/inventory-management/product/discount", discountRouter);
app.use("/inventory-management/product/purchase", purchaseProductRouter);
app.use(
  "/inventory-management/purchase/requisition",
  purchaseRequisitionRouter
);
app.use("/inventory-management/purchase/quote", purchaseQuoteRouter);
app.use("/inventory-management/variant", variantRouter);
app.use("/inventory-management/product/tax", taxRouter);
app.use("/inventory-management/unit-type", unitTypeRouter);
app.use("/inventory-management/model", modalRouter);
app.use("/inventory-management/brand", brandRouter);
app.use("/inventory-management/category", categoryRouter);

// get
app.get("/", (req, res) => {
  return res
    .status(200)
    .json({ status: "ok", body: { message: "app is running" } });
});

// export
module.exports = app;
