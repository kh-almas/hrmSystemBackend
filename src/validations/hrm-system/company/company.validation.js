// require
const Joi = require("joi");

// schema
const companyValidationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  vat: Joi.string().required(),
  address: Joi.string().required(),
  country: Joi.string().required(),
  zip: Joi.string().required(),
  info: Joi.string().required(),
  status: Joi.string().required(),
  organization_id: Joi.number().integer().required(),
  shortname: Joi.string(),
  slogan: Joi.string(),
  description: Joi.string(),
});

// company validation
const companyValidation = async (req, res, next) => {
  try {
    const company = ({
      name,
      email,
      phone,
      vat,
      address,
      country,
      zip,
      info,
      status,
      organization_id,
      shortname,
      slogan,
      description
    } = req.body);

    await companyValidationSchema.validateAsync(company);

    next();
  } catch (err) {
    console.error(`company validation error: ${err}`);

    return res.status(400).json({
      status: "error",
      body: { message: err },
    });
  }
};

// export
module.exports = companyValidation;
