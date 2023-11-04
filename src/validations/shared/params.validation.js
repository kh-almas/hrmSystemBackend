// require
const Joi = require("joi");

// schema
const paramsValidationSchema = Joi.object({
  id: Joi.number().integer().required(),
});

// params validation
const paramsValidation = async (req, res, next) => {
  try {
    const { id } = req.params;

    await paramsValidationSchema.validateAsync({
      id,
    });

    next();
  } catch (err) {
    console.error(`params validation error: ${err}`);

    return res.status(400).json({
      status: "error",
      body: { message: err },
    });
  }
};

// export
module.exports = paramsValidation;
