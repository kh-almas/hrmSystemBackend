// require
const Joi = require("joi");

// schema
const getContactParamsValidationSchema = Joi.object({
  contact_type: Joi.string().valid("supplier", "customer").required(),
});

// get contact params validation
const getContactParamsValidation = async (req, res, next) => {
  try {
    const { contact_type } = req.params;

    await getContactParamsValidationSchema.validateAsync({
      contact_type,
    });

    next();
  } catch (err) {
    console.error(`get contact params validation error: ${err}`);

    return res.status(400).json({
      status: "error",
      body: { message: err },
    });
  }
};

// export
module.exports = getContactParamsValidation;
