// require
const Joi = require("joi");

// schema
const branchValidationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  status: Joi.string().required(),
  company_id: Joi.number().integer().required(),
});

// branch validation
const branchValidation = async (req, res, next) => {
  try {
    const branch = ({ name, email, phone, address, status, company_id } =
      req.body);

    await branchValidationSchema.validateAsync(branch);

    next();
  } catch (err) {
    console.error(`branch validation error: ${err}`);

    return res.status(400).json({
      status: "error",
      body: { message: err },
    });
  }
};

// export
module.exports = branchValidation;
