// require
const getDatabaseConnection = require("../../../../configs/db.config");

const addStockReconciliation = async (req, res) => {
    try {
        const {date, branch_id, sku_id, system_stock_qty, physical_qty, adjust_qty, batch_no, remarks, audit_by, approve_status, approve_by} = req.body
        const obj = {date, branch_id, sku_id, system_stock_qty, physical_qty, adjust_qty, batch_no, remarks, audit_by, approve_status, approve_by};
        obj.created_by = req.decoded.id;
        obj.updated_by = req.decoded.id;

        const connection = await getDatabaseConnection();
        const [reconciliationRow] = await connection.query(
            "INSERT INTO inventory_product_reconcilation SET ?",
            obj
        );
        connection.release();

        return res.status(200).json({
            status: "ok",
            body: {
                message: "one stock adjustment added",
                info: reconciliationRow,
            },
        });
    } catch (err) {
        console.error(`add stock reconciliation error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: { message: err || "cannot  stock reconciliation stock" },
        });
    }
};

const getAllStockReconciliation = async (req, res) => {
    try {
        const connection = await getDatabaseConnection();
        const [row] = await connection.query(
            `SELECT 
            ipr.id as id,
            ipr.date as date_s_g,
            ipr.branch_id as branch_id,
            ipr.sku_id as sku_id,
            branch.name as name_s,
            product.name as product_s,
            ipr.system_stock_qty as system_stock_quantity_s,
            ipr.physical_qty as physical_quantity_s,
            ipr.adjust_qty as adjust_quantity_s,
            ipr.batch_no as batch_s,
            ipr.remarks as remarks_s,
            ipr.audit_by as audit_by_s,
            ipr.approve_status as approve_status_s
             FROM inventory_product_reconcilation AS ipr
             LEFT JOIN hrm_branch AS branch ON ipr.branch_id = branch.id
             LEFT JOIN inventory_products_sku AS sku ON ipr.sku_id = sku.id
             LEFT JOIN inventory_products AS product ON sku.product_id = product.id`
        );
        connection.release();

        // if (!row.length) throw "no opening stock found";

        return res.status(200).json({
            status: "ok",
            body: {
                message: "get all stock reconciliation`",
                data: row,
            },
        });
    } catch (err) {
        console.error(`get stock reconciliation error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: { message: err || "cannot get stock reconciliation" },
        });
    }
};

const updateStockAdjustment = async (req, res) => {
    try {
        const { batchNo } = req.params;
        const {branch_id, sku_id, purpose_type, ref_id, batch_no, qty, date, purchase_price, sales_price} = req.body
        const obj = {branch_id, sku_id, purpose_type, ref_id, batch_no, qty, date, purchase_price, sales_price};
        obj.created_by = req.decoded.id;
        obj.updated_by = req.decoded.id;

        const pricingObj = {branch_id, sku_id, batch_no, date, purchase_price, selling_price: sales_price};
        pricingObj.created_by = req.decoded.id;
        pricingObj.updated_by = req.decoded.id;

        const connection = await getDatabaseConnection();

        const [adjustmentRow] = await connection.query(
            "UPDATE inventory_product_adjustment SET ? WHERE batch_no = ?",
            [obj, batchNo]
        );
        const [PricingRow] = await connection.query(
            "UPDATE inventory_product_pricing SET ? WHERE batch_no = ?",
            [pricingObj, batchNo]
        );
        connection.release();

        return res.status(200).json({
            status: "ok",
            body: {
                message: "one stock adjustment added",
                adjustment_table_data: adjustmentRow,
                pricing_table_data: PricingRow,
            },
        });
    } catch (err) {
        console.error(`update stock adjustment error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: { message: err || "cannot update stock adjustment" },
        });
    }
};

const deleteStockAdjustment = async (req, res) => {
    try {
        const { batchNo } = req.params;

        const connection = await getDatabaseConnection();
        const [adjustmentRow] = await connection.query(
            "DELETE FROM inventory_product_adjustment WHERE batch_no = ?",
            [batchNo]
        );
        const [PricingRow] = await connection.query(
            "DELETE FROM inventory_product_pricing WHERE batch_no = ?",
            [batchNo]
        );
        connection.release();

        return res.status(200).json({
            status: "ok",
            body: {
                message: "one stock adjustment deleted",
                adjustment_table_data: adjustmentRow,
                pricing_table_data: PricingRow,
            },
        });
    } catch (err) {
        console.error(`delete stock adjustment error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: { message: err || "cannot delete stock adjustment" },
        });
    }
};

module.exports = {
    addStockReconciliation,
    getAllStockReconciliation
};
