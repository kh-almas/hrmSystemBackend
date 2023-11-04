// require
const getDatabaseConnection = require("../../../../configs/db.config");

// get model
const getModel = async (req, res) => {
  try {
    const columns = ["id", "name", "description", "status"];

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `SELECT ${columns.join(",")} FROM inventory_product_models`
    );
    connection.release();

    if (!row.length) throw "no models found";

    return res.status(200).json({
      status: "ok",
      body: {
        message: "get all models`",
        models: row,
      },
    });
  } catch (err) {
    console.error(`get product model error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: {
        message: err || "cannot get model",
      },
    });
  }
};

// export
module.exports = getModel;
