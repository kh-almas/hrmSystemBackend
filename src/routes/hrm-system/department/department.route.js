// require
const express = require("express");
const paramsValidation = require("../../../validations/shared/params.validation");
const departmentValidation = require("../../../validations/hrm-system/department/department.validation");
const addDepartmentController = require("../../../controllers/hrm-system/department/add.department.controller");
const {
  getDepartmentController,
  getAllDepartmentController,
} = require("../../../controllers/hrm-system/department/get.department.controller");
const updateDepartmentController = require("../../../controllers/hrm-system/department/update.department.controller");
const removeDepartment = require("../../../controllers/hrm-system/department/remove.department.controller");

// router
const departmentRouter = express.Router();

// post
departmentRouter.post("/", [departmentValidation], addDepartmentController);

// get
departmentRouter.get("/:id", [paramsValidation], getDepartmentController);

// get all
departmentRouter.get("/", getAllDepartmentController);

// put
departmentRouter.put(
  "/:id",
  [paramsValidation, departmentValidation],
  updateDepartmentController
);

// delete
departmentRouter.delete("/:id", [paramsValidation], removeDepartment);

// export
module.exports = departmentRouter;
