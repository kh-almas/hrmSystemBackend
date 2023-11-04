// require
const Joi = require("joi");

// schema
const employeeContactValidationSchema = Joi.object({
    employee_id: Joi.number().integer().required(),
    contact_type: Joi.string().required(),
    address: Joi.string().required(),
    division: Joi.string().required(),
    district: Joi.string().required(),
    country: Joi.string().required(),
    post_code: Joi.number().integer().required()
});

// company validation
const employeeContactValidation = async (req, res, next) => {
    try {
        const company = ({
            employee_id,
            contact_type,
            address,
            division,
            district,
            country,
            post_code
        } = req.body);

        await employeeContactValidationSchema.validateAsync(company);

        next();
    } catch (err) {
        console.error(`company validation error: ${err}`);

        return res.status(400).json({
            status: "error",
            body: { message: err },
        });
    }
};

// export
module.exports = employeeContactValidation;
