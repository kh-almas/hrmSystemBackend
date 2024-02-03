
// require
const Joi = require("joi");

// schema
const ValidationSchema = Joi.object({
    branch_id: Joi.number().required(),
    date: Joi.date().required(),
    sku_id: Joi.number().required(),
    purchase_price: Joi.number().required(),
    selling_price: Joi.number().required(),
    batch_no: Joi.string().required(),
    discount_type: Joi.string().required(),
    discount_percent: Joi.number().required(),
    discount_value: Joi.number().required(),
    approve_status: Joi.string().required()
});


// add discount validation
const discountValidation = async (req, res, next) => {
    try {
        const {branch_id, date, sku_id, purchase_price, selling_price, batch_no, discount_type, discount_percent, discount_value, approve_status} = req.body
        const obj = {branch_id, date, sku_id, purchase_price, selling_price, batch_no, discount_type, discount_percent, discount_value, approve_status};

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
module.exports = discountValidation;