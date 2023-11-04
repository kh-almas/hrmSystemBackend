// require
const Joi = require("joi");

// schema
const addModelValidationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().required(),
  pc_address: Joi.string().required(),
});

// add model validation
const addModelValidation = async (req, res, next) => {
  try {
    const model = ({ name, description, status, pc_address } = req.body);

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
module.exports = addModelValidation;
