// require
const { get, getAll } = require("../../../base/controllers/get.controller");

// column names
const columns = [
  "id",
  "name",
  "description",
  "start_date",
  "end_date",
  "total_employees",
  "status",
  "company_id",
];

// table and data names
const tableName = "hrm_project";
const dataName = "project";

// get one project by id
const getProjectController = (req, res) => {
  const { id } = req.params;

  get(columns, tableName, id, dataName, res);
};

// get all project
const getAllProjectController = (req, res) => {
  getAll(columns, tableName, dataName, res);
};

module.exports = { getProjectController, getAllProjectController };
