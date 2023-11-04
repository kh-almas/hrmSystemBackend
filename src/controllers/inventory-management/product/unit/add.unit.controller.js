// require
const getDatabaseConnection = require("../../../../configs/db.config");

// add unit
const addUnit = async (req, res) => {
  try {
    const unit = ({ name, description, status, pc_address } = req.body);
    unit.user_id = req.decoded.id;
    unit.created_by = req.decoded.email;
    unit.updated_by = req.decoded.email;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      "INSERT INTO inventory_product_units SET ?",
      unit
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: {
        message: "one unit added",
        unit: row,
      },
    });
  } catch (err) {
    console.error(`add unit error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: {
        message: err || "cannot add unit",
      },
    });
  }
};

// export
module.exports = addUnit;
