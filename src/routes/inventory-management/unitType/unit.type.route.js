// require
const express = require("express");
const userVerify = require("../../../middlewares/auth/user.verify");
const paramsValidation = require("../../../validations/shared/params.validation");
const { addUnitType, getUnitType, updateUnitType, deleteUnitType } = require('../../../controllers/inventory-management/product/unitType/unit.type.controller');
const addUnitTypeValidation = require("../../../validations/inventory-management/product/unitType/unit.type.validation");

// router
const unitTypeRouter = express.Router();

// use
unitTypeRouter.use(userVerify);

// post
unitTypeRouter.post("/add", [addUnitTypeValidation], addUnitType);

// get all
unitTypeRouter.get("/all", getUnitType);

// update
unitTypeRouter.put("/update/:id", [paramsValidation, addUnitTypeValidation], updateUnitType);

// delete
unitTypeRouter.delete("/delete/:id", [paramsValidation], deleteUnitType);

// export
module.exports = unitTypeRouter;
