const express = require("express");
const {manualAttendanceReport, dateWiseAttendanceReport, employeeWiseAttendanceReport, summaryReport, employeeMovementReport,} = require("../../../controllers/hrm-system/reports/report.controller");

const reportRouter = express.Router();

reportRouter.get("/manual/attendance", manualAttendanceReport);
reportRouter.get("/date-wise/attendance", dateWiseAttendanceReport);
reportRouter.get("/employee-wise/attendance/report", employeeWiseAttendanceReport);
reportRouter.get("/summary", summaryReport);
reportRouter.get("/employee-movement/report", employeeMovementReport);

module.exports = reportRouter;
