// require
const getDatabaseConnection = require("../../../../configs/db.config");

const addStockAdjustment = async (req, res) => {
  try {
    // console.log('req.body', req.body);
    const {branch_id, purpose_type, ref_id = '', sku_id, total_qty, total_price, total_discount, other_cost, total_vat, date} = req.body

    const obj = {branch_id, purpose_type, ref_id, total_qty, total_price, total_discount, other_cost, total_vat, date};
    obj.created_by = req.decoded.id;
    obj.updated_by = req.decoded.id;
    obj.status = 'Active';
    obj.approve_status = 'Pending';

    const childObj = {other_cost};
    childObj.created_by = req.decoded.id;
    childObj.updated_by = req.decoded.id;
    childObj.status = 'Active';

    const transactionsObj = {transaction_type: 'SA', sku_id, price: total_price, tax: total_vat, other_cost, discount: total_discount, request_qty: total_qty, actual_qty: total_qty};
    transactionsObj.created_by = req.decoded.id;
    transactionsObj.updated_by = req.decoded.id;

    const connection = await getDatabaseConnection();
    const [checkUnique] = await connection.query(
        `SELECT LPAD(FN_primary_id_opening_stock (${branch_id}, 2), 18, '0') AS Result`
    );
    obj.primary_id = checkUnique?.[0]?.Result;
    transactionsObj.primary_id = checkUnique?.[0]?.Result;

    console.log('Obj', obj);
    const [adjustmentRow] = await connection.query(
        "INSERT INTO inventory_product_adjustment SET ?",
        obj
    );
    const [TransactionsRow] = await connection.query(
        "INSERT INTO inventory_product_transactions SET ?",
        transactionsObj
    );
    connection.release();

    return res.status(200).json({
        status: "ok",
        body: {
            message: "one stock adjustment added",
            adjustment_table_data: adjustmentRow,
            transactions_table_data: TransactionsRow,
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
            ipa.primary_id as primary_id,
            ipa.branch_id as branch_id,
            ipa.ref_id as ref_id,
            ipa.purpose_type as purpose_type_s_g,
            branch.name as branch_name_s,
            product.name as product_name_s,
            ipa.date as date_s,
            ipa.total_qty as total_qty_s,
            ipa.total_price as total_price_s,
            ipa.total_discount as total_discount_s,
            ipa.other_cost as other_cost_s,
            ipa.total_vat as total_vat_s,
            ipa.approve_status as approve_status_s,
            ipa.approve_date as approve_date_s,
            ipa.status as status_s
             FROM  inventory_product_adjustment AS ipa
             LEFT JOIN hrm_branch AS branch ON ipa.branch_id = branch.id
             LEFT JOIN inventory_products AS product ON product.id = ipa.ref_id`
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
    const { primaryId } = req.params;
    const {branch_id, purpose_type, ref_id, total_qty, total_price, total_discount, other_cost, total_vat, date} = req.body
    const obj = {branch_id, purpose_type, ref_id, total_qty, total_price, total_discount, other_cost, total_vat, date};
    obj.created_by = req.decoded.id;
    obj.updated_by = req.decoded.id;
    obj.status = 'Pending';
    obj.approve_status = 'Pending';

    const pricingObj = {branch_id, sku_id: ref_id, date, purchase_price: total_price};
    pricingObj.created_by = req.decoded.id;
    pricingObj.updated_by = req.decoded.id;

    const connection = await getDatabaseConnection();

    const [adjustmentRow] = await connection.query(
      "UPDATE inventory_product_adjustment SET ? WHERE primary_id = ?",
      [obj, primaryId]
    );
    const [PricingRow] = await connection.query(
      "UPDATE inventory_product_pricing SET ? WHERE primary_id = ?",
      [pricingObj, primaryId]
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
    const { primaryId } = req.params;

    const connection = await getDatabaseConnection();
    const [adjustmentRow] = await connection.query(
      "DELETE FROM inventory_product_adjustment WHERE primary_id = ?",
      [primaryId]
    );
    const [PricingRow] = await connection.query(
      "DELETE FROM inventory_product_pricing WHERE primary_id = ?",
      [primaryId]
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
