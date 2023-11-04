// require
const add = require("../../../base/controllers/add.controller");

// add leave application
const addLeaveApplicationController = (req, res) => {
  const leaveApplication = ({ leave_type_id, date_from, date_to, status } =
    req.body);
  leaveApplication.created_by = req.decoded.id;

  const tableName = "hrm_leave_application";
  const dataName = "leave application";

  add(tableName, leaveApplication, res, dataName);
};

// export
module.exports = addLeaveApplicationController;
