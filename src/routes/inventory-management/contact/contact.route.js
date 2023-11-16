// require
const express = require("express");
const userVerify = require("../../../middlewares/auth/user.verify");
const addContact = require("../../../controllers/inventory-management/contact/add.contact.controller");
const addContactValidation = require("../../../validations/inventory-management/contact/add.contact.validation");
const {getContact, getAllContact,} = require("../../../controllers/inventory-management/contact/get.contact.controller");
const getContactParamsValidation = require("../../../validations/inventory-management/contact/get.contact.params.validation");
const updateContact = require("../../../controllers/inventory-management/contact/update.contact.controller");
const deleteContact = require("../../../controllers/inventory-management/contact/delete.contact.controller");
const paramsValidation = require("../../../validations/shared/params.validation");
const getContactImageController = require("../../../controllers/inventory-management/contact/get.contact.image.controller");

// file upload starts

const multer = require("multer");
const path = require("path");

// storage configuration
const storage = multer.diskStorage({
  // where to save uploaded files
  destination: function (req, file, cb) {
    cb(null, "./src/uploads");
  },
  // what will be the files names
  filename: function (req, file, cb) {
    const fileExt = path.extname(file.originalname);
    const newFileName = file.originalname.replace(fileExt, "").toLocaleLowerCase().split(" ").join("-").concat(`-${Date.now()}${fileExt}`);
    cb(null, newFileName);
  },
});

// what kinds files to be accepted
const fileFilter = function (req, file, cb) {
  if (file.fieldname === "image") {
    if (file.mimetype === "image/jpeg") {
      cb(null, true);
    } else {
      cb(new Error("jpg or jpeg only!"));
    }
  } else {
    cb(new Error("unknown error!"));
  }
};

// initialize upload object
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2000000, // 2 * 1000 * 1000 in bytes 2 mb
  },
  fileFilter: fileFilter,
});

// to catch file from the frontend with fields and count of files
const cpUpload = upload.fields([
  { name: "image", maxCount: 1 }
]);

// file upload ends


// router
const contactRouter = express.Router();

// use
contactRouter.use(userVerify);

// post
contactRouter.post("/add", [cpUpload, addContactValidation], addContact);


contactRouter.use((err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      return res.status(403).json({
        status: "multer error",
        body: { message: err.message },
      });
    } else {
      return res.status(403).json({
        status: "file error",
        body: { message: err.message },
      });
    }
  } else {
    return res.status(200).json({
      status: "ok",
      body: { message: "success" },
    });
  }
});


// get
contactRouter.get("/:id", getContact);

// get image
contactRouter.get("/image/:id", getContactImageController);

// get all
contactRouter.get(
  "/all/:contact_type",
  [getContactParamsValidation],
  getAllContact
);

// update
contactRouter.put("/update-contact/:id", [cpUpload, addContactValidation], updateContact);

// delete
contactRouter.delete("/delete-contact/:id", [paramsValidation], deleteContact);

// export
module.exports = contactRouter;
