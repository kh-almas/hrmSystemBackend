// require
const Joi = require("joi");

// schema
const addVariantValidationSchema = Joi.object({
  unit_type: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().required(),
  company_id: Joi.number().required(),
  branch_id: Joi.number().required()
});

// add contact validation
const addUnitTypeValidation = async (req, res, next) => {
  try {
    const {unit_type, description, status, company_id, branch_id} = req.body
    const dataObj = {unit_type, description, status, company_id, branch_id};

    await addVariantValidationSchema.validateAsync(dataObj);

    next();
  } catch (err) {
    console.error(`add variant validation error: ${err}`);

    return res.status(400).json({
      status: "error",
      body: { message: err },
    });
  }
};

// export
module.exports = addUnitTypeValidation;
