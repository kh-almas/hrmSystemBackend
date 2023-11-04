// require
const getDatabaseConnection = require("../../../../configs/db.config");

// get category
const getCategory = async (req, res) => {
  try {
    const columns = ["id", "name", "code", "description", "status"];

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `SELECT ${columns.join(",")} FROM inventory_product_categorys`
    );
    connection.release();

    if (!row.length) throw "no categories found";

    return res.status(200).json({
      status: "ok",
      body: {
        message: "get all categories`",
        categories: row,
      },
    });
  } catch (err) {
    console.error(`get category error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: {
        message: err || "cannot get category",
      },
    });
  }
};

// export
module.exports = getCategory;
