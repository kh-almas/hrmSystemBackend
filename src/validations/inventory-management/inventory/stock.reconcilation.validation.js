
// require
const Joi = require("joi");

// schema
const ValidationSchema = Joi.object({
    date: Joi.date().required(),
    branch_id: Joi.number().required(),
    sku_id: Joi.number().required(),
    system_stock_qty: Joi.number().required(),
    physical_qty: Joi.number().required(),
    adjust_qty: Joi.number().required(),
    batch_no: Joi.string().required(),
    remarks: Joi.string().required(),
    audit_by: Joi.number().required(),
    approve_status: Joi.boolean().required(),
});


// add model validation
const stockReconciliationValidation = async (req, res, next) => {
    try {
        const {date, branch_id, sku_id, system_stock_qty, physical_qty, adjust_qty, batch_no, remarks, audit_by, approve_status} = req.body
        const obj = {date, branch_id, sku_id, system_stock_qty, physical_qty, adjust_qty, batch_no, remarks, audit_by, approve_status};

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
module.exports = stockReconciliationValidation;