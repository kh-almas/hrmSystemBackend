// require
const remove = require("../../../base/controllers/remove.controller");

// remove holiday
const removeHoliday = (req, res) => {
  const { id } = req.params;

  const tableName = "hrm_holiday";
  const dataName = "holiday";

  remove(tableName, id, res, dataName);
};

// export
module.exports = removeHoliday;
