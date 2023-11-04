// require
const express = require("express");
const {getAttendanceController, getAllAttendanceController,} = require("../../../controllers/hrm-system/attendance/get.attendance.controller");
const csvAttendanceController = require("../../../controllers/hrm-system/attendance/csv.attendance.controller");

// file upload starts

const multer = require("multer");
const path = require("path");

// storage configuration
const storage = multer.diskStorage({
  // where to save uploaded files
  destination: function (req, file, cb) {
    cb(null, "./src/csvs");
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
  if (file.fieldname === "csv") {
    if (file.mimetype === "text/csv") {
      cb(null, true);
    } else {
      cb(new Error("csv only!"));
    }
  } else {
    cb(new Error("unknown error!"));
  }
};

// initialize upload object
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// to catch file from the frontend with fields and count of files
const cpUpload = upload.single("csv");

// file upload ends

// router
const attendanceRouter = express.Router();

// post
// attendanceRouter.post(
//   "/",
//   [manualAttendanceValidation],
//   addManualAttendanceController
// );

// post a csv
attendanceRouter.post("/attendance/csv", [cpUpload], csvAttendanceController);

// get
// attendanceRouter.get(
//   "/:id",
//   [paramsValidation],
//   getManualAttendanceController
// );

// get all
attendanceRouter.get("/", getAllAttendanceController);

// // put
// attendanceRouter.put(
//   "/:id",
//   [paramsValidation, manualAttendanceValidation],
//   updateManualAttendanceController
// );

// // delete
// attendanceRouter.delete(
//   "/:id",
//   [paramsValidation],
//   removeManualAttendance
// );

// export
module.exports = attendanceRouter;
