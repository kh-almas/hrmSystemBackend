// require
const getDatabaseConnection = require("../../../../configs/db.config");

// add brand
const addBrand = async (req, res) => {
  try {
    const brand = ({ name, description, status, pc_address } = req.body);
    brand.created_by = req.decoded.email;
    brand.updated_by = req.decoded.email;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      "INSERT INTO inventory_product_brands SET ?",
      brand
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: {
        message: "one brand added",
        brand: row,
      },
    });
  } catch (err) {
    console.error(`add brand error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot add brand" },
    });
  }
};

// export
module.exports = addBrand;
