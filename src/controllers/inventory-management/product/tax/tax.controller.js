// require
const getDatabaseConnection = require("../../../../configs/db.config");

// add variant
const addTax = async (req, res) => {
    try {
        const {name, tax, status} = req.body
        const taxData = {name, tax, status};
        taxData.created_by = req.decoded.id;
        taxData.updated_by = req.decoded.id;

        const connection = await getDatabaseConnection();
        const [row] = await connection.query(
            "INSERT INTO inventory_product_tax SET ?",
            taxData
        );

        connection.release();

        return res.status(200).json({
            status: "ok",
            body: {
                message: "one tax item added",
                unit: row,
            },
        });
    } catch (err) {
        console.error(`add tax item error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: {
                message: err || "cannot add tax item",
            },
        });
    }
};

const getAllTax = async (req, res) => {
    try {

        const connection = await getDatabaseConnection();
        const [row] = await connection.query(
            `SELECT id, name AS name_s, tax As tax_s, status As status_s_g FROM inventory_product_tax`
        );
        connection.release();

        return res.status(200).json({
            status: "ok",
            body: {
                message: "get all tax`",
                data: row,
            },
        });
    } catch (err) {
        console.error(`get product tax error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: {
                message: err || "cannot get tax",
            },
        });
    }
};


const updateTax = async (req, res) => {
    try {
        const {name, description, status, company_id, branch_id, variantValue } = req.body
        const taxValue = {name, tax, status};
        taxData.created_by = req.decoded.id;
        taxData.updated_by = req.decoded.id;
        const { id } = req.params;

        const connection = await getDatabaseConnection();
        const [row] = await connection.query(
            "UPDATE inventory_product_tax SET ? WHERE id = ?",
            [taxValue, id]
        );
        connection.release();

        return res.status(200).json({
            status: "ok",
            body: { message: "one tax item updated", contact: row },
        });
    } catch (err) {
        console.error(`add variant error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: { message: err || "cannot update tax item" },
        });
    }
};

const deleteTax = async (req, res) => {
    try {
        const { id } = req.params;

        const connection = await getDatabaseConnection();
        const [row] = await connection.query(
            "DELETE FROM inventory_product_tax WHERE id = ?",
            [id]
        );
        connection.release();

        return res.status(200).json({
            status: "ok",
            body: { message: "one tax item deleted", contact: row },
        });
    } catch (err) {
        console.error(`delete tax item error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: { message: err || "cannot delete tax item" },
        });
    }
};

module.exports = { addTax, getAllTax, updateTax, deleteTax};
