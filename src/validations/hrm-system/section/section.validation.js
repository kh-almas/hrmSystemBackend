// require
const Joi = require("joi");

// schema
const sectionValidationSchema = Joi.object({
  name: Joi.string().required(),
  status: Joi.string().required(),
  department_id: Joi.number().integer().required(),
  company_id: Joi.number().integer().required(),
});

// section validation
const sectionValidation = async (req, res, next) => {
  try {
    const section = ({ name, status, department_id, company_id } = req.body);
    await sectionValidationSchema.validateAsync(section);
    next();
  } catch (err) {
    console.error(`section validation error: ${err}`);
    return res.status(400).json({
      status: "error",
      body: { message: err },
    });
  }
};

// export
module.exports = sectionValidation;
