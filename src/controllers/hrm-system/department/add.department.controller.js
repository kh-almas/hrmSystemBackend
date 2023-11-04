// require
const add = require("../../../base/controllers/add.controller");

// add department
const addDepartmentController = (req, res) => {
  const department = ({ name, details, status } = req.body);
  department.created_by = req.decoded.id;

  const tableName = "hrm_department";
  const dataName = "department";

  add(tableName, department, res, dataName);
};

// export
module.exports = addDepartmentController;
