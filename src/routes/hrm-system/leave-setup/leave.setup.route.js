// require
const express = require("express");
const paramsValidation = require("../../../validations/shared/params.validation");
const leaveSetupValidation = require("../../../validations/hrm-system/leave-setup/leave.setup.validation");
const addLeaveSetupController = require("../../../controllers/hrm-system/leave-setup/add.leave.setup.controller");
const {
  getLeaveSetupController,
  getAllLeaveSetupController,
} = require("../../../controllers/hrm-system/leave-setup/get.leave.setup.controller");
const updateLeaveSetupController = require("../../../controllers/hrm-system/leave-setup/update.leave.setup.controller");
const removeLeaveSetup = require("../../../controllers/hrm-system/leave-setup/remove.leave.setup.controller");

// router
const leaveSetupRouter = express.Router();

// post
leaveSetupRouter.post("/", [leaveSetupValidation], addLeaveSetupController);

// get
leaveSetupRouter.get("/:id", [paramsValidation], getLeaveSetupController);

// get all
leaveSetupRouter.get("/", getAllLeaveSetupController);

// put
leaveSetupRouter.put(
  "/:id",
  [paramsValidation, leaveSetupValidation],
  updateLeaveSetupController
);

// delete
leaveSetupRouter.delete("/:id", [paramsValidation], removeLeaveSetup);

// export
module.exports = leaveSetupRouter;
