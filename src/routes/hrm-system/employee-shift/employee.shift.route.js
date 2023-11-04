// require
const express = require("express");
const paramsValidation = require("../../../validations/shared/params.validation");
const employeeShiftValidation = require("../../../validations/hrm-system/employee-shift/employee.shift.validation");
const addEmployeeShiftController = require("../../../controllers/hrm-system/employee-shift/add.employee.shift.controller");
const {
  getEmployeeShiftController,
  getAllEmployeeShiftController,
} = require("../../../controllers/hrm-system/employee-shift/get.employee.shift.controller");
const updateEmployeeShiftController = require("../../../controllers/hrm-system/employee-shift/update.employee.shift.controller");
const removeEmployeeShift = require("../../../controllers/hrm-system/employee-shift/remove.employee.shift.controller");

// router
const employeeShiftRouter = express.Router();

// post
employeeShiftRouter.post(
  "/",
  [employeeShiftValidation],
  addEmployeeShiftController
);

// get
employeeShiftRouter.get("/:id", [paramsValidation], getEmployeeShiftController);

// get all
employeeShiftRouter.get("/", getAllEmployeeShiftController);

// put
employeeShiftRouter.put(
  "/:id",
  [paramsValidation, employeeShiftValidation],
  updateEmployeeShiftController
);

// delete
employeeShiftRouter.delete("/:id", [paramsValidation], removeEmployeeShift);

// export
module.exports = employeeShiftRouter;
