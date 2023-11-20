// require
const getDatabaseConnection = require("../../../../configs/db.config");

// add model
const addModel = async (req, res) => {
  try {
    const {name, description, status, company_id, branch_id, pc_address } = req.body
    const model = {name, description, status, company_id, branch_id, pc_address };
    model.created_by = req.decoded.email;
    model.updated_by = req.decoded.email;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      "INSERT INTO inventory_product_models SET ?",
      model
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: {
        message: "one model added",
        category: row,
      },
    });
  } catch (err) {
    console.error(`add model error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: {
        message: err || "cannot add model",
      },
    });
  }
};

const getModel = async (req, res) => {
  try {
    const columns = ["id", "name", "description", "status"];

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
        `SELECT
           inventory_product_models.id,
           hrm_company.name as company_name_s,
           hrm_branch.name as branch_name_s,
           inventory_product_models.name as name_s,
           inventory_product_models.description description_s,
           inventory_product_models.status as status_s_g,
           inventory_product_models.created_by,
           inventory_product_models.updated_by
         FROM inventory_product_models
                LEFT JOIN hrm_company ON hrm_company.id = inventory_product_models.company_id
                LEFT JOIN hrm_branch ON hrm_branch.id = inventory_product_models.branch_id`
    );
    connection.release();

    if (!row.length) throw "no models found";

    return res.status(200).json({
      status: "ok",
      body: {
        message: "get all models`",
        data: row,
      },
    });
  } catch (err) {
    console.error(`get product model error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: {
        message: err || "cannot get model",
      },
    });
  }
};

const updateModel = async (req, res) => {
  try {
    const {name, description, status, company_id, branch_id, pc_address } = req.body
    const model = {name, description, status, company_id, branch_id, pc_address };
    model.created_by = req.decoded.email;
    model.updated_by = req.decoded.email;
    const { id } = req.params;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
        "UPDATE inventory_product_models SET ? WHERE id = ?",
        [model, id]
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: { message: "one model updated", contact: row },
    });
  } catch (err) {
    console.error(`add model error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot update model" },
    });
  }
};

const deleteModel = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
        "DELETE FROM inventory_product_models WHERE id = ?",
        [id]
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: { message: "one model deleted", contact: row },
    });
  } catch (err) {
    console.error(`delete model error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot delete model" },
    });
  }
};

// export
module.exports = { addModel, getModel, updateModel, deleteModel };
