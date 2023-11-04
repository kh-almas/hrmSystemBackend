// require
const getDatabaseConnection = require("../../../../configs/db.config");

// get brand
const getBrand = async (req, res) => {
  try {
    const columns = ["id", "name", "description", "status"];

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `SELECT ${columns.join(",")} FROM inventory_product_brands`
    );
    connection.release();

    if (!row.length) throw "no brands found";

    return res.status(200).json({
      status: "ok",
      body: {
        message: "get all brands`",
        brands: row,
      },
    });
  } catch (err) {
    console.error(`get brand error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot get brand" },
    });
  }
};

// export
module.exports = getBrand;
