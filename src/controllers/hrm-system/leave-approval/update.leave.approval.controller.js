// require
const update = require("../../../base/controllers/update.controller");

// update leave approval
const updateLeaveApprovalController = (req, res) => {
  const { id } = req.params;

  const leaveApproval = ({ leave_application_id, status } = req.body);

  leaveApproval.updated_by = req.decoded.id;

  const tableName = "hrm_leave_approval";
  const dataName = "leave approval";

  update(tableName, leaveApproval, id, res, dataName);
};

// export
module.exports = updateLeaveApprovalController;
