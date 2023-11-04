// require
const add = require("../../../base/controllers/add.controller");

// add leave type
const addLeaveTypeController = (req, res) => {
  const leaveType = ({ type, status } = req.body);
  leaveType.created_by = req.decoded.id;

  const tableName = "hrm_leave_type";
  const dataName = "leave type";

  add(tableName, leaveType, res, dataName);
};

// export
module.exports = addLeaveTypeController;
