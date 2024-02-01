// require
const getDatabaseConnection = require("../../../../configs/db.config");

const addStockAdjustment = async (req, res) => {
  try {
    const {branch_id, sku_id, purpose_type, ref_id, batch_no, qty, date, purchase_price, sales_price} = req.body
    const obj = {branch_id, sku_id, purpose_type, ref_id, batch_no, qty, date, purchase_price, sales_price};
    obj.created_by = req.decoded.id;
    obj.updated_by = req.decoded.id;

    const pricingObj = {branch_id, sku_id, batch_no, date, purchase_price, selling_price: sales_price};
    pricingObj.created_by = req.decoded.id;
    pricingObj.updated_by = req.decoded.id;

    const connection = await getDatabaseConnection();
    const [checkUnique] = await connection.query(
        `SELECT LPAD(FN_primary_id_opening_stock (${branch_id}, 2), 18, '0') AS Result`
    );
    obj.primary_id = checkUnique?.[0]?.Result;
    pricingObj.primary_id = checkUnique?.[0]?.Result;

    console.log('pricingObj', pricingObj)
    const [adjustmentRow] = await connection.query(
        "INSERT INTO inventory_product_adjustment SET ?",
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
            message: "one stock adjustment added",
            adjustment_table_data: adjustmentRow,
            pricing_table_data: PricingRow,
        },
    });
  } catch (err) {
    console.error(`add stock adjustment error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot  stock adjustment stock" },
    });
  }
};

const getAllStockAdjustment = async (req, res) => {
  try {
    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `SELECT 
            ipa.id as id,
            ipa.branch_id as branch_id,
            ipa.sku_id as sku_id,
            ipa.purpose_type as purpose_type_s,
            ipa.ref_id as ref_id_s,
            ipa.date as date_s_g,
            branch.name as name_s,
            product.name as product_s,
            ipa.batch_no as batch_s,
            ipa.qty  as quantity_s,
            ipa.purchase_price as purchase_price_s,
            ipa.sales_price as selling_price_s
             FROM  inventory_product_adjustment AS ipa
             LEFT JOIN hrm_branch AS branch ON ipa.branch_id = branch.id
             LEFT JOIN inventory_products_sku AS sku ON ipa.sku_id = sku.id
             LEFT JOIN inventory_products AS product ON sku.product_id = product.id`
    );
    connection.release();

    // if (!row.length) throw "no opening stock found";

    return res.status(200).json({
      status: "ok",
      body: {
        message: "get all stock adjustment`",
        data: row,
      },
    });
  } catch (err) {
    console.error(`get stock adjustment error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot get stock adjustment" },
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
  addStockAdjustment,
  getAllStockAdjustment,
  updateStockAdjustment,
  deleteStockAdjustment
};
