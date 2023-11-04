// require
const getDatabaseConnection = require("../../../../configs/db.config");

// update contact
const deleteSubcategory = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      "DELETE FROM inventory_product_subcategorys WHERE id = ?",
      [id]
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: { message: "one subcategory deleted", contact: row },
    });
  } catch (err) {
    console.error(`delete subcategory error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot delete subcategory" },
    });
  }
};

// export
module.exports = deleteSubcategory;
