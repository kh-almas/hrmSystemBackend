// require
const remove = require("../../../base/controllers/remove.controller");

// remove organization
const removeOrganization = (req, res) => {
  const { id } = req.params;

  const tableName = "hrm_organization";
  const dataName = "organization";

  remove(tableName, id, res, dataName);
};

// export
module.exports = removeOrganization;
