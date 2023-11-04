// require
const express = require("express");
const userVerify = require("../../../middlewares/auth/user.verify");
const addContact = require("../../../controllers/inventory-management/contact/add.contact.controller");
const addContactValidation = require("../../../validations/inventory-management/contact/add.contact.validation");
const {
  getContact,
  getAllContact,
} = require("../../../controllers/inventory-management/contact/get.contact.controller");
const getContactParamsValidation = require("../../../validations/inventory-management/contact/get.contact.params.validation");
const updateContact = require("../../../controllers/inventory-management/contact/update.contact.controller");
const deleteContact = require("../../../controllers/inventory-management/contact/delete.contact.controller");
const paramsValidation = require("../../../validations/shared/params.validation");

// router
const contactRouter = express.Router();

// use
contactRouter.use(userVerify);

// post
contactRouter.post("/add-contact", [addContactValidation], addContact);

// get
contactRouter.get("/:id", getContact);

// get all
contactRouter.get(
  "/all/:contact_type",
  [getContactParamsValidation],
  getAllContact
);

// update
contactRouter.put("/update-contact/:id", [addContactValidation], updateContact);

// delete
contactRouter.delete("/delete-contact/:id", [paramsValidation], deleteContact);

// export
module.exports = contactRouter;
