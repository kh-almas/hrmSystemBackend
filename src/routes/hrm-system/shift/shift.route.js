// require
const express = require("express");
const paramsValidation = require("../../../validations/shared/params.validation");
const shiftValidation = require("../../../validations/hrm-system/shift/shift.validation");
const addShiftController = require("../../../controllers/hrm-system/shift/add.shift.controller");
const {
  getShiftController,
  getAllShiftController,
} = require("../../../controllers/hrm-system/shift/get.shift.controller");
const updateShiftController = require("../../../controllers/hrm-system/shift/update.shift.controller");
const removeShift = require("../../../controllers/hrm-system/shift/remove.shift.controller");

// router
const shiftRouter = express.Router();

// post
shiftRouter.post("/", [shiftValidation], addShiftController);

// get
shiftRouter.get("/:id", [paramsValidation], getShiftController);

// get all
shiftRouter.get("/", getAllShiftController);

// put
shiftRouter.put("/:id", [paramsValidation, shiftValidation], updateShiftController);

// delete
shiftRouter.delete("/:id", [paramsValidation], removeShift);

// export
module.exports = shiftRouter;
