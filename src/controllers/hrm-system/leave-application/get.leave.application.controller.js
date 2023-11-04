// require
const { get, getAll } = require("../../../base/controllers/get.controller");

// column names
const columns = ["id", "leave_type_id", "date_from", "date_to", "status"];

// table and data names
const tableName = "hrm_leave_application";
const dataName = "leave application";

// get one leave application by id
const getLeaveApplicationController = (req, res) => {
  const { id } = req.params;

  get(columns, tableName, id, dataName, res);
};

// get leave application weekday
const getAllLeaveApplicationController = (req, res) => {
  getAll(columns, tableName, dataName, res);
};

module.exports = {
  getLeaveApplicationController,
  getAllLeaveApplicationController,
};
