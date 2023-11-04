// require
const Joi = require("joi").extend(require("@joi/date"));

// schema
const manualAttendanceValidationSchema = Joi.object({
  organization_id: Joi.number().integer().required(),
  company_id: Joi.number().integer().required(),
  branch_id: Joi.number().integer().required(),
  shift_id: Joi.number().integer().required(),
  device_id: Joi.string().allow(''),
  employee_id: Joi.number().integer().required(),
  date: Joi.date().format("YYYY-MM-DD").required(),
  in_time: Joi.date().format("YYYY-MM-DD HH:mm:ss").required(),
  out_time: Joi.date().format("YYYY-MM-DD HH:mm:ss").required(),
  day_type: Joi.number().integer(),
  attendance_type: Joi.string().required(),
  status: Joi.string().required(),
});

// manual attendance validation
const manualAttendanceValidation = async (req, res, next) => {
  try {
    const manualAttendance = ({employee_id, shift_id, date, in_time, out_time, day_type, status,} = req.body);

    await manualAttendanceValidationSchema.validateAsync(manualAttendance);

    next();
  } catch (err) {
    console.error(`manual attendance validation error: ${err}`);

    return res.status(400).json({
      status: "error",
      body: { message: err },
    });
  }
};

// export
module.exports = manualAttendanceValidation;
