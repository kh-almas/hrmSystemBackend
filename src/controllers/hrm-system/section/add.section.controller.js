// require
const add = require("../../../base/controllers/add.controller");

// add section
const addSectionController = (req, res) => {
  const section = ({ name, status, company_id, department_id } = req.body);
  section.created_by = req.decoded.id;

  const tableName = "hrm_section";
  const dataName = "section";

  add(tableName, section, res, dataName);
};

// export
module.exports = addSectionController;
