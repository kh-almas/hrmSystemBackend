// require
const getDatabaseConnection = require("../../../../configs/db.config");

// update contact
const updateProductList = async (req, res) => {
  try {
    const product = ({
      unit_id,
      brand_id,
      category_id,
      subcategory_id,
      model_id,
      is_raw_material,
      product_type,
      name,
      sku,
      barcode_type,
      hsn,
      length,
      height,
      zip_length,
      flap_length,
      stitches,
      fabrics,
      front_sheet,
      wall,
      zipper,
      alert_quantity,
      image,
      purchase_price,
      selling_price,
      other_currency_price,
      tax,
      note,
      pc_address,
    } = req.body);
    product.user_id = req.decoded.id;
    product.created_by = req.decoded.email;
    product.updated_by = req.decoded.email;
    const { id } = req.params;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query("UPDATE products SET ? WHERE id = ?", [
      product,
      id,
    ]);
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: { message: "one product list updated", contact: row },
    });
  } catch (err) {
    console.error(`add product list error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot update product list" },
    });
  }
};

// export
module.exports = updateProductList;
