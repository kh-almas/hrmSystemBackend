// require
const Joi = require("joi");

// schema
const queryValidationSchema = Joi.object({
  search: Joi.string().required(),
});

// search validation
const queryValidation = async (req, res, next) => {
  try {
    const { search } = req.query;

    await queryValidationSchema.validateAsync({
      search,
    });

    next();
  } catch (err) {
    console.error(`query validation error: ${err}`);

    return res.status(400).json({
      status: "error",
      body: { message: err },
    });
  }
};

// export
module.exports = queryValidation;
