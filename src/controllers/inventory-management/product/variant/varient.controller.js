// require
const getDatabaseConnection = require("../../../../configs/db.config");

// add variant
const addVariant = async (req, res) => {
    try {
        const variant = ({
            name,
            description,
            status,
            company_id,
            branch_id, } = req.body);
        variant.created_by = req.decoded.email;
        variant.update_by = req.decoded.email;

        const connection = await getDatabaseConnection();
        const [row] = await connection.query(
            "INSERT INTO inventory_product_variants SET ?",
            variant
        );
        connection.release();

        return res.status(200).json({
            status: "ok",
            body: {
                message: "one variant added",
                unit: row,
            },
        });
    } catch (err) {
        console.error(`add variant error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: {
                message: err || "cannot add variant",
            },
        });
    }
};

const getAllVariant = async (req, res) => {
    try {
        const columns = ["id", "name", "description", "status"];

        const connection = await getDatabaseConnection();
        const [row] = await connection.query(
            `SELECT 
    inventory_product_variants.id,
    hrm_company.name as company_name_s,
    hrm_branch.name as branch_name_s,
    inventory_product_variants.name as name_s,
    inventory_product_variants.description description_s,
    inventory_product_variants.status as status_s_g,
    inventory_product_variants.created_by,
    inventory_product_variants.update_by 
                FROM inventory_product_variants
                LEFT JOIN hrm_company ON hrm_company.id = inventory_product_variants.company_id
                LEFT JOIN hrm_branch ON hrm_branch.id = inventory_product_variants.branch_id`
        );
        connection.release();

        return res.status(200).json({
            status: "ok",
            body: {
                message: "get all variants`",
                data: row,
            },
        });
    } catch (err) {
        console.error(`get product variant error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: {
                message: err || "cannot get variant",
            },
        });
    }
};

const updateVariant = async (req, res) => {
    try {
        const variant = ({
            name,
            description,
            status,
            company_id,
            branch_id, } = req.body);
        variant.created_by = req.decoded.email;
        variant.update_by = req.decoded.email;
        const { id } = req.params;

        const connection = await getDatabaseConnection();
        const [row] = await connection.query(
            "UPDATE inventory_product_variants SET ? WHERE id = ?",
            [variant, id]
        );
        connection.release();

        return res.status(200).json({
            status: "ok",
            body: { message: "one variant updated", contact: row },
        });
    } catch (err) {
        console.error(`add variant error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: { message: err || "cannot update variant" },
        });
    }
};

const deleteVariant = async (req, res) => {
    try {
        const { id } = req.params;

        const connection = await getDatabaseConnection();
        const [row] = await connection.query(
            "DELETE FROM inventory_product_variants WHERE id = ?",
            [id]
        );
        connection.release();

        return res.status(200).json({
            status: "ok",
            body: { message: "one variant deleted", contact: row },
        });
    } catch (err) {
        console.error(`delete variant error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: { message: err || "cannot delete variant" },
        });
    }
};

module.exports = { addVariant, getAllVariant, updateVariant, deleteVariant };
