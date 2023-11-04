// require
const update = require("../../../base/controllers/update.controller");

// update section
const updateSectionController = (req, res) => {
  const { id } = req.params;

  const section = ({ name, status, department_id } = req.body);

  section.updated_by = req.decoded.id;

  const tableName = "hrm_section";
  const dataName = "section";

  update(tableName, section, id, res, dataName);
};

// export
module.exports = updateSectionController;
