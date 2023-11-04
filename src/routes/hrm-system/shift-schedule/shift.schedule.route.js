// require
const express = require("express");
const paramsValidation = require("../../../validations/shared/params.validation");
const shiftScheduleValidation = require("../../../validations/hrm-system/shift-schedule/shift.schedule.validation");
const addShiftScheduleController = require("../../../controllers/hrm-system/shift-schedule/add.shift.schedule.controller");
const {
  getShiftScheduleController,
  getAllShiftScheduleController,
} = require("../../../controllers/hrm-system/shift-schedule/get.shift.schedule.controller");
const updateShiftScheduleController = require("../../../controllers/hrm-system/shift-schedule/update.shift.schedule.controller");
const removeShiftSchedule = require("../../../controllers/hrm-system/shift-schedule/remove.shift.schedule.controller");

// router
const shiftScheduleRouter = express.Router();

// post
shiftScheduleRouter.post(
  "/",
  [shiftScheduleValidation],
  addShiftScheduleController
);

// get
shiftScheduleRouter.get("/:id", [paramsValidation], getShiftScheduleController);

// get all
shiftScheduleRouter.get("/", getAllShiftScheduleController);

// put
shiftScheduleRouter.put(
  "/:id",
  [paramsValidation, shiftScheduleValidation],
  updateShiftScheduleController
);

// delete
shiftScheduleRouter.delete("/:id", [paramsValidation], removeShiftSchedule);

// export
module.exports = shiftScheduleRouter;
