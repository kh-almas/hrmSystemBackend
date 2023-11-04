// require
const Joi = require("joi").extend(require("@joi/date"));

// schema
const leaveTypeValidationSchema = Joi.object({
  type: Joi.string().required(),
  status: Joi.string().required(),
});

// leave type validation
const leaveTypeValidation = async (req, res, next) => {
  try {
    const leaveType = ({ type, status } = req.body);

    await leaveTypeValidationSchema.validateAsync(leaveType);

    next();
  } catch (err) {
    console.error(`leave type validation error: ${err}`);

    return res.status(400).json({
      status: "error",
      body: { message: err },
    });
  }
};

// export
module.exports = leaveTypeValidation;
