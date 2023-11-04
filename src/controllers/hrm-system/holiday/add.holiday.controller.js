// require
const add = require("../../../base/controllers/add.controller");

// add holiday
const addHolidayController = (req, res) => {
  const holiday = ({ date, status } = req.body);
  holiday.created_by = req.decoded.id;

  const tableName = "hrm_holiday";
  const dataName = "holiday";

  add(tableName, holiday, res, dataName);
};

// export
module.exports = addHolidayController;
