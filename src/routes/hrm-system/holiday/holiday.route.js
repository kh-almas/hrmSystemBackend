// require
const express = require("express");
const paramsValidation = require("../../../validations/shared/params.validation");
const holidayValidation = require("../../../validations/hrm-system/holiday/holiday.validation");
const {
  postHolidayController,
  getHolidayController,
  getAllHolidayController,
  putHolidayController,
  deleteHolidayController,
} = require("../../../controllers/hrm-system/holiday/holiday.controller");

// router
const holidayRouter = express.Router();

// post
holidayRouter.post("/", [holidayValidation], postHolidayController);

// get
holidayRouter.get("/:id", [paramsValidation], getHolidayController);

// get all
holidayRouter.get("/", getAllHolidayController);

// put
holidayRouter.put(
  "/:id",
  [paramsValidation, holidayValidation],
  putHolidayController
);

// delete
holidayRouter.delete("/:id", [paramsValidation], deleteHolidayController);

// export
module.exports = holidayRouter;
