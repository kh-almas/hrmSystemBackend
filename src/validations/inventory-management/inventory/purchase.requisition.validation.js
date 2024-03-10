// require
const Joi = require("joi");

// schema
const ValidationSchema = Joi.object({
  requisition_no: Joi.string().required(),
  total_qty: Joi.number().required(),
  shipping_add: Joi.string().required(),
  branch_id: Joi.number().required(),
  supplier_id: Joi.number().optional(),
  status: Joi.string().required(),
  transaction_date: Joi.date().required(),
});

// add discount validation
const purchaseRequisitionValidation = async (req, res, next) => {
  try {
    const {
      requisition_no,
      total_qty,
      shipping_add,
      branch_id,
      supplier_id,
      status,
      transaction_date,
    } = req.body;
    const obj = {
      requisition_no,
      total_qty,
      shipping_add,
      branch_id,
      supplier_id,
      status,
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
module.exports = purchaseRequisitionValidation;
