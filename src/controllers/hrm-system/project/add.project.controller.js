// require
const add = require("../../../base/controllers/add.controller");

// add project
const addProjectController = (req, res) => {
  const project = ({
    name,
    description,
    start_date,
    end_date,
    total_employees,
    status,
    company_id,
  } = req.body);
  project.created_by = req.decoded.id;

  const tableName = "hrm_project";
  const dataName = "project";

  add(tableName, project, res, dataName);
};

// export
module.exports = addProjectController;
