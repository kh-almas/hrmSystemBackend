// require
const Joi = require("joi");

// schema
const addCategoryValidationSchema = Joi.object({
  name: Joi.string().required(),
  code: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().required(),
  parent_id: Joi.number().integer().required(),
  pc_address: Joi.string().required(),
});

// add category validation
const addCategoryValidation = async (req, res, next) => {
  try {
    const category = ({
      name,
      code,
      description,
      status,
      parent_id,
      pc_address,
    } = req.body);

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
module.exports = addCategoryValidation;
