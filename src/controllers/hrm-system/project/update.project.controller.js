// require
const update = require("../../../base/controllers/update.controller");

// update project
const updateProjectController = (req, res) => {
  const { id } = req.params;

  const project = ({
    name,
    description,
    start_date,
    end_date,
    total_employees,
    status,
    company_id,
  } = req.body);

  project.updated_by = req.decoded.id;

  const tableName = "hrm_project";
  const dataName = "project";

  update(tableName, project, id, res, dataName);
};

// export
module.exports = updateProjectController;
