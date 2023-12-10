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

    const connection = await getDatabaseConnection();

    const singleProduct = {unit_id, brand_id, category_id, model_id, is_raw_material, name, hsn, p_height, p_width, p_length, package_height, package_width, package_length, measurement_unit, note}
    singleProduct.product_type = product_type;
    singleProduct.created_by = user_id;
    singleProduct.updated_by = user_id;
    const [singleProductRow] = await connection.query("INSERT INTO inventory_products SET ?", singleProduct);


    if(product_type === "Variant"){
      const varianteProductSKU = {barcode_type, tax_type, tax, p_height, p_width, p_length, package_height, package_width, package_length, measurement_unit,};
      varianteProductSKU.created_by = user_id;
      varianteProductSKU.updated_by = user_id;


      const {variant} = req.body;
      variant?.map( async (singleVariant) => {
        const {sku, opening_stock_quantity, purchase_price, selling_price, variant_id, variation_value_id} = singleVariant;
        const finalData = {...varianteProductSKU, sku, opening_stock_quantity, purchase_price, selling_price,}
        if (singleProductRow?.insertId > 0) {
          finalData.product_id = singleProductRow?.insertId;
          const [singleProductSKURow] = await connection.query("INSERT INTO inventory_products_sku SET ?", finalData);

          if (singleProductSKURow?.insertId > 0){
            const product_sku_id = singleProductSKURow?.insertId
            const inventoryProductVariant = {product_sku_id, variant_id, variation_value_id}
            inventoryProductVariant.created_by = user_id;
            inventoryProductVariant.updated_by = user_id;
            inventoryProductVariant.product_id = singleProductRow?.insertId;

            const [inventoryProductVariantRow] = await connection.query("INSERT INTO inventory_product_variant SET ?", inventoryProductVariant);
          }
        }
      })
    }


    let parent_sku = 0;
    if (product_type === 'Single' || product_type === 'Combo'){
      const singleProductSKU = {sku, opening_stock_quantity, barcode_type, alert_quantity, purchase_price, selling_price, tax_type, tax, p_height, p_width, p_length, package_height, package_width, package_length, measurement_unit,};
      singleProductSKU.created_by = user_id;
      singleProductSKU.updated_by = user_id;

      if (singleProductRow?.insertId > 0) {
        singleProductSKU.product_id = singleProductRow?.insertId;
        const [singleProductSKURow] = await connection.query("INSERT INTO inventory_products_sku SET ?", singleProductSKU);
        parent_sku = singleProductSKURow?.insertId
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
        // console.log(info);
        const [product_combo] = await connection.query("INSERT INTO inventory_products_combo SET ?", info);
        // console.log(product_combo, "product_combo");
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


// get product list
const getProductList = async (req, res) => {
  try {
    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
        `SELECT p.name as name, ps.id as id, ps.sku as sku, pc.name as category_name, pm.name as model_name, pb.name as brand_name

       FROM inventory_products_sku as ps
              LEFT JOIN inventory_products as p ON p.id = ps.product_id
              LEFT JOIN inventory_product_categorys as pc ON p.category_id = pc.id
              LEFT JOIN inventory_product_models pm ON p.model_id = pm.id
              LEFT JOIN inventory_product_brands as pb ON p.brand_id = pb.id

       WHERE p.product_type != 'Combo' and p.product_type != 'Service' and p.status = 1`
    );
    connection.release();

    if (!row.length) throw "no product list found";

    return res.status(200).json({
      status: "ok",
      body: {
        message: "get all product list`",
        data: row,
      },
    });
  } catch (err) {
    console.error(`get product error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot get product list" },
    });
  }
};


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

// update contact
const deleteProductList = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query("DELETE FROM products WHERE id = ?", [
      id,
    ]);
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: { message: "one product deleted", contact: row },
    });
  } catch (err) {
    console.error(`delete product error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot delete product" },
    });
  }
};

//add product options

const addProductOptions = async (req, res) => {
  try {
    const {name, type} = req.body
    const productOptions = {name, type};
    productOptions.created_by = req.decoded.email;
    productOptions.updated_by = req.decoded.email;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
        "INSERT INTO inventory_options SET ?",
        productOptions
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: {
        message: "one product options added",
        unit: row,
      },
    });
  } catch (err) {
    console.error(`add product options error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: {
        message: err || "cannot add product options",
      },
    });
  }
}

const getProductOptions = async (req, res) => {
  try {

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
        `SELECT * FROM inventory_options`
    );

    connection.release();

    if (!row.length) throw "no units found";

    return res.status(200).json({
      status: "ok",
      body: {
        message: "get all units`",
        data: row,
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
}

// export
module.exports = {addProductList, getProductList, updateProductList, deleteProductList, addProductOptions, getProductOptions};
