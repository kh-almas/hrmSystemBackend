// require
const Joi = require("joi");

// schema
const addBrandValidationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.number().integer().required(),
  pc_address: Joi.string().required(),
});

// add brand validation
const addBrandValidation = async (req, res, next) => {
  try {
    const brand = ({ name, description, status, pc_address } = req.body);

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
module.exports = addBrandValidation;
