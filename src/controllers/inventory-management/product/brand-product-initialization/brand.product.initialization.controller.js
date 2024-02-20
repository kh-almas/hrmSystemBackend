// require
const getDatabaseConnection = require("../../../../configs/db.config");

const getBrandProductInitialization = async (req, res) => {
    try {
        const { id } = req.params;

        if (id)
        {
            const connection = await getDatabaseConnection();
            const [row] = await connection.query(
                `SELECT product_id FROM inventory_product_inetialization WHERE branch_id = ${id}`
            );

            connection.release();

            return res.status(200).json({
                status: "ok",
                body: {
                    message: "get all product settings`",
                    data: row,
                },
            });
        }else{
            return res.status(200).json({
                status: "ok",
                body: {
                    message: "get all product settings`",
                    data: 'row',
                },
            });
        }


        // if (!row.length) throw "no units found";


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
        const data  = req.body;
        const { id } = req.params;

        const connection = await getDatabaseConnection();
        data?.map(async singleData => {
            const makeData = {branch_id: id, product_id: singleData?.id}
            const [row] = await connection.query(
                "INSERT INTO inventory_product_inetialization SET ?",
                [makeData]
            );
        })

        connection.release();

        return res.status(200).json({
            status: "ok",
            body: { message: "one unit updated", contact: 'row' },
        });
    } catch (err) {
        console.error(`add unit error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: { message: err || "cannot update unit" },
        });
    }
};

const deleteBrandProductInitialization = async (req, res) => {
    try {
        const { id } = req.params;

        const connection = await getDatabaseConnection();
        const [row] = await connection.query(
            "DELETE FROM inventory_product_inetialization WHERE id = ?",
            [id]
        );
        connection.release();

        return res.status(200).json({
            status: "ok",
            body: { message: "one brand deleted", contact: row },
        });
    } catch (err) {
        console.error(`delete brand error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: { message: err || "cannot delete brand" },
        });
    }
};

module.exports = { getBrandProductInitialization, updateBrandProductInitialization, deleteBrandProductInitialization };