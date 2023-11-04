const express = require('express');
const {postEmployeeGradeController, getEmployeeGradeController} = require("../../../controllers/hrm-system/employee-grade/employee.grade.controller");
const employeeGradeValidation = require("../../../validations/hrm-system/employee-grade/employee.grade.validation")
const employeeGradeRouter = express.Router();

// get all
employeeGradeRouter.get("/", getEmployeeGradeController);

// create
employeeGradeRouter.post("/", [employeeGradeValidation], postEmployeeGradeController);

module.exports = employeeGradeRouter;
