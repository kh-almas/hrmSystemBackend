// require
const remove = require("../../../base/controllers/remove.controller");

// remove leave application
const removeLeaveApplication = (req, res) => {
  const { id } = req.params;

  const tableName = "hrm_leave_application";
  const dataName = "leave application";

  remove(tableName, id, res, dataName);
};

// export
module.exports = removeLeaveApplication;
