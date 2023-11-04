// require
const remove = require("../../../base/controllers/remove.controller");

// remove section
const removeSection = (req, res) => {
  const { id } = req.params;

  const tableName = "hrm_section";
  const dataName = "section";

  remove(tableName, id, res, dataName);
};

// export
module.exports = removeSection;
