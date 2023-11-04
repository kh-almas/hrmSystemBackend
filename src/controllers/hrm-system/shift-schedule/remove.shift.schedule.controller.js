// require
const remove = require("../../../base/controllers/remove.controller");

// remove shift schedule
const removeShiftSchedule = (req, res) => {
  const { id } = req.params;

  const tableName = "hrm_shift_schedule";
  const dataName = "shift schedule";

  remove(tableName, id, res, dataName);
};

// export
module.exports = removeShiftSchedule;
