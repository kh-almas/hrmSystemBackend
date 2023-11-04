// require
const remove = require("../../../base/controllers/remove.controller");

// remove leave approval
const removeLeaveApproval = (req, res) => {
  const { id } = req.params;

  const tableName = "hrm_leave_approval";
  const dataName = "leave approval";

  remove(tableName, id, res, dataName);
};

// export
module.exports = removeLeaveApproval;
