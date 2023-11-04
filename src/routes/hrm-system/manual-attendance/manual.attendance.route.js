// require
const express = require("express");
const paramsValidation = require("../../../validations/shared/params.validation");
const manualAttendanceValidation = require("../../../validations/hrm-system/manual-attendance/manual.attendance.validation");
const addManualAttendanceController = require("../../../controllers/hrm-system/manual-attendance/add.manual.attendance.controller");
const {
  getManualAttendanceController,
  getAllManualAttendanceController,
} = require("../../../controllers/hrm-system/manual-attendance/get.manual.attendance.controller");
const updateManualAttendanceController = require("../../../controllers/hrm-system/manual-attendance/update.manual.attendance.controller");
const removeManualAttendance = require("../../../controllers/hrm-system/manual-attendance/remove.manual.attendance.controller");
const searchValidation = require("../../../validations/shared/search.validation");
const csvManualAttendanceController = require("../../../controllers/hrm-system/manual-attendance/csv.manual.attendance.controller");

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
const manualAttendanceRouter = express.Router();

// post
manualAttendanceRouter.post(
  "/",
  [manualAttendanceValidation],
  addManualAttendanceController
);

// post a csv
manualAttendanceRouter.post("/csv", [cpUpload], csvManualAttendanceController);

// get
manualAttendanceRouter.get(
  "/:id",
  [paramsValidation],
  getManualAttendanceController
);

// get all
manualAttendanceRouter.get("/", getAllManualAttendanceController);

// put
manualAttendanceRouter.put(
  "/:id",
  [paramsValidation, manualAttendanceValidation],
  updateManualAttendanceController
);

// delete
manualAttendanceRouter.delete(
  "/:id",
  [paramsValidation],
  removeManualAttendance
);

// export
module.exports = manualAttendanceRouter;
