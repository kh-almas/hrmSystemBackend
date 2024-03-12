// require
const Joi = require("joi");

// schema
const ValidationSchema = Joi.object({
  quotation_no: Joi.string().required(),
  total_qty: Joi.number().required(),
  total_price: Joi.number().required(),
  total_discount: Joi.number().required(),
  total_vat: Joi.number().required(),
  other_cost: Joi.number().required(),
  shipping_add: Joi.string().required(),
  branch_id: Joi.number().required(),
  supplier_id: Joi.number().required(),
  status: Joi.string().required(),
  has_lc: Joi.boolean(),
  transaction_date: Joi.date().required(),
});

// add discount validation
const purchaseQuoteValidation = async (req, res, next) => {
  try {
    const {
      quotation_no,
      total_qty,
      total_price,
      total_discount,
      total_vat,
      other_cost,
      shipping_add,
      branch_id,
      supplier_id,
      status,
      has_lc,
      transaction_date,
    } = req.body;
    const obj = {
      quotation_no,
      total_qty,
      total_price,
      total_discount,
      total_vat,
      other_cost,
      shipping_add,
      branch_id,
      supplier_id,
      status,
      has_lc,
      transaction_date,
    };

    await ValidationSchema.validateAsync(obj);

    next();
  } catch (err) {
    console.error(`validation error: ${err}`);

    return res.status(400).json({
      status: "error",
      body: { message: err },
    });
  }
};

// export
module.exports = purchaseQuoteValidation;
