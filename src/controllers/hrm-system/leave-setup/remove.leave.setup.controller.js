// require
const remove = require("../../../base/controllers/remove.controller");

// remove leave setup
const removeLeaveSetup = (req, res) => {
  const { id } = req.params;

  const tableName = "hrm_leave_setup";
  const dataName = "leave setup";

  remove(tableName, id, res, dataName);
};

// export
module.exports = removeLeaveSetup;
