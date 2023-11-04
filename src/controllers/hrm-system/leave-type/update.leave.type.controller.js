// require
const update = require("../../../base/controllers/update.controller");

// update leave type
const updateLeaveTypeController = (req, res) => {
  const { id } = req.params;

  const leaveType = ({ name, status } = req.body);

  leaveType.updated_by = req.decoded.id;

  const tableName = "hrm_leave_type";
  const dataName = "leave type";

  update(tableName, leaveType, id, res, dataName);
};

// export
module.exports = updateLeaveTypeController;
