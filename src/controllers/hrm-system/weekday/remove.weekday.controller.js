// require
const remove = require("../../../base/controllers/remove.controller");

// remove weekday
const removeWeekday = (req, res) => {
  const { id } = req.params;

  const tableName = "hrm_weekday";
  const dataName = "weekday";

  remove(tableName, id, res, dataName);
};

// export
module.exports = removeWeekday;
