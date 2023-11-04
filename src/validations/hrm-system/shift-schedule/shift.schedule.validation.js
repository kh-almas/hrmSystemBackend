// require
const Joi = require("joi").extend(require("@joi/date"));

// schema
const shiftScheduleValidationSchema = Joi.object({
  date_from: Joi.date().format("YYYY-MM-DD").required(),
  date_to: Joi.date()
    .format("YYYY-MM-DD")
    .greater(Joi.ref("date_from"))
    .required(),
  shift_from: Joi.number().integer().required(),
  shift_to: Joi.number().integer().required(),
  active_on: Joi.string().required(),
  status: Joi.string().required(),
});

// shift schedule validation
const shiftScheduleValidation = async (req, res, next) => {
  try {
    const shiftSchedule = ({
      date_from,
      date_to,
      shift_from,
      shift_to,
      active_on,
      status,
    } = req.body);

    await shiftScheduleValidationSchema.validateAsync(shiftSchedule);

    next();
  } catch (err) {
    console.error(`shift schedule validation error: ${err}`);

    return res.status(400).json({
      status: "error",
      body: { message: err },
    });
  }
};

// export
module.exports = shiftScheduleValidation;
