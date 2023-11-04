// require
const express = require("express");
const paramsValidation = require("../../../validations/shared/params.validation");
const designationValidation = require("../../../validations/hrm-system/designation/designation.validation");
const addDesignationController = require("../../../controllers/hrm-system/designation/add.designation.controller");
const {
  getDesignationController,
  getAllDesignationController,
} = require("../../../controllers/hrm-system/designation/get.designation.controller");
const updateDesignationController = require("../../../controllers/hrm-system/designation/update.designation.controller");
const removeDesignation = require("../../../controllers/hrm-system/designation/remove.designation.controller");

// router
const designationRouter = express.Router();

// post
designationRouter.post("/", [designationValidation], addDesignationController);

// get
designationRouter.get("/:id", [paramsValidation], getDesignationController);

// get all
designationRouter.get("/", getAllDesignationController);

// put
designationRouter.put(
  "/:id",
  [paramsValidation, designationValidation],
  updateDesignationController
);

// delete
designationRouter.delete("/:id", [paramsValidation], removeDesignation);

// export
module.exports = designationRouter;
