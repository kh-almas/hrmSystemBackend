// require
const Joi = require("joi").extend(require("@joi/date"));

// schema
const leaveApprovalValidationSchema = Joi.object({
  leave_application_id: Joi.number().integer().required(),
  status: Joi.string().required(),
});

// leave approval validation
const leaveApprovalValidation = async (req, res, next) => {
  try {
    const leaveApproval = ({ leave_application_id, status } = req.body);

    await leaveApprovalValidationSchema.validateAsync(leaveApproval);

    next();
  } catch (err) {
    console.error(`leave approval validation error: ${err}`);

    return res.status(400).json({
      status: "error",
      body: { message: err },
    });
  }
};

// export
module.exports = leaveApprovalValidation;
