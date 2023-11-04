// require
const Joi = require("joi").extend(require("@joi/date"));

// schema
const weekdayValidationSchema = Joi.object({
  name: Joi.string().required(),
  status: Joi.string().required(),
});

// weekday validation
const weekValidation = async (req, res, next) => {
  try {
    const weekday = ({ name, status } = req.body);

    await weekdayValidationSchema.validateAsync(weekday);

    next();
  } catch (err) {
    console.error(`weekday validation error: ${err}`);

    return res.status(400).json({
      status: "error",
      body: { message: err },
    });
  }
};

// export
module.exports = weekValidation;
