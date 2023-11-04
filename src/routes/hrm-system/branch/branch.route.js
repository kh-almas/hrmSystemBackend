// require
const express = require("express");
const paramsValidation = require("../../../validations/shared/params.validation");
const branchValidation = require("../../../validations/hrm-system/branch/branch.validation");
const addBranchController = require("../../../controllers/hrm-system/branch/add.branch.controller");
const {
  getBranchController,
  getAllBranchController,
} = require("../../../controllers/hrm-system/branch/get.branch.controller");
const updateBranchController = require("../../../controllers/hrm-system/branch/update.branch.controller");
const removeBranch = require("../../../controllers/hrm-system/branch/remove.branch.controller");

// router
const branchRouter = express.Router();

// post
branchRouter.post("/", [branchValidation], addBranchController);

// get
branchRouter.get("/:id", [paramsValidation], getBranchController);

// get all
branchRouter.get("/", getAllBranchController);

// put
branchRouter.put(
  "/:id",
  [paramsValidation, branchValidation],
  updateBranchController
);

// delete
branchRouter.delete("/:id", [paramsValidation], removeBranch);

// export
module.exports = branchRouter;
