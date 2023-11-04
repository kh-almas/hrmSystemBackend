// require
const getDatabaseConnection = require("../../../../configs/db.config");

// get unit
const getUnit = async (req, res) => {
  try {
    const columns = ["id", "name", "description", "status"];

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `SELECT ${columns.join(",")} FROM inventory_product_units`
    );
    connection.release();

    if (!row.length) throw "no units found";

    return res.status(200).json({
      status: "ok",
      body: {
        message: "get all units`",
        units: row,
      },
    });
  } catch (err) {
    console.error(`get product unit error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: {
        message: err || "cannot get unit",
      },
    });
  }
};

// export
module.exports = getUnit;
