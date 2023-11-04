// require
const Joi = require("joi").extend(require("@joi/date"));

// schema
const projectValidationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  start_date: Joi.date().format("YYYY-MM-DD").required(),
  end_date: Joi.date()
    .format("YYYY-MM-DD")
    .greater(Joi.ref("start_date"))
    .required(),
  total_employees: Joi.number().integer().required(),
  status: Joi.string().required(),
  company_id: Joi.number().integer().required(),
});

// project validation
const projectValidation = async (req, res, next) => {
  try {
    const project = ({
      name,
      description,
      start_date,
      end_date,
      total_employees,
      status,
      company_id,
    } = req.body);

    await projectValidationSchema.validateAsync(project);

    next();
  } catch (err) {
    console.error(`project validation error: ${err}`);

    return res.status(400).json({
      status: "error",
      body: { message: err },
    });
  }
};

// export
module.exports = projectValidation;
