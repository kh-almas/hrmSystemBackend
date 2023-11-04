// require
const getDatabaseConnection = require("../../../../configs/db.config");

// add category
const addCategory = async (req, res) => {
  try {
    const category = ({
      name,
      code,
      description,
      status,
      parent_id,
      pc_address,
    } = req.body);
    category.created_by = req.decoded.email;
    category.updated_by = req.decoded.email;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      "INSERT INTO inventory_product_categorys SET ?",
      category
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: {
        message: "one category added",
        category: row,
      },
    });
  } catch (err) {
    console.error(`add category error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: {
        message: err || "cannot add category",
      },
    });
  }
};

// export
module.exports = addCategory;
