// require
const getDatabaseConnection = require("../../../../configs/db.config");

// add unit
const addUnitType = async (req, res) => {
    try {
        const {unit_type, description, status, company_id, branch_id} = req.body
        const unit = {unit_type, description, status, company_id, branch_id};
        unit.created_by = req.decoded.email;
        unit.updated_by = req.decoded.email;

        const connection = await getDatabaseConnection();
        const [row] = await connection.query(
            "INSERT INTO inventory_product_units SET ?",
            unit
        );
        connection.release();

        return res.status(200).json({
            status: "ok",
            body: {
                message: "one unit added",
                unit: row,
            },
        });
    } catch (err) {
        console.error(`add unit error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: {
                message: err || "cannot add unit",
            },
        });
    }
};

const getUnitType = async (req, res) => {
    try {
        const columns = ["id", "unit_type", "description", "status"];

        const connection = await getDatabaseConnection();
        const [row] = await connection.query(
            `SELECT
                 inventory_product_units.id,
                 hrm_company.name as company_name_s,
                 hrm_branch.name as branch_name_s,
                 inventory_product_units.unit_type as unit_type_s,
                 inventory_product_units.description description_s,
                 inventory_product_units.status as status_s_g,
                 inventory_product_units.created_by,
                 inventory_product_units.updated_by
             FROM inventory_product_units
                      LEFT JOIN hrm_company ON hrm_company.id = inventory_product_units.company_id
                      LEFT JOIN hrm_branch ON hrm_branch.id = inventory_product_units.branch_id`
        );

        connection.release();

        if (!row.length) throw "no units found";

        return res.status(200).json({
            status: "ok",
            body: {
                message: "get all units`",
                data: row,
            },
        });
    } catch (err) {
        console.error(`get product unit error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: {
                message: err || "cannot get unit",
            },
        });
    }
};

const updateUnitType = async (req, res) => {
    try {
        const unit = ({ unit_type, description, status, pc_address } = req.body);
        unit.created_by = req.decoded.email;
        unit.updated_by = req.decoded.email;
        const { id } = req.params;

        const connection = await getDatabaseConnection();
        const [row] = await connection.query(
            "UPDATE inventory_product_units SET ? WHERE id = ?",
            [unit, id]
        );
        connection.release();

        return res.status(200).json({
            status: "ok",
            body: { message: "one unit updated", contact: row },
        });
    } catch (err) {
        console.error(`add unit error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: { message: err || "cannot update unit" },
        });
    }
};

const deleteUnitType = async (req, res) => {
    try {
        const { id } = req.params;

        const connection = await getDatabaseConnection();
        const [row] = await connection.query(
            "DELETE FROM inventory_product_units WHERE id = ?",
            [id]
        );
        connection.release();

        return res.status(200).json({
            status: "ok",
            body: { message: "one unit deleted", contact: row },
        });
    } catch (err) {
        console.error(`delete unit error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: { message: err || "cannot delete unit" },
        });
    }
};

// export
module.exports = { addUnitType, getUnitType, updateUnitType, deleteUnitType };
