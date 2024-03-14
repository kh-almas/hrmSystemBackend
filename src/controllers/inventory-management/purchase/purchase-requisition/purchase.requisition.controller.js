// require
const getDatabaseConnection = require("../../../../configs/db.config");

const addPurchaseRequisition = async (req, res) => {
  try {
    const connection = await getDatabaseConnection();

    const {
      requisition_no,
      total_qty,
      shipping_add,
      branch_id,
      supplier_id,
      status,
      transaction_date,
      products,
    } = req.body;
    const purchaseRequisitionObj = {
      requisition_no,
      total_qty,
      shipping_add,
      branch_id,
      supplier_id,
      status,
      transaction_date,
    };
    const [checkUnique] = await connection.query(
      `SELECT LPAD(FN_primary_id_opening_stock (1, 2), 18, '0') AS Result`
    );
    const primary_id = checkUnique?.[0]?.Result;
    purchaseRequisitionObj.primary_id = primary_id;
    purchaseRequisitionObj.approve_status = "Pending";
    purchaseRequisitionObj.created_by = req.decoded.id;
    purchaseRequisitionObj.updated_by = req.decoded.id;

    const [purchaseRequisition] = await connection.query(
      "INSERT INTO inventory_purchase_requisition SET ?",
      purchaseRequisitionObj
    );

    const childInserts = products.map(async (product) => {
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
      singleProduct.transaction_type = "PRQ";

      const [checkUnique] = await connection.query(
        `SELECT LPAD(FN_primary_id_opening_stock (1, 2), 18, '0') AS Result`
      );
      singleProduct.primary_id = checkUnique?.[0]?.Result;
      singleProduct.status = status;
      singleProduct.created_by = req.decoded.id;
      singleProduct.updated_by = req.decoded.id;

      return connection.query(
        "INSERT INTO inventory_purchase_requisition_child SET ?",
        singleProduct
      );
    });

    const purchaseRequisitionChild = await Promise.all(childInserts);

    connection.release();

    console.log("purchaseRequisitionChild", purchaseRequisitionChild);

    return res.status(200).json({
      status: "ok",
      body: {
        message: "one purchase requisition added",
        purchase_requisition_table_data: purchaseRequisition,
        purchase_requisition_child_table_data: purchaseRequisitionChild,
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

// const addPurchaseRequisition = async (req, res) => {
//   try {
//     const connection = await getDatabaseConnection();
//     const [checkUnique] = await connection.query(
//       `SELECT LPAD(FN_primary_id_opening_stock (1, 2), 18, '0') AS Result`
//     );
//     const primary_id = checkUnique?.[0]?.Result;

//     const {
//       requisition_no,
//       total_qty,
//       shipping_add,
//       branch_id,
//       supplier_id,
//       status,
//       transaction_date,
//       transaction_id,
//       price,
//       tax,
//       sales_price,
//       other_cost,
//       discount,
//       products,
//     } = req.body;
//     const purchaseRequisitionObj = {
//       requisition_no,
//       total_qty,
//       shipping_add,
//       branch_id,
//       supplier_id,
//       status,
//       transaction_date,
//     };
//     purchaseRequisitionObj.primary_id = primary_id;
//     purchaseRequisitionObj.approve_status = "Pending";
//     purchaseRequisitionObj.created_by = req.decoded.id;
//     purchaseRequisitionObj.updated_by = req.decoded.id;
//     const [purchaseRequisition] = await connection.query(
//       "INSERT INTO inventory_purchase_requisition SET ?",
//       purchaseRequisitionObj
//     );

//     let purchaseRequisitionChild;
//     products.forEach(async (product) => {
//       const {
//         product_id,
//         sku_id,
//         batch_no,
//         imei_number,
//         price,
//         tax,
//         sales_price,
//         other_cost,
//         discount,
//         request_qty,
//         actual_qty,
//         manufacture_date,
//         expire_date,
//       } = product;

//       const singleProduct = {
//         product_id,
//         sku_id,
//         batch_no,
//         imei_number,
//         request_qty,
//         actual_qty,
//         manufacture_date,
//         expire_date,
//       };
//       singleProduct.transaction_id = transaction_id;
//       singleProduct.transaction_type = "PRQ";
//       singleProduct.primary_id = primary_id;
//       singleProduct.status = status;
//       singleProduct.price = price;
//       singleProduct.tax = tax;
//       singleProduct.sales_price = sales_price;
//       singleProduct.other_cost = other_cost;
//       singleProduct.discount = discount;
//       singleProduct.created_by = req.decoded.id;
//       singleProduct.updated_by = req.decoded.id;

//       [purchaseRequisitionChild] = await connection.query(
//         "INSERT INTO inventory_purchase_requisition_child SET ?",
//         singleProduct
//       );
//     });

//     connection.release();

//     console.log("purchaseRequisitionChild", purchaseRequisitionChild);

//     return res.status(200).json({
//       status: "ok",
//       body: {
//         message: "one purchase requisition added",
//         purchase_requisition_child_table_data: purchaseRequisitionChild,
//         purchase_requisition_table_data: purchaseRequisition,
//       },
//     });
//   } catch (err) {
//     console.error(`add purchase requisition error: ${err}`);
//     return res.status(500).json({
//       status: "error",
//       body: { message: err || "cannot purchase requisition" },
//     });
//   }
// };

// const addPurchaseRequisition = async (req, res) => {
//   try {
//     const {
//       requisition_no,
//       total_qty,
//       shipping_add,
//       branch_id,
//       supplier_id,
//       status,
//       transaction_date,
//     } = req.body;
//     const purchaseRequisitionObj = {
//       requisition_no,
//       total_qty,
//       shipping_add,
//       branch_id,
//       supplier_id,
//       status,
//       transaction_date,
//     };
//     purchaseRequisitionObj.approve_status = "Pending";
//     purchaseRequisitionObj.created_by = req.decoded.id;
//     purchaseRequisitionObj.updated_by = req.decoded.id;

//     const purchaseRequisitionChildObj = {
//       requisition_no,
//       total_qty,
//       shipping_add,
//       branch_id,
//       supplier_id,
//       status,
//     };
//     purchaseRequisitionChildObj.created_by = req.decoded.id;
//     purchaseRequisitionChildObj.updated_by = req.decoded.id;

//     const connection = await getDatabaseConnection();
//     const [checkUnique] = await connection.query(
//       `SELECT LPAD(FN_primary_id_opening_stock (1, 2), 18, '0') AS Result`
//     );
//     purchaseRequisitionObj.primary_id = checkUnique?.[0]?.Result;

//     const [purchaseRequisition] = await connection.query(
//       "INSERT INTO inventory_purchase_requisition SET ?",
//       purchaseRequisitionObj
//     );
//     const [purchaseRequisitionChild] = await connection.query(
//       "INSERT INTO inventory_purchase_requisition_child SET ?",
//       obj
//     );
//     connection.release();

//     return res.status(200).json({
//       status: "ok",
//       body: {
//         message: "one purchase requisition added",
//         purchase_requisition_table_data: purchaseRequisition,
//         purchase_requisition_child_table_data: purchaseRequisitionChild,
//       },
//     });
//   } catch (err) {
//     console.error(`add purchase requisition error: ${err}`);
//     return res.status(500).json({
//       status: "error",
//       body: { message: err || "cannot purchase requisition" },
//     });
//   }
// };

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
      requisition.total_qty, 
      requisition.total_qty as total_quantity_s, 
      requisition.requisition_no as requisition_no_s, 
      requisition.shipping_add as shipping_address_s, 
      requisition.status as status_s, 
      primary_id,
      requisition.transaction_date as transaction_date_s_g, 
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

const getSinglePurchaseRequisition = async (req, res) => {
  try {
    const { primaryId } = req.params;

    const connection = await getDatabaseConnection();
    const [purchaseRequisition] = await connection.query(
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
      LEFT JOIN inventory_contacts ON inventory_contacts.id = requisition.supplier_id
      WHERE requisition.primary_id = primary_id`
    );
    const [purchaseRequisitionChild] = await connection.query(
      `SELECT * FROM inventory_purchase_requisition_child AS requisition_child WHERE requisition_child.transaction_id = ?`,
      primaryId
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: {
        message: "get single purchase requisition",
        requisition: purchaseRequisition,
        requisitionChild: purchaseRequisitionChild,
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
      products,
      approve_status,
    } = req.body;
    const purchaseRequisitionObj = {
      requisition_no,
      total_qty,
      shipping_add,
      branch_id,
      supplier_id,
      status,
      transaction_date,
    };
    purchaseRequisitionObj.approve_status = approve_status;
    purchaseRequisitionObj.updated_by = req.decoded.id;

    const connection = await getDatabaseConnection();
    const [purchaseRequisition] = await connection.query(
      "UPDATE inventory_purchase_requisition SET ?",
      purchaseRequisitionObj
    );

    // Delete existing child records
    await connection.query(
      "DELETE FROM inventory_purchase_requisition_child WHERE transaction_id = ?",
      [primaryId]
    );

    const childInserts = products.map(async (product) => {
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
      // singleProduct.transaction_type = transaction_type;
      // singleProduct.primary_id = primary_id;
      singleProduct.status = status;
      singleProduct.updated_by = req.decoded.id;

      return connection.query(
        "INSERT INTO inventory_purchase_requisition_child SET ?",
        singleProduct
      );
    });

    const purchaseRequisitionChild = await Promise.all(childInserts);

    connection.release();

    return res.status(200).json({
      status: "ok",
      body: {
        message: "one purchase requisition updated",
        purchaseRequisition: purchaseRequisition,
        purchaseRequisitionChild: purchaseRequisitionChild,
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
// const updatePurchaseRequisition = async (req, res) => {
//   try {
//     const { primaryId } = req.params;

//     const {
//       requisition_no,
//       total_qty,
//       shipping_add,
//       branch_id,
//       supplier_id,
//       status,
//       transaction_date,
//     } = req.body;
//     const obj = {
//       requisition_no,
//       total_qty,
//       shipping_add,
//       branch_id,
//       supplier_id,
//       status,
//       transaction_date,
//     };
//     obj.updated_by = req.decoded.id;

//     const connection = await getDatabaseConnection();
//     const [purchaseRequisition] = await connection.query(
//       "UPDATE inventory_purchase_requisition SET ? WHERE primary_id = ?",
//       [obj, primaryId]
//     );
//     connection.release();

//     return res.status(200).json({
//       status: "ok",
//       body: {
//         message: "one purchase requisition updated",
//         result: purchaseRequisition,
//       },
//     });
//   } catch (err) {
//     console.error(`update purchase requisition error: ${err}`);

//     return res.status(500).json({
//       status: "error",
//       body: { message: err || "cannot update purchase requisition" },
//     });
//   }
// };

const deletePurchaseRequisition = async (req, res) => {
  try {
    const { primaryId } = req.params;

    const connection = await getDatabaseConnection();

    // Step 1: Delete records from inventory_purchase_requisition_child
    const [deleteChildRecords] = await connection.query(
      "DELETE FROM inventory_purchase_requisition_child WHERE transaction_id = ?",
      [primaryId]
    );

    // Step 2: Delete record from inventory_purchase_requisition
    const [deletePurchaseRequisition] = await connection.query(
      "DELETE FROM inventory_purchase_requisition WHERE primary_id = ?",
      [primaryId]
    );

    connection.release();

    return res.status(200).json({
      status: "ok",
      body: {
        message: "Purchase requisition and related child records deleted",
        result: {
          purchaseRequisition: deletePurchaseRequisition,
          childRecords: deleteChildRecords,
        },
      },
    });
  } catch (err) {
    console.error(`delete purchase requisition error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot delete purchase requisition" },
    });
  }
};
// const deletePurchaseRequisition = async (req, res) => {
//   try {
//     const { primaryId } = req.params;

//     const connection = await getDatabaseConnection();
//     const [deletePurchaseRequisition] = await connection.query(
//       "DELETE FROM inventory_purchase_requisition WHERE primary_id = ?",
//       [primaryId]
//     );
//     connection.release();

//     return res.status(200).json({
//       status: "ok",
//       body: {
//         message: "one purchase requisition deleted",
//         result: deletePurchaseRequisition,
//       },
//     });
//   } catch (err) {
//     console.error(`delete  purchase requisition error: ${err}`);

//     return res.status(500).json({
//       status: "error",
//       body: { message: err || "cannot delete purchase requisition" },
//     });
//   }
// };

module.exports = {
  addPurchaseRequisition,
  getAllPurchaseRequisition,
  getSinglePurchaseRequisition,
  updatePurchaseRequisition,
  deletePurchaseRequisition,
};
