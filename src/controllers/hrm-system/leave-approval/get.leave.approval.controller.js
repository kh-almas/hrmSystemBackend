// require
const { get, getAll } = require("../../../base/controllers/get.controller");

// column names
const columns = ["id", "leave_application_id", "status"];

// table and data names
const tableName = "hrm_leave_approval";
const dataName = "leave approval";

// get one leave approval by id
const getLeaveApprovalController = (req, res) => {
  const { id } = req.params;

  get(columns, tableName, id, dataName, res);
};

// get leave approval weekday
const getAllLeaveApprovalController = (req, res) => {
  getAll(columns, tableName, dataName, res);
};

module.exports = {
  getLeaveApprovalController,
  getAllLeaveApprovalController,
};
