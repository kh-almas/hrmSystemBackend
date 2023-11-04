// require
const express = require("express");
const paramsValidation = require("../../../validations/shared/params.validation");
const leaveApprovalValidation = require("../../../validations/hrm-system/leave-approval/leave.approval.validation");
const addLeaveApprovalController = require("../../../controllers/hrm-system/leave-approval/add.leave.approval.controller");
const {getLeaveApprovalController, getAllLeaveApprovalController,} = require("../../../controllers/hrm-system/leave-approval/get.leave.approval.controller");
const updateLeaveApprovalController = require("../../../controllers/hrm-system/leave-approval/update.leave.approval.controller");
const removeLeaveApproval = require("../../../controllers/hrm-system/leave-approval/remove.leave.approval.controller");

// router
const leaveApprovalRouter = express.Router();

// post
leaveApprovalRouter.post("/", [leaveApprovalValidation], addLeaveApprovalController);

// get
leaveApprovalRouter.get("/:id", [paramsValidation], getLeaveApprovalController);

// get all
leaveApprovalRouter.get("/", getAllLeaveApprovalController);

// put
leaveApprovalRouter.put("/:id", [paramsValidation, leaveApprovalValidation], updateLeaveApprovalController);

// delete
leaveApprovalRouter.delete("/:id", [paramsValidation], removeLeaveApproval);

// export
module.exports = leaveApprovalRouter;
