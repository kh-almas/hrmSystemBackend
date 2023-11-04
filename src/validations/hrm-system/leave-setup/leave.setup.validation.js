// require
const Joi = require("joi").extend(require("@joi/date"));

// schema
const leaveSetupValidationSchema = Joi.object({
  leave_type_id: Joi.number().integer().required(),
  total_days: Joi.number().integer().required(),
  year: Joi.date().format("YYYY"),
  carry_forward: Joi.boolean().required(),
  status: Joi.string().required(),
});

// leave setup validation
const leaveSetupValidation = async (req, res, next) => {
  try {
    const leaveSetup = ({
      leave_type_id,
      total_days,
      year,
      carry_forward,
      status,
    } = req.body);

    await leaveSetupValidationSchema.validateAsync(leaveSetup);

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
module.exports = leaveSetupValidation;
