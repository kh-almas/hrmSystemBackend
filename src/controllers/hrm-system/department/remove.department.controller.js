// require
const remove = require("../../../base/controllers/remove.controller");

// remove department
const removeDepartment = (req, res) => {
  const { id } = req.params;

  const tableName = "hrm_department";
  const dataName = "department";

  remove(tableName, id, res, dataName);
};

// export
module.exports = removeDepartment;
