// require
const Joi = require("joi");

// schema
const addBrandValidationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().required(),
  company_id: Joi.number().required(),
  branch_id: Joi.number().required(),
  pc_address: Joi.string(),
});

// add brand validation
const brandValidation = async (req, res, next) => {
  try {
    const {name, description, status, company_id, branch_id, pc_address} = req.body
    const brand = {name, description, status, company_id, branch_id, pc_address};

    await addBrandValidationSchema.validateAsync(brand);

    next();
  } catch (err) {
    console.error(`add brand validation error: ${err}`);

    return res.status(400).json({
      status: "error",
      body: { message: err },
    });
  }
};

// export
module.exports = brandValidation;
