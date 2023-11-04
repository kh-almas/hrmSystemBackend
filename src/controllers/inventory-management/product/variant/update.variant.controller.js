// require
const getDatabaseConnection = require("../../../../configs/db.config");

// update contact
const updateVariant = async (req, res) => {
  try {
    const variant = ({ name, description, status, pc_address } = req.body);
    variant.user_id = req.decoded.id;
    variant.created_by = req.decoded.email;
    variant.updated_by = req.decoded.email;
    const { id } = req.params;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      "UPDATE inventory_product_variants SET ? WHERE id = ?",
      [variant, id]
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: { message: "one variant updated", contact: row },
    });
  } catch (err) {
    console.error(`add variant error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot update variant" },
    });
  }
};

// export
module.exports = updateVariant;
