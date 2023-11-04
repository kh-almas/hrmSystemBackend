const express = require("express");
const {getEmployeeContactController, postEmployeeContactController} = require("../../../controllers/hrm-system/employee-contact/employee.contact.controller");
const employeeContactValidation = require("../../../validations/hrm-system/employee-contact/employee.contact.validation");

const employeeContactRoute = express.Router();


employeeContactRoute.get("/", getEmployeeContactController);

employeeContactRoute.post("/", [employeeContactValidation], postEmployeeContactController)



module.exports = employeeContactRoute;