// require
const Joi = require("joi");

// schema
const ValidationSchema = Joi.object({

    branch_id: Joi.number().required(),
    sku_id: Joi.number().required(),
    batch_no: Joi.string().required(),
    date: Joi.date().required(),
    qty: Joi.number().required(),
    purchase_price: Joi.number().required(),
    selling_price: Joi.number().required(),
    total_discount: Joi.number().required(),
});

// add model validation
const openingStockValidation = async (req, res, next) => {
    try {
        const {branch_id, sku_id, batch_no, date, qty, purchase_price, selling_price, total_discount} = req.body
        const obj = {branch_id, sku_id, batch_no, date, qty, purchase_price, selling_price, total_discount};

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
module.exports = openingStockValidation;