const express = require('express');
const salaryGradeValidation = require("../../../validations/hrm-system/salary-grade/salary.grade.validation");
const { getSalaryGradeController, postSalaryGradeController } = require("../../../controllers/hrm-system/salary-grade/salary.grade.controller")

const salaryGradeRouter = express.Router();

// get all
salaryGradeRouter.get("/", getSalaryGradeController);

// create
salaryGradeRouter.post("/", [salaryGradeValidation], postSalaryGradeController);

module.exports = salaryGradeRouter;
