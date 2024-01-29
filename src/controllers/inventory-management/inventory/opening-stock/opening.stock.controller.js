// require
const getDatabaseConnection = require("../../../../configs/db.config");

const addOpeningStock = async (req, res) => {
    try {
        const {branch_id, sku_id, batch_no, date, qty, purchase_price, selling_price, total_discount} = req.body
        const obj = {branch_id, sku_id, batch_no, date, qty, purchase_price, selling_price, total_discount};
        obj.created_by = req.decoded.id;
        obj.updated_by = req.decoded.id;

        const pricingObj = {branch_id, sku_id, batch_no, date, purchase_price, selling_price};
        pricingObj.created_by = req.decoded.id;
        pricingObj.updated_by = req.decoded.id;

        // console.log('obj', req.decoded)

        const connection = await getDatabaseConnection();
        const [stockRow] = await connection.query(
            "INSERT INTO inventory_opening_stock SET ?",
            obj
        );
        const [PricingRow] = await connection.query(
            "INSERT INTO inventory_product_pricing SET ?",
            pricingObj
        );
        connection.release();

        return res.status(200).json({
            status: "ok",
            body: {
                message: "one opening added",
                brand: 'row',
            },
        });
    } catch (err) {
        console.error(`add opening stock error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: { message: err || "cannot add opening stock" },
        });
    }
};

const getAllOpeningStock = async (req, res) => {
    try {
        const connection = await getDatabaseConnection();
        const [row] = await connection.query(
            `SELECT 
            ios.date as date_s_g,
            branch.name as name_s,
            product.name as product_s,
            ios.batch_no as batch_s,
            ios.qty  as quantity_s,
            ios.purchase_price as purchase_price_s,
            ios.selling_price as selling_price_s,
            ios.total_discount as total_discount_s
             FROM  inventory_opening_stock AS ios
             LEFT JOIN hrm_branch AS branch ON ios.branch_id = branch.id
             LEFT JOIN inventory_products_sku AS sku ON ios.sku_id = sku.id
             LEFT JOIN inventory_products AS product ON sku.product_id = product.id`
        );
        connection.release();

        if (!row.length) throw "no brands found";
        // console.log('jaf', row)

        return res.status(200).json({
            status: "ok",
            body: {
                message: "get all brands`",
                data: row,
            },
        });
    } catch (err) {
        console.error(`get brand error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: { message: err || "cannot get brand" },
        });
    }
};

const updateBrand = async (req, res) => {
    try {
        const brand = ({ name, description, status, pc_address } = req.body);
        brand.created_by = req.decoded.email;
        brand.updated_by = req.decoded.email;
        const { id } = req.params;

        const connection = await getDatabaseConnection();
        const [row] = await connection.query(
            "UPDATE inventory_product_brands SET ? WHERE id = ?",
            [brand, id]
        );
        connection.release();

        return res.status(200).json({
            status: "ok",
            body: { message: "one brand updated", contact: row },
        });
    } catch (err) {
        console.error(`add brand error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: { message: err || "cannot update brand" },
        });
    }
};

const deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;

        const connection = await getDatabaseConnection();
        const [row] = await connection.query(
            "DELETE FROM inventory_product_brands WHERE id = ?",
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

module.exports = {addOpeningStock, getAllOpeningStock};
