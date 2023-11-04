// require
const getDatabaseConnection = require("../../../../configs/db.config");

// update contact
const updateUnit = async (req, res) => {
  try {
    const unit = ({ name, description, status, pc_address } = req.body);
    unit.user_id = req.decoded.id;
    unit.created_by = req.decoded.email;
    unit.updated_by = req.decoded.email;
    const { id } = req.params;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      "UPDATE inventory_product_units SET ? WHERE id = ?",
      [unit, id]
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: { message: "one unit updated", contact: row },
    });
  } catch (err) {
    console.error(`add unit error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot update unit" },
    });
  }
};

// export
module.exports = updateUnit;
