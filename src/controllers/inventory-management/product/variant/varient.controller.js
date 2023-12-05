// require
const getDatabaseConnection = require("../../../../configs/db.config");

// add variant
const addVariant = async (req, res) => {
    try {
        const {name, description, status, company_id, branch_id, variantValue } = req.body
        const variant = {name, description, status, company_id, branch_id, };
        variant.created_by = req.decoded.email;
        variant.update_by = req.decoded.email;

        const connection = await getDatabaseConnection();
        const [row] = await connection.query(
            "INSERT INTO inventory_variants SET ?",
            variant
        );

        if(row?.insertId && variantValue?.length > 0 ){
            let valueForDb = []
            variantValue?.map(singleValue =>{
                valueForDb.push({variant_id: row?.insertId, variant_value: singleValue})
            })

            const [c_row] = await connection.query(
                "INSERT INTO inventory_variant_values (variant_id, variant_value) VALUES ?",
                [valueForDb.map(item => [item.variant_id, item.variant_value])]
            );
        }

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

        const connection = await getDatabaseConnection();
        const [row] = await connection.query(
            `SELECT 
    inventory_variants.id,
    hrm_company.name as company_name_s,
    hrm_branch.name as branch_name_s,
    inventory_variants.name as name_s,
    inventory_variants.description description_s,
    inventory_variants.status as status_s_g,
    inventory_variants.created_by,
    inventory_variants.update_by,
    GROUP_CONCAT(inventory_variant_values.variant_value) as variant_value
                FROM inventory_variants
                LEFT JOIN hrm_company ON hrm_company.id = inventory_variants.company_id
                LEFT JOIN hrm_branch ON hrm_branch.id = inventory_variants.branch_id
                LEFT JOIN inventory_variant_values ON inventory_variant_values.variant_id = inventory_variants.id
                GROUP BY inventory_variants.id`
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

const getAllVariantValue = async (req, res) => {
    try {

        const connection = await getDatabaseConnection();
        const [row] = await connection.query(
            `SELECT
                 inventory_variant_values.id,
                 inventory_variant_values.variant_id,
                 inventory_variant_values.variant_value as value,
                 inventory_variants.name as variant_name
                FROM  inventory_variant_values
                LEFT JOIN inventory_variants ON inventory_variant_values.variant_id = inventory_variants.id`
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
}

const updateVariant = async (req, res) => {
    try {
        const {name, description, status, company_id, branch_id, variantValue } = req.body
        const variant = {name, description, status, company_id, branch_id, };
        variant.created_by = req.decoded.email;
        variant.update_by = req.decoded.email;
        const { id } = req.params;

        const connection = await getDatabaseConnection();
        const [row] = await connection.query(
            "UPDATE inventory_variants SET ? WHERE id = ?",
            [variant, id]
        );

        if(variantValue?.length > 0){
            let valueForDb = []
            variantValue?.map(singleValue =>{
                valueForDb.push({variant_id: id, variant_value: singleValue})
            })

            const [delete_row] = await connection.query(
                `DELETE FROM inventory_variant_values where variant_id = ${id}`
            );

            const [c_row] = await connection.query(
                "INSERT INTO inventory_variant_values (variant_id, variant_value) VALUES ?",
                [valueForDb.map(item => [item.variant_id, item.variant_value])]
            );

        }
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
            "DELETE FROM inventory_variants WHERE id = ?",
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

module.exports = { addVariant, getAllVariant, updateVariant, deleteVariant, getAllVariantValue };
