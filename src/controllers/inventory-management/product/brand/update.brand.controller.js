// require
const getDatabaseConnection = require("../../../../configs/db.config");

// update contact
const updateBrand = async (req, res) => {
  try {
    const brand = ({ name, description, status, pc_address } = req.body);
    brand.created_by = req.decoded.email;
    brand.updated_by = req.decoded.email;
    const { id } = req.params;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      "UPDATE inventory_product_brands SET ? WHERE id = ?",
      [brand, id]
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: { message: "one brand updated", contact: row },
    });
  } catch (err) {
    console.error(`add brand error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot update brand" },
    });
  }
};

// export
module.exports = updateBrand;
