// require
const Joi = require("joi");

// schema
const addModelValidationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().required(),
  company_id: Joi.number().required(),
  branch_id: Joi.number().required(),
  pc_address: Joi.string(),
});

// add model validation
const modelValidation = async (req, res, next) => {
  try {
    const {name, description, status, company_id, branch_id, pc_address} = req.body
    const model = {name, description, status, company_id, branch_id, pc_address};

    await addModelValidationSchema.validateAsync(model);

    next();
  } catch (err) {
    console.error(`add model validation error: ${err}`);

    return res.status(400).json({
      status: "error",
      body: { message: err },
    });
  }
};

// export
module.exports = modelValidation;
