// require
const express = require("express");
const paramsValidation = require("../../../validations/shared/params.validation");
const projectValidation = require("../../../validations/hrm-system/project/project.validation");
const addProjectController = require("../../../controllers/hrm-system/project/add.project.controller");
const {
  getProjectController,
  getAllProjectController,
} = require("../../../controllers/hrm-system/project/get.project.controller");
const updateProjectController = require("../../../controllers/hrm-system/project/update.project.controller");
const removeProject = require("../../../controllers/hrm-system/project/remove.project.controller");

// router
const projectRouter = express.Router();

// post
projectRouter.post("/", [projectValidation], addProjectController);

// get
projectRouter.get("/:id", [paramsValidation], getProjectController);

// get all
projectRouter.get("/", getAllProjectController);

// put
projectRouter.put(
  "/:id",
  [paramsValidation, projectValidation],
  updateProjectController
);

// delete
projectRouter.delete("/:id", [paramsValidation], removeProject);

// export
module.exports = projectRouter;
