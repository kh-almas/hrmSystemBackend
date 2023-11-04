// require
const remove = require("../../../base/controllers/remove.controller");

// remove employee shift
const removeEmployeeShift = (req, res) => {
  const { id } = req.params;

  const tableName = "hrm_employee_shift";
  const dataName = "employee shift";

  remove(tableName, id, res, dataName);
};

// export
module.exports = removeEmployeeShift;
