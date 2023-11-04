// require
const update = require("../../../base/controllers/update.controller");

// update department
const updateDepartmentController = (req, res) => {
  const { id } = req.params;

  const department = ({ name, details, status } = req.body);

  department.updated_by = req.decoded.id;

  const tableName = "hrm_department";
  const dataName = "department";

  update(tableName, department, id, res, dataName);
};

// export
module.exports = updateDepartmentController;
