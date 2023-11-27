// require
const getDatabaseConnection = require("../../../../configs/db.config");

// get product list
const getProductList = async (req, res) => {
  try {
    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `SELECT * FROM  inventory_products`
    );
    connection.release();

    if (!row.length) throw "no product list found";

    return res.status(200).json({
      status: "ok",
      body: {
        message: "get all product list`",
        data: row,
      },
    });
  } catch (err) {
    console.error(`get product error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot get product list" },
    });
  }
};

// export
module.exports = getProductList;
