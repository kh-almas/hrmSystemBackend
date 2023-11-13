const express = require("express");
const {getAllManualAttendanceControllerForCheck, getAllManualAttendanceControllerForCheckForDropdown} = require("../../../controllers/hrm-system/checkTable/checkTable.controller");


const checkInfoRouter = express.Router();

checkInfoRouter.get("/info", getAllManualAttendanceControllerForCheck);

checkInfoRouter.get("/info2", getAllManualAttendanceControllerForCheckForDropdown);

module.exports = checkInfoRouter;