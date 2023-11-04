// require
const { get, getAll } = require("../../../base/controllers/get.controller");

// column names
const columns = ["id", "type", "status"];

// table and data names
const tableName = "hrm_leave_type";
const dataName = "leave type";

// get one leave type by id
const getLeaveTypeController = (req, res) => {
  const { id } = req.params;

  get(columns, tableName, id, dataName, res);
};

// get leave type weekday
const getAllLeaveTypeController = (req, res) => {
  getAll(columns, tableName, dataName, res);
};

module.exports = {
  getLeaveTypeController,
  getAllLeaveTypeController,
};
