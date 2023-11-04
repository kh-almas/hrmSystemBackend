// require
const Joi = require("joi");

// schema
const departmentValidationSchema = Joi.object({
  company_id: Joi.number().integer(),
  name: Joi.string().required(),
  details: Joi.string().required(),
  status: Joi.string().required(),
});

// department validation
const departmentValidation = async (req, res, next) => {
  try {
    const department = ({ name, company_id, details, status } = req.body);

    await departmentValidationSchema.validateAsync(department);

    next();
  } catch (err) {
    console.error(`department validation error: ${err}`);

    return res.status(400).json({
      status: "error",
      body: { message: err },
    });
  }
};

// export
module.exports = departmentValidation;
