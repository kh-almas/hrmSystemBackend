// require
const express = require("express");
const paramsValidation = require("../../../validations/shared/params.validation");
const weekValidation = require("../../../validations/hrm-system/weekday/weekday.validation");
const addWeekdayController = require("../../../controllers/hrm-system/weekday/add.weekday.controller");
const {
  getWeekdayController,
  getAllWeekdayController,
} = require("../../../controllers/hrm-system/weekday/get.weekday.controller");
const updateWeekdayController = require("../../../controllers/hrm-system/weekday/update.weekday.controller");
const removeWeekday = require("../../../controllers/hrm-system/weekday/remove.weekday.controller");

// router
const weekdayRouter = express.Router();

// post
weekdayRouter.post("/", [weekValidation], addWeekdayController);

// get
weekdayRouter.get("/:id", [paramsValidation], getWeekdayController);

// get all
weekdayRouter.get("/", getAllWeekdayController);

// put
weekdayRouter.put(
  "/:id",
  [paramsValidation, weekValidation],
  updateWeekdayController
);

// delete
weekdayRouter.delete("/:id", [paramsValidation], removeWeekday);

// export
module.exports = weekdayRouter;
