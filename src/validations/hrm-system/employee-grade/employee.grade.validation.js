// require
const Joi = require("joi");

// schema
const employeeGradeValidationSchema = Joi.object({
    grade_name: Joi.string().required(),
    status: Joi.string().required(),
    organization_id: Joi.number().integer().required(),
    company_id: Joi.number().integer().required(),
});

// designation validation
const employeeGradeValidation = async (req, res, next) => {
    try {
        const designation = ({ grade_name, status, organization_id, company_id } = req.body);

        await employeeGradeValidationSchema.validateAsync(designation);

        next();
    } catch (err) {
        console.error(`designation validation error: ${err}`);

        return res.status(400).json({
            status: "error",
            body: { message: err },
        });
    }
};

// export
module.exports = employeeGradeValidation;
