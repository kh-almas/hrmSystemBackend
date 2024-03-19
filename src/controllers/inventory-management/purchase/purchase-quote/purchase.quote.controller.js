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
      products,
    } = req.body;
    const purchaseQuoteObj = {
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
    purchaseQuoteObj.approve_status = "Pending";
    purchaseQuoteObj.created_by = req.decoded.id;
    purchaseQuoteObj.updated_by = req.decoded.id;

    const connection = await getDatabaseConnection();
    const [checkUnique] = await connection.query(
      `SELECT LPAD(FN_primary_id_opening_stock (1, 2), 18, '0') AS Result`
    );
    const primary_id = checkUnique?.[0]?.Result;
    purchaseQuoteObj.primary_id = primary_id;

    const [purchaseQuote] = await connection.query(
      "INSERT INTO inventory_purchase_quot SET ?",
      purchaseQuoteObj
    );

    const childInserts = products?.map(async (product) => {
      const {
        product_id,
        sku_id,
        batch_no,
        imei_number,
        request_qty,
        actual_qty,
        manufacture_date,
        expire_date,
      } = product;

      const singleProduct = {
        product_id,
        sku_id,
        batch_no,
        imei_number,
        request_qty,
        actual_qty,
        manufacture_date,
        expire_date,
      };

      singleProduct.transaction_id = primary_id;
      singleProduct.transaction_type = "PQ";
      const [checkUnique] = await connection.query(
        `SELECT LPAD(FN_primary_id_opening_stock (1, 2), 18, '0') AS Result`
      );
      singleProduct.primary_id = `PQ${checkUnique?.[0]?.Result}`;
      singleProduct.status = status;
      singleProduct.updated_by = req.decoded.id;
      singleProduct.created_by = req.decoded.id;

      return connection.query(
        "INSERT INTO inventory_purchase_quot_child SET ?",
        singleProduct
      );
    });

    const purchaseQuoteChild = await Promise.all(childInserts);

    connection.release();

    return res.status(200).json({
      status: "ok",
      body: {
        message: "one purchase quote added",
        purchaseQuote: purchaseQuote,
        purchaseQuoteChild: purchaseQuoteChild,
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

const getSinglePurchaseQuote = async (req, res) => {
  try {
    const { primaryId } = req.params;

    const connection = await getDatabaseConnection();
    const [purchaseQuote] = await connection.query(
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

    const [purchaseQuoteChild] = await connection.query(
      `SELECT * FROM inventory_purchase_quot_child AS quot_child WHERE quot_child.transaction_id = ?`,
      primaryId
    );
    connection.release();

    // if (!row.length) throw "no opening stock found";

    return res.status(200).json({
      status: "ok",
      body: {
        message: "get all purchase quote`",
        purchaseQuote: purchaseQuote,
        purchaseQuoteChild: purchaseQuoteChild,
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
      products,
    } = req.body;
    const purchaseQuoteObj = {
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
    purchaseQuoteObj.updated_by = req.decoded.id;

    const connection = await getDatabaseConnection();
    const [purchaseQuote] = await connection.query(
      "UPDATE inventory_purchase_quot SET ? WHERE primary_id = ?",
      [purchaseQuoteObj, primaryId]
    );

    // Delete existing child records
    await connection.query(
      "DELETE FROM inventory_purchase_quot_child WHERE transaction_id = ?",
      [primaryId]
    );

    const childInserts = products?.map(async (product) => {
      const {
        product_id,
        sku_id,
        batch_no,
        imei_number,
        request_qty,
        actual_qty,
        manufacture_date,
        expire_date,
      } = product;

      const singleProduct = {
        product_id,
        sku_id,
        batch_no,
        imei_number,
        request_qty,
        actual_qty,
        manufacture_date,
        expire_date,
      };

      singleProduct.transaction_id = primaryId;
      singleProduct.transaction_type = "PQ";
      const [checkUnique] = await connection.query(
        `SELECT LPAD(FN_primary_id_opening_stock (1, 2), 18, '0') AS Result`
      );
      singleProduct.primary_id = `PQ${checkUnique?.[0]?.Result}`;
      singleProduct.status = status;
      singleProduct.updated_by = req.decoded.id;

      return connection.query(
        "INSERT INTO inventory_purchase_quot_child SET ?",
        singleProduct
      );
    });
    connection.release();

    const purchaseQuoteChild = await Promise.all(childInserts);

    return res.status(200).json({
      status: "ok",
      body: {
        message: "one purchase quote updated",
        purchaseQuote: purchaseQuote,
        purchaseQuoteChild: purchaseQuoteChild,
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

    const [deletePurchaseQuoteChild] = await connection.query(
      "DELETE FROM inventory_purchase_quot_child WHERE transaction_id =?",
      [primaryId]
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: {
        message: "one purchase quote deleted",
        deletePurchaseQuote: deletePurchaseQuote,
        deletePurchaseQuoteChild: deletePurchaseQuoteChild,
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
  getSinglePurchaseQuote,
  updatePurchaseQuote,
  deletePurchaseQuote,
};
