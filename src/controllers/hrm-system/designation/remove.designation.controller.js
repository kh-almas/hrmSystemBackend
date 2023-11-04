// require
const remove = require("../../../base/controllers/remove.controller");

// remove designation
const removeDesignation = (req, res) => {
  const { id } = req.params;

  const tableName = "hrm_designation";
  const dataName = "designation";

  remove(tableName, id, res, dataName);
};

// export
module.exports = removeDesignation;
