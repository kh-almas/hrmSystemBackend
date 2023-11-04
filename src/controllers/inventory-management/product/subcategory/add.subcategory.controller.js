// require
const getDatabaseConnection = require("../../../../configs/db.config");

// add subcategory
const addSubcategory = async (req, res) => {
  try {
    const subcategory = ({
      category_id,
      name,
      code,
      description,
      status,
      pc_address,
    } = req.body);
    subcategory.user_id = req.decoded.id;
    subcategory.created_by = req.decoded.email;
    subcategory.updated_by = req.decoded.email;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      "INSERT INTO inventory_product_subcategorys SET ?",
      subcategory
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: {
        message: "one subcategory added",
        subcategory: row,
      },
    });
  } catch (err) {
    console.error(`add subcategory error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: {
        message: err || "cannot add subcategory",
      },
    });
  }
};

// export
module.exports = addSubcategory;
