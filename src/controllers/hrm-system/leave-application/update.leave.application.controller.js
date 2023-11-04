// require
const update = require("../../../base/controllers/update.controller");

// update leave application
const updateLeaveApplicationController = (req, res) => {
  const { id } = req.params;

  const leaveApplication = ({ leave_type_id, date_from, date_to, status } =
    req.body);

  leaveApplication.updated_by = req.decoded.id;

  const tableName = "hrm_leave_application";
  const dataName = "leave application";

  update(tableName, leaveApplication, id, res, dataName);
};

// export
module.exports = updateLeaveApplicationController;
