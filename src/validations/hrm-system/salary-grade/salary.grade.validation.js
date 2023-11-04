// require
const Joi = require("joi");

// schema
const salaryGradeValidationSchema = Joi.object({
    salary_grade_name: Joi.string().required(),
    status: Joi.string().required(),
    organization_id: Joi.number().integer().required(),
    company_id: Joi.number().integer().required(),
});

// designation validation
const salaryGradeValidation = async (req, res, next) => {
    try {
        const designation = ({ salary_grade_name, status, organization_id, company_id } = req.body);

        await salaryGradeValidationSchema.validateAsync(designation);

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
module.exports = salaryGradeValidation;
