// require
const { get, getAll } = require("../../../base/controllers/get.controller");

// column names
const columns = [
  "id",
  "shift_name,",
  "organization_id",
  "company_id",
  "branch_id",
  "weekend",
  "note",
  "status"
];

// table and data names
const tableName = "hrm_employee_shift";
const dataName = "employee shift";

// get one employee shift by id
const getEmployeeShiftController = (req, res) => {
  const { id } = req.params;

  get(columns, tableName, id, dataName, res);
};

// get all employee shift
const getAllEmployeeShiftController = (req, res) => {
  getAll(columns, tableName, dataName, res);
};

module.exports = { getEmployeeShiftController, getAllEmployeeShiftController };
