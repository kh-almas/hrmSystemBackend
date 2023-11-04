// require
const update = require("../../../base/controllers/update.controller");

// update weekday
const updateWeekdayController = (req, res) => {
  const { id } = req.params;

  const weekday = ({ name, status } = req.body);

  weekday.updated_by = req.decoded.id;

  const tableName = "hrm_weekday";
  const dataName = "weekday";

  update(tableName, weekday, id, res, dataName);
};

// export
module.exports = updateWeekdayController;
