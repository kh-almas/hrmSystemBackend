// require
const Joi = require("joi").extend(require("@joi/date"));

// schema
const leaveApplicationValidationSchema = Joi.object({
  leave_type_id: Joi.number().integer().required(),
  date_from: Joi.date().format("YYYY-MM-DD").required(),
  date_to: Joi.date().format("YYYY-MM-DD").required(),
  status: Joi.string().required(),
});

// leave setup validation
const leaveApplicationValidation = async (req, res, next) => {
  try {
    const leaveApplication = ({ leave_type_id, date_from, date_to, status } =
      req.body);

    await leaveApplicationValidationSchema.validateAsync(leaveApplication);

    next();
  } catch (err) {
    console.error(`leave setup validation error: ${err}`);

    return res.status(400).json({
      status: "error",
      body: { message: err },
    });
  }
};

// export
module.exports = leaveApplicationValidation;
