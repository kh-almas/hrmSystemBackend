// require
const Joi = require("joi");

// schema
const organizationValidationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  vat: Joi.string().required(),
  address: Joi.string().required(),
  country: Joi.string().required(),
  zip: Joi.string().required(),
  info: Joi.string().required(),
  status: Joi.string().required(),
  shortname: Joi.string(),
  slogan: Joi.string(),
  description: Joi.string(),
});

// organization validation
const organizationValidation = async (req, res, next) => {
  try {
    const organization = ({
      name,
      email,
      phone,
      vat,
      address,
      country,
      zip,
      info,
      status,
      shortname,
      slogan,
      description
    } = req.body);

    await organizationValidationSchema.validateAsync(organization);

    next();
  } catch (err) {
    console.error(`contact validation error: ${err}`);

    return res.status(400).json({
      status: "error",
      body: { message: err },
    });
  }
};

// export
module.exports = organizationValidation;
