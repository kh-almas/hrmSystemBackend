// require
const getDatabaseConnection = require("../../../../configs/db.config");

// add category
const addCategory = async (req, res) => {
  try {
    const {name, code, description, status, parent_id, parent_name, pc_address, company_id, branch_id} = req.body
    const category = {name, code, description, status, parent_id, parent_name, pc_address, company_id, branch_id};
    category.created_by = req.decoded.email;
    category.updated_by = req.decoded.email;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      "INSERT INTO inventory_product_categorys SET ?",
      category
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: {
        message: "one category added",
        data: row,
      },
    });
  } catch (err) {
    console.error(`add category error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: {
        message: err || "cannot add category",
      },
    });
  }
};

const getCategory = async (req, res) => {
  try {
    // name, code, description, status, parent_id, parent_name, pc_address, company_id, branch_id
    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
        `SELECT
           inventory_product_categorys.name as name_s,
           inventory_product_categorys.code as code_s,
           hrm_company.name as company_name_s,
           hrm_branch.name as branch_name_s,
           inventory_product_categorys.description as description_s,
           inventory_product_categorys.status as status_s,
           inventory_product_categorys.parent_id,
           inventory_product_categorys.parent_name as parent_name_s_g,
           inventory_product_categorys.pc_address
        FROM inventory_product_categorys
        LEFT JOIN hrm_company ON hrm_company.id = inventory_product_categorys.company_id
        LEFT JOIN hrm_branch ON hrm_branch.id = inventory_product_categorys.branch_id`
    );
    connection.release();

    if (!row.length) throw "no categories found";

    return res.status(200).json({
      status: "ok",
      body: {
        message: "get all categories`",
        data: row,
      },
    });
  } catch (err) {
    console.error(`get category error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: {
        message: err || "cannot get category",
      },
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const {name, code, description, status, parent_id, parent_name, pc_address, company_id, branch_id} = req.body
    const category = {name, code, description, status, parent_id, parent_name, pc_address, company_id, branch_id};
    category.created_by = req.decoded.email;
    category.updated_by = req.decoded.email;
    const { id } = req.params;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
        "UPDATE inventory_product_categorys SET ? WHERE id = ?",
        [category, id]
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: { message: "one category updated", contact: row },
    });
  } catch (err) {
    console.error(`add category error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot update category" },
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
        "DELETE FROM inventory_product_categorys WHERE id = ?",
        [id]
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: { message: "one category deleted", contact: row },
    });
  } catch (err) {
    console.error(`delete category error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot delete category" },
    });
  }
};

// export
module.exports = {addCategory, getCategory, updateCategory, deleteCategory};
