// require
const getDatabaseConnection = require("../../../../configs/db.config");

const addPurchaseQuote = async (req, res) => {
  try {
    const {
      quotation_no,
      total_qty,
      total_price,
      total_discount,
      total_vat,
      other_cost,
      shipping_add,
      branch_id,
      supplier_id,
      status,
      has_lc,
      transaction_date,
    } = req.body;
    const obj = {
      quotation_no,
      total_qty,
      total_price,
      total_discount,
      total_vat,
      other_cost,
      shipping_add,
      branch_id,
      supplier_id,
      status,
      has_lc,
      transaction_date,
    };
    obj.approve_status = "Pending";
    // obj.approve_by = req.decoded.id;
    // obj.approve_date = new Date();
    obj.created_by = req.decoded.id;
    obj.updated_by = req.decoded.id;

    const connection = await getDatabaseConnection();
    const [checkUnique] = await connection.query(
      `SELECT LPAD(FN_primary_id_opening_stock (1, 2), 18, '0') AS Result`
    );
    obj.primary_id = checkUnique?.[0]?.Result;

    const [purchaseQuote] = await connection.query(
      "INSERT INTO inventory_purchase_quot SET ?",
      obj
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: {
        message: "one purchase quote added",
        result: purchaseQuote,
      },
    });
  } catch (err) {
    console.error(`add purchase quote error: ${err}`);
    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot purchase quote" },
    });
  }
};

const getAllPurchaseQuote = async (req, res) => {
  try {
    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `SELECT 
      branch.name as branch_name_s, 
      inventory_contacts.name as supplier_name_s, 
      quote.branch_id, 
      quote.supplier_id, 
      quote.quotation_no, 
      quote.shipping_add, 
      quote.status, 
      quote.has_lc, 
      primary_id,
      quote.transaction_date as transaction_date_s_g, 
      quote.total_qty as total_quantity_s, 
      quote.total_price as total_price_s ,
      quote.total_discount as total_discount_s ,
      quote.total_vat as total_vat_s ,
      quote.other_cost as other_cost_s ,
      quote.approve_status as approve_status_s
      FROM inventory_purchase_quot AS quote
      LEFT JOIN hrm_branch AS branch ON branch.id = quote.branch_id
      LEFT JOIN inventory_contacts ON inventory_contacts.id = quote.supplier_id`
    );
    connection.release();

    // if (!row.length) throw "no opening stock found";

    return res.status(200).json({
      status: "ok",
      body: {
        message: "get all purchase quote`",
        data: row,
      },
    });
  } catch (err) {
    console.error(`get purchase quote error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot get purchase quote" },
    });
  }
};

const updatePurchaseQuote = async (req, res) => {
  try {
    const { primaryId } = req.params;

    const {
      quotation_no,
      total_qty,
      total_price,
      total_discount,
      total_vat,
      other_cost,
      shipping_add,
      branch_id,
      supplier_id,
      status,
      has_lc,
      transaction_date,
    } = req.body;
    const obj = {
      quotation_no,
      total_qty,
      total_price,
      total_discount,
      total_vat,
      other_cost,
      shipping_add,
      branch_id,
      supplier_id,
      status,
      has_lc,
      transaction_date,
    };
    obj.updated_by = req.decoded.id;

    const connection = await getDatabaseConnection();
    const [purchaseQuote] = await connection.query(
      "UPDATE inventory_purchase_quot SET ? WHERE primary_id = ?",
      [obj, primaryId]
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: {
        message: "one purchase quote updated",
        result: purchaseQuote,
      },
    });
  } catch (err) {
    console.error(`update purchase quote error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot update purchase quote" },
    });
  }
};

const deletePurchaseQuote = async (req, res) => {
  try {
    const { primaryId } = req.params;

    const connection = await getDatabaseConnection();
    const [deletePurchaseQuote] = await connection.query(
      "DELETE FROM inventory_purchase_quot WHERE primary_id = ?",
      [primaryId]
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: {
        message: "one purchase quote deleted",
        result: deletePurchaseQuote,
      },
    });
  } catch (err) {
    console.error(`delete purchase quote error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot delete purchase quote" },
    });
  }
};

module.exports = {
  addPurchaseQuote,
  getAllPurchaseQuote,
  updatePurchaseQuote,
  deletePurchaseQuote,
};
