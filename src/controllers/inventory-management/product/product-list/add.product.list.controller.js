// require
const getDatabaseConnection = require("../../../../configs/db.config");

function generateSkuCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let skuCode = '';

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    skuCode += characters.charAt(randomIndex);
  }

  return skuCode;
}



// add product list
const addProductList = async (req, res) => {
  // console.log(req.body);
  try {
    const {
      unit_id,
      brand_id,
      category_id,
      model_id,
      is_raw_material,
      name,
      hsn,
      p_height,
      p_width,
      p_length,
      package_height,
      package_width,
      package_length,
      measurement_unit,
      note,
      sku,
      opening_stock_quantity,
      barcode_type,
      alert_quantity,
      purchase_price,
      selling_price,
      tax_type,
      tax
    } = req.body;
    const {product_type} = req.body
    const user_id = req.decoded.id;

    const skuCode = generateSkuCode();
    console.log('skuCode', skuCode);

    // console.log('product', product);





    const connection = await getDatabaseConnection();

    const singleProduct = {unit_id, brand_id, category_id, model_id, is_raw_material, name, hsn, p_height, p_width, p_length, package_height, package_width, package_length, measurement_unit, note}
    singleProduct.product_type = product_type;
    singleProduct.created_by = user_id;
    singleProduct.updated_by = user_id;
    const [singleProductRow] = await connection.query("INSERT INTO inventory_products SET ?", singleProduct);



    let parent_sku = 0;
    if (product_type === 'Single' || product_type === 'Combo'){
      const singleProductSKU = {sku, opening_stock_quantity, barcode_type, alert_quantity, purchase_price, selling_price, tax_type, tax, p_height, p_width, p_length, package_height, package_width, package_length, measurement_unit,};
      singleProductSKU.created_by = user_id;
      singleProductSKU.updated_by = user_id;

      if (singleProductRow?.insertId > 0) {
        singleProductSKU.product_id = singleProductRow?.insertId;
        const [singleProductSKURow] = await connection.query("INSERT INTO inventory_products_sku SET ?", singleProductSKU);
        parent_sku = singleProductSKURow?.insertId
        // console.log('singleProductSKURow', singleProductSKURow)
      }
    }


    if (product_type === 'Combo'){
      for (let i = 0; i < req.body?.howManyProduct; i++) {
        const parent_sku_id = parent_sku;
        const productSkuId= `product_id_${i}`;
        const singleQuantity = `quantity_${i}`;
        // const price = `price_${i}`;
        // const p_tax = `tax_${i}`;

        const {[singleQuantity]: quantity, [productSkuId] : product_sku_id} = req?.body;
        const info = {parent_sku_id, quantity, product_sku_id}
        console.log(info);
        const [product_combo] = await connection.query("INSERT INTO inventory_products_combo SET ?", info);
        console.log(product_combo, "product_combo");
    }

    connection.release();

    return res.status(200).json({
      status: "ok",
      body: { message: "one product list added", product: 'row' },
    });
  }} catch (err) {
    console.error(`add product list error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot add product list" },
    });
  }
};

// export
module.exports = addProductList;
