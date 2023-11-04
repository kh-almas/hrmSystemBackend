// require
const joi = require("joi");

// schema
const loginValidationSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

// login validation
const loginValidation = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    await loginValidationSchema.validateAsync({ email, password });

    next();
  } catch (err) {
    console.error(`auth validation error: ${err}`);

    return res.status(401).json({
      status: "error",
      body: { message: err },
    });
  }
};

// export
module.exports = loginValidation;
