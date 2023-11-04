// require
const { get, getAll } = require("../../../base/controllers/get.controller");

// column names
const columns = ["id", "date", "status"];

// table and data names
const tableName = "hrm_holiday";
const dataName = "holiday";

// get one holiday by id
const getHolidayController = (req, res) => {
  const { id } = req.params;

  get(columns, tableName, id, dataName, res);
};

// get all holiday
const getAllHolidayController = (req, res) => {
  getAll(columns, tableName, dataName, res);
};

module.exports = { getHolidayController, getAllHolidayController };
