// require
const getDatabaseConnection = require("../../../../configs/db.config");

// add model
const addModel = async (req, res) => {
  try {
    const model = ({ name, description, status, pc_address } = req.body);
    model.created_by = req.decoded.id;
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

// export
module.exports = addModel;
