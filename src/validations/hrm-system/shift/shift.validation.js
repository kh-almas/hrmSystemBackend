// require
const Joi = require("joi").extend(require("@joi/date"));

// schema
const shiftValidationSchema = Joi.object({
  DayDiff: Joi.required(),
  organization_id: Joi.number().integer().required(),
  company_id: Joi.number().integer().required(),
  branch_id: Joi.number().integer().required(),
  name: Joi.string().required(),
  start_time: Joi.date().format("HH:mm:ss").required(),
  end_time: Joi.date().format("HH:mm:ss").required(),
  weekends: Joi.string().required(),
  status: Joi.string(),
  note: Joi.string(),
  gross_time: Joi.string(),
});

// shift validation
const shiftValidation = async (req, res, next) => {
  try {
    const shift = ({
      DayDiff,
      organization_id,
      company_id,
      branch_id,
      name,
      start_time,
      end_time,
      weekends,
      status,
      note,
    } = req.body);

    await shiftValidationSchema.validateAsync(shift);

    next();
  } catch (err) {
    console.error(`shift validation error: ${err}`);

    return res.status(400).json({
      status: "error",
      body: { message: err },
    });
  }
};

// export
module.exports = shiftValidation;
