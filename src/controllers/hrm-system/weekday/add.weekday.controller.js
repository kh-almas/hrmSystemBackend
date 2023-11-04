// require
const add = require("../../../base/controllers/add.controller");

// add weekday
const addWeekdayController = (req, res) => {
  const weekday = ({ name, status } = req.body);
  weekday.created_by = req.decoded.id;

  const tableName = "hrm_weekday";
  const dataName = "weekday";

  add(tableName, weekday, res, dataName);
};

// export
module.exports = addWeekdayController;
