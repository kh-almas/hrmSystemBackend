// require
const getDatabaseConnection = require("../../../../configs/db.config");

// add variant
const addVariant = async (req, res) => {
  try {
    const variant = ({ name, description, status, pc_address } = req.body);
    variant.user_id = req.decoded.id;
    variant.created_by = req.decoded.email;
    variant.updated_by = req.decoded.email;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      "INSERT INTO inventory_product_variants SET ?",
      variant
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: {
        message: "one variant added",
        unit: row,
      },
    });
  } catch (err) {
    console.error(`add variant error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: {
        message: err || "cannot add variant",
      },
    });
  }
};

// export
module.exports = addVariant;
