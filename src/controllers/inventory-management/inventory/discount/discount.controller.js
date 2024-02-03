// require
const getDatabaseConnection = require("../../../../configs/db.config");

const addDiscount = async (req, res) => {
    try {
        const {branch_id, date, sku_id, purchase_price, selling_price, batch_no, discount_type, discount_percent, discount_value, approve_status} = req.body
        const obj = {branch_id, date, sku_id, purchase_price, selling_price, batch_no, discount_type, discount_percent, discount_value, approve_status};
        obj.created_by = req.decoded.id;
        obj.updated_by = req.decoded.id;

        const connection = await getDatabaseConnection();
        const [checkUnique] = await connection.query(
            `SELECT LPAD(FN_primary_id_opening_stock (${branch_id}, 2), 18, '0') AS Result`
        );
        console.log('checkUnique', checkUnique)
        obj.primary_id = checkUnique?.[0]?.Result;
        const [reconciliationRow] = await connection.query(
            "INSERT INTO inventory_product_discount SET ?",
            obj
        );
        connection.release();

        return res.status(200).json({
            status: "ok",
            body: {
                message: "one discount added",
                info: reconciliationRow,
            },
        });
    } catch (err) {
        console.error(`add discount error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: { message: err || "cannot discount stock" },
        });
    }
};

const getAllDiscount = async (req, res) => {
    try {
        const connection = await getDatabaseConnection();
        const [row] = await connection.query(
            `SELECT 
            ipd.id as id,
            ipd.primary_id as primary_id,
            ipd.branch_id as branch_id,
            ipd.date as date_s_g,
            branch.name as name_s,
            product.name as product_s,
            ipd.sku_id as sku_id,
            ipd.purchase_price as purchase_price_s,
            ipd.selling_price as selling_price_s,
            ipd.batch_no as batch_s,
            ipd.discount_type as discount_type_s,
            ipd.discount_percent as discount_percent_s,
            ipd.discount_value as discount_value_s,
            ipd.approve_status as approve_status_s,
            user.email as approve_by_s
            
             FROM inventory_product_discount AS ipd
             LEFT JOIN hrm_branch AS branch ON ipd.branch_id = branch.id
             LEFT JOIN inventory_products_sku AS sku ON ipd.sku_id = sku.id
             LEFT JOIN inventory_products AS product ON sku.product_id = product.id
             LEFT JOIN users AS user ON ipd.approve_by = user.id`
        );
        connection.release();

        return res.status(200).json({
            status: "ok",
            body: {
                message: "get all discount",
                data: row,
            },
        });
    } catch (err) {
        console.error(`get discount error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: { message: err || "cannot get discount" },
        });
    }
};

const updateDiscount = async (req, res) => {
    try {
        const { primaryId } = req.params;
        const {branch_id, date, sku_id, purchase_price, selling_price, batch_no, discount_type, discount_percent, discount_value, approve_status} = req.body
        const obj = {branch_id, date, sku_id, purchase_price, selling_price, batch_no, discount_type, discount_percent, discount_value, approve_status};
        obj.created_by = req.decoded.id;
        obj.updated_by = req.decoded.id;

        const connection = await getDatabaseConnection();

        const [reconciliationRow] = await connection.query(
            "UPDATE inventory_product_discount SET ? WHERE primary_id = ?",
            [obj, primaryId]
        );
        connection.release();

        return res.status(200).json({
            status: "ok",
            body: {
                message: "one discount update",
                info: reconciliationRow,
            },
        });
    } catch (err) {
        console.error(`update discount error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: { message: err || "cannot update discount" },
        });
    }
};

const deleteDiscount = async (req, res) => {
    try {
        const { primaryId } = req.params;

        const connection = await getDatabaseConnection();
        const [adjustmentRow] = await connection.query(
             "DELETE FROM inventory_product_discount WHERE primary_id = ?",
            [primaryId]
        );
        connection.release();

        return res.status(200).json({
            status: "ok",
            body: {
                message: "one discount deleted",
                item: adjustmentRow,
            },
        });
    } catch (err) {
        console.error(`delete discount error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: { message: err || "cannot delete discount" },
        });
    }
};

module.exports = {
    addDiscount,
    getAllDiscount,
    updateDiscount,
    deleteDiscount
};
