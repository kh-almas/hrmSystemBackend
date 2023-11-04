// require
const add = require("../../../base/controllers/add.controller");

// add leave approval
const addLeaveApprovalController = (req, res) => {
  const leaveApproval = ({ leave_application_id, status } = req.body);
  leaveApproval.created_by = req.decoded.id;

  const tableName = "hrm_leave_approval";
  const dataName = "leave approval";

  add(tableName, leaveApproval, res, dataName);
};

// export
module.exports = addLeaveApprovalController;
