// require
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')

const userRouter = require("./routes/user/user.route");
const roleRouter = require("./routes/user/role.route");
const authRouter = require("./routes/auth/auth.route");
const contactRouter = require("./routes/inventory-management/contact/contact.route");
const productsRouter = require("./routes/inventory-management/product/product.route");
const hrmSystemRouter = require("./routes/hrm-system/hrm.system.route");
const fileUploadRouter = require("./file-upload/file.upload");

// app
const app = express();

// use
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('./uploads'));

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/roles", roleRouter);
app.use("/hrm-system", hrmSystemRouter);
app.use("/upload-files", fileUploadRouter);
app.use("/inventory-management/contacts", contactRouter);
app.use("/inventory-management/products", productsRouter);

// get
app.get("/", (req, res) => {
  return res
    .status(200)
    .json({ status: "ok", body: { message: "app is running" } });
});

// export
module.exports = app;
