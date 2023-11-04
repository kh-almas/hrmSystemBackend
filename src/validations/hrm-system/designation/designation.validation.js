// require
const Joi = require("joi");

// schema
const designationValidationSchema = Joi.object({
  name: Joi.string().required(),
  organization_id: Joi.number().integer(),
  company_id: Joi.number().integer(),
  details: Joi.string().required(),
  status: Joi.string().required(),
});

// designation validation
const designationValidation = async (req, res, next) => {
  try {
    const designation = ({ name, details, organization_id, company_id, status } = req.body);

    await designationValidationSchema.validateAsync(designation);

    next();
  } catch (err) {
    console.error(`designation validation error: ${err}`);

    return res.status(400).json({
      status: "error",
      body: { message: err },
    });
  }
};

// export
module.exports = designationValidation;
