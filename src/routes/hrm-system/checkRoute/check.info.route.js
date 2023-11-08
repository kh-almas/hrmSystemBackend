const express = require("express");
const {getAllManualAttendanceControllerForCheck} = require("../../../controllers/hrm-system/checkTable/checkTable.controller");


const checkInfoRouter = express.Router();

checkInfoRouter.get("/info", getAllManualAttendanceControllerForCheck);

module.exports = checkInfoRouter;