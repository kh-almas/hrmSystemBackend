// require
const update = require("../../../base/controllers/update.controller");

// update employee shift
const updateEmployeeShiftController = (req, res) => {
  const { id } = req.params;

  const employeeShift = ({ shift_name, organization_id, company_id, branch_id, weekend, note, status } =
    req.body);
  employeeShift.updated_by = req.decoded.id;

  const tableName = "hrm_employee_shift";
  const dataName = "employee shift";

  update(tableName, employeeShift, id, res, dataName);
};

// export
module.exports = updateEmployeeShiftController;
