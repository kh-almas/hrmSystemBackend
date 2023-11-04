// require
const remove = require("../../../base/controllers/remove.controller");

// remove employee
const removeEmployee = (req, res) => {
  const { id } = req.params;

  const tableName = "hrm_employee";
  const dataName = "employee";

  remove(tableName, id, res, dataName);
};

// export
module.exports = removeEmployee;
