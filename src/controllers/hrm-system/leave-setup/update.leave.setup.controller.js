// require
const update = require("../../../base/controllers/update.controller");

// update leave setup
const updateLeaveSetupController = (req, res) => {
  const { id } = req.params;

  const leaveSetup = ({
    leave_type_id,
    total_days,
    year,
    carry_forward,
    status,
  } = req.body);

  leaveSetup.updated_by = req.decoded.id;

  const tableName = "hrm_leave_setup";
  const dataName = "leave setup";

  update(tableName, leaveSetup, id, res, dataName);
};

// export
module.exports = updateLeaveSetupController;
