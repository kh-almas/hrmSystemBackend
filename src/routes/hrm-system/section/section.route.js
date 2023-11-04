// require
const express = require("express");
const paramsValidation = require("../../../validations/shared/params.validation");
const sectionValidation = require("../../../validations/hrm-system/section/section.validation");
const addSectionController = require("../../../controllers/hrm-system/section/add.section.controller");
const {
  getSectionController,
  getAllSectionController,
} = require("../../../controllers/hrm-system/section/get.section.controller");
const updateSectionController = require("../../../controllers/hrm-system/section/update.section.controller");
const removeSection = require("../../../controllers/hrm-system/section/remove.section.controller");

// router
const sectionRouter = express.Router();

// post
sectionRouter.post("/", [sectionValidation], addSectionController);

// get
sectionRouter.get("/:id", [paramsValidation], getSectionController);

// get all
sectionRouter.get("/", getAllSectionController);

// put
sectionRouter.put(
  "/:id",
  [paramsValidation, sectionValidation],
  updateSectionController
);

// delete
sectionRouter.delete("/:id", [paramsValidation], removeSection);

// export
module.exports = sectionRouter;
