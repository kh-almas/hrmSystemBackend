// require
const express = require("express");
const paramsValidation = require("../../../validations/shared/params.validation");
const addOrganizationController = require("../../../controllers/hrm-system/organization/add.organization.controller");
const organizationValidation = require("../../../validations/hrm-system/organization/organization.validation");
const {
  getOrganizationController,
  getAllOrganizationController,
} = require("../../../controllers/hrm-system/organization/get.organization.controller");
const updateOrganizationController = require("../../../controllers/hrm-system/organization/update.organization.controller");
const removeOrganization = require("../../../controllers/hrm-system/organization/remove.organization.controller");

// router
const organizationRouter = express.Router();

// post
organizationRouter.post(
  "/",
  [organizationValidation],
  addOrganizationController
);

// get
organizationRouter.get("/:id", [paramsValidation], getOrganizationController);

// get all
organizationRouter.get("/", getAllOrganizationController);

// put
organizationRouter.put(
  "/:id",
  [paramsValidation, organizationValidation],
  updateOrganizationController
);

// delete
organizationRouter.delete("/:id", [paramsValidation], removeOrganization);

// export
module.exports = organizationRouter;
