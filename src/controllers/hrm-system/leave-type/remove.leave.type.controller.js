// require
const remove = require("../../../base/controllers/remove.controller");

// remove leave type
const removeLeaveType = (req, res) => {
  const { id } = req.params;

  const tableName = "hrm_leave_type";
  const dataName = "leave type";

  remove(tableName, id, res, dataName);
};

// export
module.exports = removeLeaveType;
