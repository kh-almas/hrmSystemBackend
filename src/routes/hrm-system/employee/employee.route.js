// require
const express = require("express");
const paramsValidation = require("../../../validations/shared/params.validation");
const employeeValidation = require("../../../validations/hrm-system/employee/employee.validation");
const addEmployeeController = require("../../../controllers/hrm-system/employee/add.employee.controller");
const {
  getEmployeeController,
  getAllEmployeeController,
} = require("../../../controllers/hrm-system/employee/get.employee.controller");
const updateEmployeeController = require("../../../controllers/hrm-system/employee/update.employee.controller");
const removeEmployee = require("../../../controllers/hrm-system/employee/remove.employee.controller");
const removeContact = require("../../../controllers/hrm-system/employee/remove.contact.controller");
const getEmployeeImageController = require("../../../controllers/hrm-system/employee/get.employee.image.controller");
const getEmployeeCvController = require("../../../controllers/hrm-system/employee/get.employee.cv.controller");

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

// file upload ends

// router
const employeeRouter = express.Router();

// post
employeeRouter.post("/", [cpUpload], addEmployeeController);

employeeRouter.use((err, req, res, next) => {
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
employeeRouter.get("/:id", [paramsValidation], getEmployeeController);

// get image
employeeRouter.get("/image/:id", [paramsValidation], getEmployeeImageController);

// get cv
employeeRouter.get("/cv/:id", [paramsValidation], getEmployeeCvController);

// get all
employeeRouter.get("/", getAllEmployeeController);

// put
employeeRouter.patch("/:id", [cpUpload], updateEmployeeController);

// delete
employeeRouter.delete("/:id", [paramsValidation], removeEmployee);

// delete
employeeRouter.delete("/contact/:id", [paramsValidation], removeContact);

// export
module.exports = employeeRouter;
