// require
const getDatabaseConnection = require("../../../../configs/db.config");

// update contact
const updateModel = async (req, res) => {
  try {
    const model = ({ name, description, status, pc_address } = req.body);
    model.created_by = req.decoded.id;
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

// export
module.exports = updateModel;
