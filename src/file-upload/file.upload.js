// require
const multer = require("multer");
const path = require("path");
const express = require("express");
const userVerify = require("../middlewares/auth/user.verify");

// storage configuration
const storage = multer.diskStorage({
  // where to save uploaded files
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  // what will be the files names
  filename: function (req, file, cb) {
    const fileExt = path.extname(file.originalname);
    const newFileName = file.originalname
      .replace(fileExt, "")
      .toLocaleLowerCase()
      .split(" ")
      .join("-")
      .concat(`-${Date.now()}${fileExt}`);
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
  } else if (file.fieldname === "cv") {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("pdf only!"));
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
  { name: "image", maxCount: 1 },
  { name: "cv", maxCount: 1 },
]);

const fileUploadRouter = express.Router();

// auth verify
fileUploadRouter.use(userVerify);

// file upload route
fileUploadRouter.post("/", [cpUpload], function (req, res, next) {
  return res.status(200).json({
    status: "ok",
    body: {
      message: "files uploaded",
      image: req.files.image[0].path,
      cv: req.files.cv[0].path,
    },
  });
});

// default error handle
fileUploadRouter.use((err, req, res, next) => {
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

module.exports = fileUploadRouter;
