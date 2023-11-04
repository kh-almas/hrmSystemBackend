// require
const { get, getAll } = require("../../../base/controllers/get.controller");

// column names
const columns = [
  "id",
  "leave_type_id",
  "total_days",
  "year",
  "carry_forward",
  "status",
];

// table and data names
const tableName = "hrm_leave_setup";
const dataName = "leave setup";

// get one leave setup by id
const getLeaveSetupController = (req, res) => {
  const { id } = req.params;

  get(columns, tableName, id, dataName, res);
};

// get leave setup weekday
const getAllLeaveSetupController = (req, res) => {
  getAll(columns, tableName, dataName, res);
};

module.exports = {
  getLeaveSetupController,
  getAllLeaveSetupController,
};
