// require
const update = require("../../../base/controllers/update.controller");

// update shift schedule
const updateShiftScheduleController = (req, res) => {
  const { id } = req.params;

  const shiftSchedule = ({
    date_from,
    date_to,
    shift_from,
    shift_to,
    active_on,
    status,
  } = req.body);
  shiftSchedule.updated_by = req.decoded.id;

  const tableName = "hrm_shift_schedule";
  const dataName = "shift schedule";

  update(tableName, shiftSchedule, id, res, dataName);
};

// export
module.exports = updateShiftScheduleController;
