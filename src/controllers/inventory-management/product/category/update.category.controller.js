// require
const getDatabaseConnection = require("../../../../configs/db.config");

// update contact
const updateCategory = async (req, res) => {
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
    const { id } = req.params;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      "UPDATE inventory_product_categorys SET ? WHERE id = ?",
      [category, id]
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: { message: "one category updated", contact: row },
    });
  } catch (err) {
    console.error(`add category error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot update category" },
    });
  }
};

// export
module.exports = updateCategory;
