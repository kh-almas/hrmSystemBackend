// require
const getDatabaseConnection = require("../../../../configs/db.config");

// update contact
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
module.exports = deleteModel;
