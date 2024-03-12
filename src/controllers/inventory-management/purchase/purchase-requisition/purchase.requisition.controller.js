// require
const getDatabaseConnection = require("../../../../configs/db.config");

const addPurchaseRequisition = async (req, res) => {
  try {
    const {
      requisition_no,
      total_qty,
      shipping_add,
      branch_id,
      supplier_id,
      status,
      transaction_date,
    } = req.body;
    const obj = {
      requisition_no,
      total_qty,
      shipping_add,
      branch_id,
      supplier_id,
      status,
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

    const [purchaseRequisition] = await connection.query(
      "INSERT INTO inventory_purchase_requisition SET ?",
      obj
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: {
        message: "one purchase requisition added",
        result: purchaseRequisition,
      },
    });
  } catch (err) {
    console.error(`add purchase requisition error: ${err}`);
    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot purchase requisition" },
    });
  }
};

const getAllPurchaseRequisition = async (req, res) => {
  try {
    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `SELECT 
      requisition.id, 
      branch.name as branch_name_s, 
      inventory_contacts.name as supplier_name_s, 
      requisition.branch_id, 
      requisition.supplier_id, 
      requisition.requisition_no, 
      requisition.total_qty, 
      requisition.shipping_add, 
      requisition.status, 
      primary_id,
      requisition.transaction_date as transaction_date_s_g, 
      requisition.total_qty as total_quantity_s, 
      requisition.approve_status as approve_status_s 
      FROM inventory_purchase_requisition AS requisition
      LEFT JOIN hrm_branch AS branch ON branch.id = requisition.branch_id
      LEFT JOIN inventory_contacts ON inventory_contacts.id = requisition.supplier_id`
    );
    connection.release();

    // if (!row.length) throw "no opening stock found";

    return res.status(200).json({
      status: "ok",
      body: {
        message: "get all purchase requisition`",
        data: row,
      },
    });
  } catch (err) {
    console.error(`get purchase requisition error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot get purchase requisition" },
    });
  }
};

const updatePurchaseRequisition = async (req, res) => {
  try {
    const { primaryId } = req.params;

    const {
      requisition_no,
      total_qty,
      shipping_add,
      branch_id,
      supplier_id,
      status,
      transaction_date,
    } = req.body;
    const obj = {
      requisition_no,
      total_qty,
      shipping_add,
      branch_id,
      supplier_id,
      status,
      transaction_date,
    };
    obj.updated_by = req.decoded.id;

    const connection = await getDatabaseConnection();
    const [purchaseRequisition] = await connection.query(
      "UPDATE inventory_purchase_requisition SET ? WHERE primary_id = ?",
      [obj, primaryId]
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: {
        message: "one purchase requisition updated",
        result: purchaseRequisition,
      },
    });
  } catch (err) {
    console.error(`update purchase requisition error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot update purchase requisition" },
    });
  }
};

const deletePurchaseRequisition = async (req, res) => {
  try {
    const { primaryId } = req.params;

    const connection = await getDatabaseConnection();
    const [deletePurchaseRequisition] = await connection.query(
      "DELETE FROM inventory_purchase_requisition WHERE primary_id = ?",
      [primaryId]
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: {
        message: "one purchase requisition deleted",
        result: deletePurchaseRequisition,
      },
    });
  } catch (err) {
    console.error(`delete  purchase requisition error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot delete purchase requisition" },
    });
  }
};

module.exports = {
  addPurchaseRequisition,
  getAllPurchaseRequisition,
  updatePurchaseRequisition,
  deletePurchaseRequisition,
};
