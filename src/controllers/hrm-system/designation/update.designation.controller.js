// require
const update = require("../../../base/controllers/update.controller");

// update designation
const updateDesignationController = (req, res) => {
  const { id } = req.params;

  const designation = ({ name, status } = req.body);

  designation.updated_by = req.decoded.id;

  const tableName = "hrm_designation";
  const dataName = "designation";

  update(tableName, designation, id, res, dataName);
};

// export
module.exports = updateDesignationController;
