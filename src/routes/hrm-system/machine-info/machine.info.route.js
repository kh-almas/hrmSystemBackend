const express = require("express");
const { manualAttendanceReport, dateWiseAttendanceReport } = require("../../../controllers/hrm-system/reports/report.controller");
const {addMachineInfoController, getMachineInfoController, updateMachineInfoController, deleteMachineInfoController} = require("../../../controllers/hrm-system/machine-info/machine.controller");


const machineInfoRouter = express.Router();

machineInfoRouter.post("/info", addMachineInfoController);
machineInfoRouter.get("/info", getMachineInfoController);
machineInfoRouter.put("/info/:id", updateMachineInfoController);
machineInfoRouter.delete("/info/:id", deleteMachineInfoController);

module.exports = machineInfoRouter;