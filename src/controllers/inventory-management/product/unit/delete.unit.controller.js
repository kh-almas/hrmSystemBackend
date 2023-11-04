// require
const getDatabaseConnection = require("../../../../configs/db.config");

// update contact
const deleteUnit = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      "DELETE FROM inventory_product_units WHERE id = ?",
      [id]
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: { message: "one unit deleted", contact: row },
    });
  } catch (err) {
    console.error(`delete unit error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot delete unit" },
    });
  }
};

// export
module.exports = deleteUnit;
