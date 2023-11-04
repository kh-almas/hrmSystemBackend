// require
const getDatabaseConnection = require("../../../../configs/db.config");

// get subcategory
const getSubcategory = async (req, res) => {
  try {
    const columns = ["id", "name", "code", "category_id", "description"];

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `SELECT ${columns.join(",")} FROM inventory_product_subcategorys`
    );
    connection.release();

    if (!row.length) throw "no subcategories found";

    return res.status(200).json({
      status: "ok",
      body: {
        message: "get all subcategories`",
        subcategories: row,
      },
    });
  } catch (err) {
    console.error(`get product subcategory error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: {
        message: err || "cannot get subcategory",
      },
    });
  }
};

// export
module.exports = getSubcategory;
