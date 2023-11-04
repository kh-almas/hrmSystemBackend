// require
const Joi = require("joi");

// schema
const addSubcategoryValidationSchema = Joi.object({
  category_id: Joi.number().integer().required(),
  name: Joi.string().required(),
  code: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().required(),
  pc_address: Joi.string().required(),
});

// add subcategory validation
const addSubcategoryValidation = async (req, res, next) => {
  try {
    const subcategory = ({
      category_id,
      name,
      code,
      description,
      status,
      pc_address,
    } = req.body);

    await addSubcategoryValidationSchema.validateAsync(subcategory);

    next();
  } catch (err) {
    console.error(`add subcategory validation error: ${err}`);

    return res.status(400).json({
      status: "error",
      body: { message: err },
    });
  }
};

// export
module.exports = addSubcategoryValidation;
