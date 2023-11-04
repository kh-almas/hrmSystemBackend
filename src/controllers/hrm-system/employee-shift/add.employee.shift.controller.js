// require
const add = require("../../../base/controllers/add.controller");

// add employee shift
const addEmployeeShiftController = (req, res) => {
  const employeeShift = ({ id, shift_name, organization_id, company_id, branch_id, weekend, note, status } = req.body);
  employeeShift.created_by = req.decoded.id;

  const tableName = "hrm_employee_shift";
  const dataName = "employee shift";

  add(tableName, employeeShift, res, dataName)
};

// export
module.exports = addEmployeeShiftController;
