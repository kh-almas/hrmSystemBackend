// require
const Joi = require("joi");

// schema
const addCategoryValidationSchema = Joi.object({
  name: Joi.string().required(),
  code: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().required(),
  parent_id: Joi.number().integer(),
  parent_name: Joi.string(),
  company_id: Joi.number().required(),
  branch_id: Joi.number().required(),
  pc_address: Joi.string(),
});

// add category validation
const categoryValidation = async (req, res, next) => {
  try {
    const {name, code, description, status, parent_id, parent_name, pc_address, company_id, branch_id} = req.body
    const category = {name, code, description, status, parent_id, parent_name, pc_address, company_id, branch_id};

    await addCategoryValidationSchema.validateAsync(category);

    next();
  } catch (err) {
    console.error(`add category validation error: ${err}`);

    return res.status(400).json({
      status: "error",
      body: { message: err },
    });
  }
};

// export
module.exports = categoryValidation;
