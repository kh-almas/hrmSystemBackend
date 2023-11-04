// require
const Joi = require("joi");

// schema
const employeeShiftValidationSchema = Joi.object({
  shift_id: Joi.number().integer().required(),
  employee_id: Joi.number().integer().required(),
  shift_schedule_id: Joi.number().integer().required(),
  status: Joi.string().required(),
});

// employee shift validation
const employeeShiftValidation = async (req, res, next) => {
  try {
    const employeeShift = ({
      employee_id,
      shift_id,
      shift_schedule_id,
      status,
    } = req.body);

    await employeeShiftValidationSchema.validateAsync(employeeShift);

    next();
  } catch (err) {
    console.error(`employee shift validation error: ${err}`);

    return res.status(400).json({
      status: "error",
      body: { message: err },
    });
  }
};

// export
module.exports = employeeShiftValidation;
