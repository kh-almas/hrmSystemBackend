// require
const getDatabaseConnection = require("../../../../configs/db.config");

// update contact
const updateSubcategory = async (req, res) => {
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
    const { id } = req.params;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      "UPDATE inventory_product_subcategorys SET ? WHERE id = ?",
      [subcategory, id]
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: { message: "one subcategory updated", contact: row },
    });
  } catch (err) {
    console.error(`add subcategory error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot update subcategory" },
    });
  }
};

// export
module.exports = updateSubcategory;
