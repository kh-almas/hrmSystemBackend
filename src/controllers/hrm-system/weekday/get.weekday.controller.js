// require
const { get, getAll } = require("../../../base/controllers/get.controller");

// column names
const columns = ["id", "name", "status"];

// table and data names
const tableName = "hrm_weekday";
const dataName = "weekday";

// get one weekday by id
const getWeekdayController = (req, res) => {
  const { id } = req.params;

  get(columns, tableName, id, dataName, res);
};

// get all weekday
const getAllWeekdayController = (req, res) => {
  getAll(columns, tableName, dataName, res);
};

module.exports = { getWeekdayController, getAllWeekdayController };
