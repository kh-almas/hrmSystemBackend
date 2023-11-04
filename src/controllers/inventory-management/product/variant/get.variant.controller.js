// require
const getDatabaseConnection = require("../../../../configs/db.config");

// get variant
const getVariant = async (req, res) => {
  try {
    const columns = ["id", "name", "description", "status"];

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `SELECT ${columns.join(",")} FROM inventory_product_variants`
    );
    connection.release();

    if (!row.length) throw "no variants found";

    return res.status(200).json({
      status: "ok",
      body: {
        message: "get all variants`",
        variants: row,
      },
    });
  } catch (err) {
    console.error(`get product variant error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: {
        message: err || "cannot get variant",
      },
    });
  }
};

// export
module.exports = getVariant;
