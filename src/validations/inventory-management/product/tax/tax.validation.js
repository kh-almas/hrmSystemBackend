// require
const Joi = require("joi");

// schema
const taxValidationSchema = Joi.object({
  name: Joi.string().required(),
  tax: Joi.number().required(),
  status: Joi.string().required(),
});

// add contact validation
const taxValidation = async (req, res, next) => {
  try {
    const {name, tax, status} = req.body
    const contact = {name, tax, status};

    await taxValidationSchema.validateAsync(contact);

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
module.exports = taxValidation;
