
// require
const Joi = require("joi");

// schema
const ValidationSchema = Joi.object({

    branch_id: Joi.number().required(),
    sku_id: Joi.number().required(),
    purpose_type: Joi.string().required(),
    ref_id: Joi.number().required(),
    batch_no: Joi.string().required(),
    qty: Joi.number().required(),
    date: Joi.date().required(),
    purchase_price: Joi.number().required(),
    sales_price: Joi.number().required(),
});


// add model validation
const stockAdjustmentValidation = async (req, res, next) => {
    try {
        const {branch_id, sku_id, purpose_type, ref_id, batch_no, qty, date, purchase_price, sales_price} = req.body
        const obj = {branch_id, sku_id, purpose_type, ref_id, batch_no, qty, date, purchase_price, sales_price};

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
module.exports = stockAdjustmentValidation;