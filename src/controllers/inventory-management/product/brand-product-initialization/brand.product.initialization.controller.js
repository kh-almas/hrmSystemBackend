// require
const getDatabaseConnection = require("../../../../configs/db.config");

const getBrandProductInitialization = async (req, res) => {
    try {
        const columns = ["id", "unit_type", "description", "status"];

        const connection = await getDatabaseConnection();
        const [row] = await connection.query(
            `SELECT * FROM inventory_settings`
        );
        console.log(row);

        connection.release();

        if (!row.length) throw "no units found";

        return res.status(200).json({
            status: "ok",
            body: {
                message: "get all product settings`",
                data: row,
            },
        });
    } catch (err) {
        console.error(`get product settings error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: {
                message: err || "cannot get settings",
            },
        });
    }
};

const updateBrandProductInitialization = async (req, res) => {
    try {
        const settings  = req.body;
        const { id } = req.params;

        const connection = await getDatabaseConnection();
        const [row] = await connection.query(
            "UPDATE inventory_settings SET ? WHERE id = ?",
            [settings, id]
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

module.exports = { getBrandProductInitialization, updateBrandProductInitialization };