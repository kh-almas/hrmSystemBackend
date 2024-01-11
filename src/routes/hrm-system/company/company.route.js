// require
const express = require("express");
const paramsValidation = require("../../../validations/shared/params.validation");
const addCompanyController = require("../../../controllers/hrm-system/company/add.company.controller");
const companyValidation = require("../../../validations/hrm-system/company/company.validation");
const {
  getCompanyController,
  getAllCompanyController,
} = require("../../../controllers/hrm-system/company/get.company.controller");
const updateCompanyController = require("../../../controllers/hrm-system/company/update.company.controller");
const removeCompany = require("../../../controllers/hrm-system/company/remove.company.controller");

// router
const companyRouter = express.Router();

// post
companyRouter.post("/", [companyValidation], addCompanyController);

// get
companyRouter.get("/:id", [paramsValidation], getCompanyController);

// get all
companyRouter.get("/", getAllCompanyController);

// put
companyRouter.put("/:id", [paramsValidation, companyValidation], updateCompanyController);

// delete
companyRouter.delete("/:id", [paramsValidation], removeCompany);

// export
module.exports = companyRouter;
