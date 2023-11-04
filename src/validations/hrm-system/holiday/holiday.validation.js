// require
const Joi = require("joi").extend(require("@joi/date"));

// schema
const holidayValidationSchema = Joi.object({
  title: Joi.string().allow(""),
  date: Joi.date().format("YYYY-MM-DD").required(),
  status: Joi.string(),
});

// holiday validation
const holidayValidation = async (req, res, next) => {
  try {
    const { title, date, status } = req.body;
    const holiday = { title, date, status };

    await holidayValidationSchema.validateAsync(holiday);

    next();
  } catch (err) {
    console.error(`holiday validation error: ${err}`);

    return res.status(400).json({
      status: "error",
      body: { message: err },
    });
  }
};

// export
module.exports = holidayValidation;
