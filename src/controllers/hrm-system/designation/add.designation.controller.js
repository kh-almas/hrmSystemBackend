// require
const add = require("../../../base/controllers/add.controller");

// add designation
const addDesignationController = (req, res) => {
  const designation = ({ name, details, organization_id, company_id, status } = req.body);
  designation.created_by = req.decoded.id;

  const tableName = "hrm_designation";
  const dataName = "designation";

  add(tableName, designation, res, dataName);
};

// export
module.exports = addDesignationController;
