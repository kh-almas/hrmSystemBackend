// require
const getDatabaseConnection = require("../../../../configs/db.config");

const addPurchaseProduct = async (req, res) => {
    try {
        const {sku_id, price, tax, sales_price, other_cost, discount, qty} = req.body
        const obj = {sku_id, price, tax, sales_price, other_cost, discount, qty};
        obj.created_by = req.decoded.id;
        obj.updated_by = req.decoded.id;

        const connection = await getDatabaseConnection();
        const [checkUnique] = await connection.query(
            `SELECT LPAD(FN_primary_id_opening_stock (1, 2), 18, '0') AS Result`
        );
        obj.primary_id = checkUnique?.[0]?.Result;

        const [purchaseProducts] = await connection.query(
            "INSERT INTO inventory_purchase_products SET ?",
            obj
        );
        connection.release();

        return res.status(200).json({
            status: "ok",
            body: {
                message: "one purchase product added",
                result: purchaseProducts,
            },
        });
    } catch (err) {
        console.error(`add purchase product error: ${err}`);
        return res.status(500).json({
            status: "error",
            body: { message: err || "cannot purchase product stock" },
        });
    }
};

const getAllPurchaseProduct = async (req, res) => {
    try {
        const connection = await getDatabaseConnection();
        const [row] = await connection.query(
            `SELECT 
            ipp.id as id,
            ipp.primary_id as primary_id,
            ipp.sku_id as sku_id,
            product.name as product_s,
            ipp.price as price,
            ipp.tax as tax,
            ipp.qty as quantity_s,
            ipp.sales_price as sales_price_s,
            ipp.discount as discount_s,
            ipp.other_cost as other_cost_s
             FROM inventory_purchase_products AS ipp
             LEFT JOIN inventory_products_sku AS sku ON ipp.sku_id = sku.id
             LEFT JOIN inventory_products AS product ON sku.product_id = product.id`
        );
        connection.release();

        // if (!row.length) throw "no opening stock found";

        return res.status(200).json({
            status: "ok",
            body: {
                message: "get all purchase product`",
                data: row,
            },
        });
    } catch (err) {
        console.error(`get purchase product error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: { message: err || "cannot get purchase product" },
        });
    }
};

const updatePurchaseProduct = async (req, res) => {
    try {
        const { primaryId } = req.params;

        const {sku_id, price, tax, sales_price, other_cost, discount, qty} = req.body
        const obj = {sku_id, price, tax, sales_price, other_cost, discount, qty};
        obj.created_by = req.decoded.id;
        obj.updated_by = req.decoded.id;

        const connection = await getDatabaseConnection();
        const [purchaseProduct] = await connection.query(
            "UPDATE inventory_purchase_products SET ? WHERE primary_id = ?",
            [obj, primaryId]
        );
        connection.release();

        return res.status(200).json({
            status: "ok",
            body: {
                message: "one purchase product added",
                result: purchaseProduct,
            },
        });
    } catch (err) {
        console.error(`update purchase product error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: { message: err || "cannot update purchase product" },
        });
    }
};

const deletePurchaseProduct = async (req, res) => {
    try {
        const { primaryId } = req.params;

        const connection = await getDatabaseConnection();
        const [deleteProduct] = await connection.query(
            "DELETE FROM inventory_purchase_products WHERE primary_id = ?",
            [primaryId]
        );
        connection.release();

        return res.status(200).json({
            status: "ok",
            body: { message: "one purchase products deleted", result: deleteProduct },
        });
    } catch (err) {
        console.error(`delete  purchase products error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: { message: err || "cannot delete purchase products" },
        });
    }
};

module.exports = {addPurchaseProduct, getAllPurchaseProduct, updatePurchaseProduct, deletePurchaseProduct};
