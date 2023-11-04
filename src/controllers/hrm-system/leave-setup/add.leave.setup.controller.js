// require
const add = require("../../../base/controllers/add.controller");

// add leave setup
const addLeaveSetupController = (req, res) => {
  const leaveSetup = ({
    leave_type_id,
    total_days,
    year,
    carry_forward,
    status,
  } = req.body);
  leaveSetup.created_by = req.decoded.id;

  const tableName = "hrm_leave_setup";
  const dataName = "leave setup";

  add(tableName, leaveSetup, res, dataName);
};

// export
module.exports = addLeaveSetupController;
