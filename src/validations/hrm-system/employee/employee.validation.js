// require
const Joi = require("joi").extend(require("@joi/date"));

// schema
const employeeValidationSchema = Joi.object({
  name_title: Joi.string(),
  first_name: Joi.string(),
  last_name: Joi.string(),
  full_name: Joi.string(),
  father_name: Joi.string(),
  mother_name: Joi.string(),
  spouse_name: Joi.string(),
  phone: Joi.string(),
  date_of_birth: Joi.date().format("YYYY-MM-DD"),
  gender: Joi.string(),
  address: Joi.string(),
  joining_date: Joi.date().format("YYYY-MM-DD"),
  account_holder_name: Joi.string(),
  account_number: Joi.string(),
  bank_name: Joi.string(),
  bank_identifier_code: Joi.string(),
  branch_location: Joi.string(),
  tax_pay_id: Joi.string(),
  status: Joi.string(),
  branch_id: Joi.number().integer(),
  department_id: Joi.number().integer(),
  designation_id: Joi.number().integer(),
});

// employee validation
const employeeValidation = async (req, res, next) => {
  try {
    const employee = ({
      name,
      phone,
      date_of_birth,
      gender,
      address,
      joining_date,
      account_holder_name,
      account_number,
      bank_name,
      bank_identifier_code,
      branch_location,
      tax_pay_id,
      status,
      branch_id,
      department_id,
      designation_id,
    } = req.body);

    await employeeValidationSchema.validateAsync(employee);

    next();
  } catch (err) {
    console.error(`employee validation error: ${err}`);

    return res.status(400).json({
      status: "error",
      body: { message: err },
    });
  }
};

// export
module.exports = employeeValidation;
