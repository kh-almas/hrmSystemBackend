// require
const express = require("express");
const paramsValidation = require("../../../validations/shared/params.validation");
const leaveApplicationValidation = require("../../../validations/hrm-system/leave-application/leave.application.validation");
const addLeaveApplicationController = require("../../../controllers/hrm-system/leave-application/add.leave.application.controller");
const {
  getLeaveApplicationController,
  getAllLeaveApplicationController,
} = require("../../../controllers/hrm-system/leave-application/get.leave.application.controller");
const updateLeaveApplicationController = require("../../../controllers/hrm-system/leave-application/update.leave.application.controller");
const removeLeaveApplication = require("../../../controllers/hrm-system/leave-application/remove.leave.application.controller");

// router
const leaveApplicationRouter = express.Router();

// post
leaveApplicationRouter.post(
  "/",
  [leaveApplicationValidation],
  addLeaveApplicationController
);

// get
leaveApplicationRouter.get(
  "/:id",
  [paramsValidation],
  getLeaveApplicationController
);

// get all
leaveApplicationRouter.get("/", getAllLeaveApplicationController);

// put
leaveApplicationRouter.put(
  "/:id",
  [paramsValidation, leaveApplicationValidation],
  updateLeaveApplicationController
);

// delete
leaveApplicationRouter.delete(
  "/:id",
  [paramsValidation],
  removeLeaveApplication
);

// export
module.exports = leaveApplicationRouter;
