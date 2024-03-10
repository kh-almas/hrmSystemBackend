// require
const Joi = require("joi");

// schema
const ValidationSchema = Joi.object({
  sku_id: Joi.number().required(),
  product_id: Joi.number().required(),
  batch_no: Joi.string().required(),
  price: Joi.number().required(),
  tax: Joi.number().required(),
  sales_price: Joi.number().required(),
  other_cost: Joi.number().required(),
  discount: Joi.number().required(),
  qty: Joi.number().required(),
});

// add discount validation
const purchaseProductValidation = async (req, res, next) => {
  try {
    const {
      sku_id,
      product_id,
      price,
      batch_no,
      tax,
      sales_price,
      other_cost,
      discount,
      qty,
    } = req.body;
    const obj = {
      sku_id,
      product_id,
      price,
      batch_no,
      tax,
      sales_price,
      other_cost,
      discount,
      qty,
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
module.exports = purchaseProductValidation;
