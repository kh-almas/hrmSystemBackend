// require
const add = require("../../../base/controllers/add.controller");

// add organization
const addOrganizationController = (req, res) => {
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
  organization.created_by = req.decoded.id;

  const tableName = "hrm_organization";
  const dataName = "organization";

  add(tableName, organization, res, dataName);
};

// export
module.exports = addOrganizationController;
