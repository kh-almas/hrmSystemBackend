// require
const Joi = require("joi");

// schema
const addContactValidationSchema = Joi.object({
  contact_type: Joi.string().required(),
  name: Joi.string().required(),
  business_name: Joi.string().required(),
  tax_number: Joi.string().required(),
  opening_balance: Joi.number().required(),
  pay_term: Joi.string().required(),
  pay_term_condition: Joi.string().required(),
  email: Joi.string().email().required(),
  mobile: Joi.string().required(),
  alternate_contact_no: Joi.string().required(),
  country: Joi.string().required(),
  state: Joi.string().required(),
  city: Joi.string().required(),
  address: Joi.string().required(),
  note: Joi.string().required(),
  pc_address: Joi.string(),
});

// add contact validation
const addContactValidation = async (req, res, next) => {
  try {
    const contact = ({
      contact_type,
      name,
      business_name,
      tax_number,
      opening_balance,
      pay_term,
      pay_term_condition,
      email,
      mobile,
      alternate_contact_no,
      country,
      state,
      city,
      address,
      note,
      pc_address,
    } = req.body);

    await addContactValidationSchema.validateAsync(contact);

    next();
  } catch (err) {
    console.error(`add contact validation error: ${err}`);

    return res.status(400).json({
      status: "error",
      body: { message: err },
    });
  }
};

// export
module.exports = addContactValidation;
