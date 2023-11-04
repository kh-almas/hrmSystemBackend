// require
const Joi = require("joi");

// schema
const addUnitValidationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().required(),
  pc_address: Joi.string().required(),
});

// add unit validation
const addUnitValidation = async (req, res, next) => {
  try {
    const unit = ({ name, description, status, pc_address } = req.body);

    await addUnitValidationSchema.validateAsync(unit);

    next();
  } catch (err) {
    console.error(`add unit validation error: ${err}`);

    return res.status(400).json({
      status: "error",
      body: { message: err },
    });
  }
};

// export
module.exports = addUnitValidation;
