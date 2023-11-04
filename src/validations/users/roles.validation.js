const Joi = require("joi");

const roleValidationSchema = Joi.object({
    name: Joi.string().required(),
    unique_id: Joi.string().required(),
    read_permission: Joi.bool(),
    insert_permission: Joi.bool(),
    update_permission: Joi.bool(),
    delete_permission: Joi.bool(),
    status: Joi.bool().required(),
})

const rolesValidation = async (req, res, next) => {
    try {
        const data = ({
            name,
            unique_id,
            read_permission,
            insert_permission,
            update_permission,
            delete_permission,
            status
        } = req.body)
        await roleValidationSchema.validateAsync(data);
        next();
    } catch (err) {
        console.error(`role validation error: ${err}`);

        return res.status(400).json({
            status: "error",
            body: {message: err},
        });
    }
}

module.exports = rolesValidation;