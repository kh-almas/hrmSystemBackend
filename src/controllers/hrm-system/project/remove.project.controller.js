// require
const remove = require("../../../base/controllers/remove.controller");

// remove project
const removeProject = (req, res) => {
  const { id } = req.params;

  const tableName = "hrm_project";
  const dataName = "project";

  remove(tableName, id, res, dataName);
};

// export
module.exports = removeProject;
