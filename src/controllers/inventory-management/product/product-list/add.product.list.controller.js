// require
const getDatabaseConnection = require("../../../../configs/db.config");

// add product list
const addProductList = async (req, res) => {
  try {
    const {p_height, p_width, p_length, package_height, package_width, package_length, name, sku, barcode_type, hsn, alert_quantity, purchase_price, selling_price, other_currency_price, tax, product_type, unit_id, brand_id, category_id, model_id, note} = req.body
    const product = {p_height, p_width, p_length, package_height, package_width, package_length, name, sku, barcode_type, hsn, alert_quantity, purchase_price, selling_price, other_currency_price, tax, product_type, unit_id, brand_id, category_id, model_id, note};
    product.user_id = req.decoded.id;
    product.created_by = req.decoded.email;
    product.updated_by = req.decoded.email;

    // console.log('product', product);

    const connection = await getDatabaseConnection();
    const [row] = await connection.query("INSERT INTO inventory_products SET ?", product);
    // console.log('row', row) // insertId
    if (row?.insertId > 0) {
      for (let i = 0; i < req.body?.howManyProduct; i++) {
        const productName= `product_id_${i}`;
        const quantity = `quantity_${i}`;
        const price = `price_${i}`;
        const p_tax = `tax_${i}`;

        const {[productName] : product_id, [quantity]: stock_quantity, [price]: selling_price , [p_tax]: tax } = req?.body;
        const info = {product_id, stock_quantity, selling_price, tax}
        const [sub_row] = await connection.query("INSERT INTO inventory_products_sku SET ?", info);
        console.log(sub_row, "sub_row");
      }
    }

    connection.release();

    return res.status(200).json({
      status: "ok",
      body: { message: "one product list added", product: row },
    });
  } catch (err) {
    console.error(`add product list error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot add product list" },
    });
  }
};

// export
module.exports = addProductList;
