// require
const update = require("../../../base/controllers/update.controller");

// update organization
const updateOrganizationController = (req, res) => {
  const { id } = req.params;

  const organization = ({
    name,
    email,
    phone,
    vat,
    address,
    country,
    zip,
    info,
    status,
    shortname,
    slogan,
    description
  } = req.body);
  organization.updated_by = req.decoded.id;

  const tableName = "hrm_organization";
  const dataName = "organization";

  update(tableName, organization, id, res, dataName);
};

// export
module.exports = updateOrganizationController;
