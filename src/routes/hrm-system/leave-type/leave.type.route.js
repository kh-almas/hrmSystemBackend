// require
const express = require("express");
const paramsValidation = require("../../../validations/shared/params.validation");
const leaveTypeValidation = require("../../../validations/hrm-system/leave-type/leave.type.validation");
const addLeaveTypeController = require("../../../controllers/hrm-system/leave-type/add.leave.type.controller");
const {
  getLeaveTypeController,
  getAllLeaveTypeController,
} = require("../../../controllers/hrm-system/leave-type/get.leave.type.controller");
const updateLeaveTypeController = require("../../../controllers/hrm-system/leave-type/update.leave.type.controller");
const removeLeaveType = require("../../../controllers/hrm-system/leave-type/remove.leave.type.controller");

// router
const leaveTypeRouter = express.Router();

// post
leaveTypeRouter.post("/", [leaveTypeValidation], addLeaveTypeController);

// get
leaveTypeRouter.get("/:id", [paramsValidation], getLeaveTypeController);

// get all
leaveTypeRouter.get("/", getAllLeaveTypeController);

// put
leaveTypeRouter.put(
  "/:id",
  [paramsValidation, leaveTypeValidation],
  updateLeaveTypeController
);

// delete
leaveTypeRouter.delete("/:id", [paramsValidation], removeLeaveType);

// export
module.exports = leaveTypeRouter;
