
// require
const Joi = require("joi");

// schema
const ValidationSchema = Joi.object({
    branch_id: Joi.number().required(),
    purpose_type: Joi.string().required(),
    ref_id: Joi.number().required(),
    total_qty: Joi.number().required(),
    total_price: Joi.number().required(),
    total_discount: Joi.number().required(),
    other_cost: Joi.number().required(),
    total_vat: Joi.number().required(),
    date: Joi.date().required(),
});


// add model validation
const stockAdjustmentValidation = async (req, res, next) => {
    try {
        const {branch_id, purpose_type, ref_id, total_qty, total_price, total_discount, other_cost, total_vat, date} = req.body
        const obj = {branch_id, purpose_type, ref_id, total_qty, total_price, total_discount, other_cost, total_vat, date};

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