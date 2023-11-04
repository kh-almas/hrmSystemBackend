// require
const update = require("../../../base/controllers/update.controller");

// update holiday
const updateHolidayController = (req, res) => {
  const { id } = req.params;

  const holiday = ({ date, status } = req.body);

  holiday.updated_by = req.decoded.id;

  const tableName = "hrm_holiday";
  const dataName = "holiday";

  update(tableName, holiday, id, res, dataName);
};

// export
module.exports = updateHolidayController;
