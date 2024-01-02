// require
const getDatabaseConnection = require("../../../../configs/db.config");

const getAllSkuInList = async (req, res) => {
  try {
    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
        `SELECT 
    sku.id as id,
    sku.sku as productSku,
    sku.barcode_type as barcodeType,
    sku.opening_stock_quantity as openingStockQuantity,
    sku.alert_quantity as alertQuantity,
    sku.purchase_price as purchasePrice,
    sku.selling_price as sellingPrice,
    sku.min_selling_price as minSellingPrice,
    sku.tax_type as taxType,
    sku.tax as tax,
    sku.p_length as productLength,
    sku.p_height as productHeight,
    sku.p_width as productWidth,
    sku.p_weight as productWeight,
    sku.package_height as packageHeight,
    sku.package_width as packageWidth,
    sku.package_length as packageLength,
    sku.package_weight as packageWeight,
    sku.measurement_unit as measurementUnit,
    sku.weight_unit as weightUnit,
    product.unit_id as unitId,
    unit.unit_type as unitType,
    product.brand_id as brandId,
    brand.name as brandName,
    product.category_id as categoryId,
    category.name as categoryName,
    product.model_id as modelId,
    model.name as modelName,
    product.is_raw_material as isRawMaterial,
    product.has_serial_key as hasSerialKey,
    product.product_type as productType,
    product.name as productName,
    product.hsn as hsn,
    product.note as note
        FROM inventory_products_sku as sku
        LEFT JOIN inventory_products as product ON sku.product_id = product.id
        LEFT JOIN inventory_product_units as unit ON product.unit_id = unit.id
        LEFT JOIN inventory_product_brands as brand ON product.brand_id = brand.id
        LEFT JOIN inventory_product_categorys as category ON product.brand_id = category.id
        LEFT JOIN inventory_product_models as model ON product.model_id = model.id
        `
    );

    connection.release();

    return res.status(200).json({
      status: "ok",
      body: {
        message: "get all product",
        data: row,
      },
    });
  } catch (err) {
    console.error(`add variant error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: {
        message: err || "cannot add variant",
      },
    });
  }
}
const getAllProduct = async (req, res) => {
  try {
    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
        `SELECT 
product.id,
 product.name as productName,
    product.unit_id as unitId,
    unit.unit_type as unitType,
    product.brand_id as brandId,
    brand.name as brandName,
    product.category_id as categoryId,
    category.name as categoryName,
    product.model_id as modelId,
    model.name as modelName,
    (SELECT COUNT(*) FROM inventory_products_sku as sku WHERE sku.product_id = product.id) AS totalSku,
   (SELECT GROUP_CONCAT(sku1.sku) FROM inventory_products_sku as sku1 WHERE sku1.product_id = product.id) AS Skus,    
    product.is_raw_material as isRawMaterial,
    product.has_serial_key as hasSerialKey,
    product.product_type as productType,   
    product.hsn as hsn,
    product.note as note
        FROM inventory_products as product 
        LEFT JOIN inventory_product_units as unit ON product.unit_id = unit.id
        LEFT JOIN inventory_product_brands as brand ON product.brand_id = brand.id
        LEFT JOIN inventory_product_categorys as category ON product.brand_id = category.id
        LEFT JOIN inventory_product_models as model ON product.model_id = model.id
       HAVING (SELECT COUNT(*) FROM inventory_products_sku as sku WHERE sku.product_id = product.id) > 0;
        `
    );

    connection.release();

    return res.status(200).json({
      status: "ok",
      body: {
        message: "get all product",
        data: row,
      },
    });
  } catch (err) {
    console.error(`add variant error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: {
        message: err || "cannot add variant",
      },
    });
  }
}

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
  const connection = await getDatabaseConnection();
  try {
    let returnItem;
    const img = req.files?.images;
    const {unit_id, brand_id, category_id, model_id, is_raw_material, has_serial_key, name, hsn, p_height, p_width, p_length, p_weight, package_height, package_width, package_length, package_weight, measurement_unit, note, sku, opening_stock_quantity, barcode_type, alert_quantity, weight_unit, purchase_price, selling_price, min_selling_price, tax_type, tax} = req.body;
    const {product_type} = req.body;
    const user_id = req.decoded.id;

    const skuCode = generateSkuCode();


    await connection.beginTransaction();

    const singleProduct = {unit_id, brand_id, category_id, model_id, is_raw_material, has_serial_key, name, hsn, p_height, p_width, p_length, p_weight, package_height, package_width, package_length, package_weight, measurement_unit, weight_unit, note}
    singleProduct.product_type = product_type;
    singleProduct.created_by = user_id;
    singleProduct.updated_by = user_id;
    const [singleProductRow] = await connection.query("INSERT INTO inventory_products SET ?", singleProduct);

    let parent_sku = 0;
    if (product_type === 'Single' || product_type === 'Combo' || product_type === 'Service'){
      const singleProductSKU = {sku, opening_stock_quantity, barcode_type, alert_quantity, purchase_price, selling_price, min_selling_price, tax_type, tax, p_height, p_width, p_length, p_weight, package_height, package_width, package_length, package_weight, measurement_unit, weight_unit};
      singleProductSKU.created_by = user_id;
      singleProductSKU.updated_by = user_id;

      if (singleProductRow?.insertId > 0) {
        singleProductSKU.product_id = singleProductRow?.insertId;
        const [singleProductSKURow] = await connection.query("INSERT INTO inventory_products_sku SET ?", singleProductSKU);
        parent_sku = singleProductSKURow?.insertId
      }
    }

    img?.map(async (singleImage) => {
      const finalImgData =  {
        product_id: singleProductRow?.insertId,
        type: 'product',
        name: singleImage?.filename,
      }
      const [singleProductImgRow] = await connection.query("INSERT INTO inventory_product_image SET ?", finalImgData);
    })

    const convertObjectToArray = (inputObject) => {
      return Object.values(inputObject).flatMap(innerObj => Object.values(innerObj));
    };

    const processedOption = convertObjectToArray(JSON.parse(req.body?.options));
    processedOption?.map(async singleOption => {
      singleOption.product_id = singleProductRow?.insertId;
      const [productOptionsRow] = await connection.query("INSERT INTO inventory_products_options SET ?", singleOption);
    })


    if(product_type === "Variant"){
      const productVariantSku = JSON.parse(req.body?.variant_sku);


      for (let key in productVariantSku){
        const {sku, opening_stock_quantity, purchase_price, selling_price, tax } = productVariantSku[key];
        const skuValueForVariant = {sku, barcode_type, opening_stock_quantity, alert_quantity, purchase_price, selling_price, min_selling_price, tax_type, tax, p_length, p_height, p_width, p_weight, package_height, package_width, package_length, package_weight, measurement_unit, weight_unit}

        skuValueForVariant.product_id = singleProductRow?.insertId;
        const [singleProductSKURow] = await connection.query("INSERT INTO inventory_products_sku SET ?", skuValueForVariant);

        const variant = JSON.parse(productVariantSku[key]?.variant);
        for (let key in variant){
          const {value, variant_id} = variant[key];
          const variantInfo = {variant_id, variation_value_id: value}
          variantInfo.product_sku_id = singleProductSKURow?.insertId;
          variantInfo.product_id = singleProductRow?.insertId;
          const [inventoryProductVariantRow] = await connection.query("INSERT INTO inventory_product_variant SET ?", variantInfo);
        }
        const skuImage = productVariantSku[key]?.sku_images;

        skuImage?.map(async (singleImage) => {
          const finalSkuImgData =  {
            product_id: singleProductRow?.insertId,
            type: 'sku',
            name: singleImage,
          }
          const [singleProductImgRow] = await connection.query("INSERT INTO inventory_product_image SET ?", finalSkuImgData);

        })
      }
    }

    if (product_type === 'Combo') {
      for (let i = 0; i < req.body?.howManyProduct; i++) {
        const parent_sku_id = parent_sku;
        const productSkuId = `product_id_${i}`;
        const singleQuantity = `quantity_${i}`;
        const {[singleQuantity]: quantity, [productSkuId]: product_sku_id} = req?.body;
        const info = {parent_sku_id, quantity, product_sku_id}
        const [product_combo] = await connection.query("INSERT INTO inventory_products_combo SET ?", info);
      }
    }


    await connection.commit();
    return res.status(200).json({
      status: "ok",
      body: { message: "one product list added"},
    });
  } catch (err) {
    await connection.rollback();
    console.error(`add product list error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot add product list" },
    });
  } finally {
    connection.release();
  }
};


// get product list
const getProductListForComboSelect = async (req, res) => {
  try {
    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
        `SELECT p.name as name, ps.selling_price as price, ps.tax as tax, ps.id as id, ps.sku as sku, pc.name as category_name, pm.name as model_name, pb.name as brand_name

       FROM inventory_products_sku as ps
              LEFT JOIN inventory_products as p ON p.id = ps.product_id
              LEFT JOIN inventory_product_categorys as pc ON p.category_id = pc.id
              LEFT JOIN inventory_product_models pm ON p.model_id = pm.id
              LEFT JOIN inventory_product_brands as pb ON p.brand_id = pb.id

       WHERE p.product_type != 'Combo' and p.product_type != 'Service'`
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

//get single product
const getSingleSkuProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
        `SELECT 
    sku.id as id,
    product.id as productID,
    sku.sku as productSku,
    sku.barcode_type as barcodeType,
    sku.opening_stock_quantity as openingStockQuantity,
    sku.alert_quantity as alertQuantity,
    sku.purchase_price as purchasePrice,
    sku.selling_price as sellingPrice,
    sku.min_selling_price as minSellingPrice,
    sku.tax_type as taxType,
    sku.tax as tax,
    sku.p_length as productLength,
    sku.p_height as productHeight,
    sku.p_width as productWidth,
    sku.p_weight as productWeight,
    sku.package_height as packageHeight,
    sku.package_width as packageWidth,
    sku.package_length as packageLength,
    sku.package_weight as packageWeight,
    sku.measurement_unit as measurementUnit,
    sku.weight_unit as weightUnit,
    product.unit_id as unitId,
    unit.unit_type as unitType,
    product.brand_id as brandId,
    brand.name as brandName,
    product.category_id as categoryId,
    category.name as categoryName,
    product.model_id as modelId,
    model.name as modelName,
    product.is_raw_material as isRawMaterial,
    product.has_serial_key as hasSerialKey,
    product.product_type as productType,
    product.name as productName,
    product.hsn as hsn,
    product.note as note
        FROM inventory_products_sku as sku
        LEFT JOIN inventory_products as product ON sku.product_id = product.id
        LEFT JOIN inventory_product_units as unit ON product.unit_id = unit.id
        LEFT JOIN inventory_product_brands as brand ON product.brand_id = brand.id
        LEFT JOIN inventory_product_categorys as category ON product.brand_id = category.id
        LEFT JOIN inventory_product_models as model ON product.model_id = model.id
        WHERE sku.id = ${id}
        `
    );

    const [productImage] = await connection.query("select * From inventory_product_image WHERE product_id = ?", [
      row[0].productID
    ]);
    // console.log('productImage', productImage)
    // console.log('id', productImage)

    const [productOptions] = await connection.query("select * From inventory_products_options WHERE Product_id = ?", [
      row[0].productID
    ]);

    const [comboProduct] = await connection.query(`
        select 
        productSku.id as id,
        product.name as name,
        combo.quantity as quantity,
        productSku.sku as sku,
        productSku.selling_price as price,
        productSku.tax as tax
        From inventory_products_combo as combo
        LEFT JOIN inventory_products_sku as productSku ON productSku.id = combo.product_sku_id
        LEFT JOIN inventory_products as product ON product.id = productSku.product_id
         WHERE parent_sku_id = ${row[0].id}
        `);

    const [productVariant] = await connection.query(`
        select 
        productVariant.id as id,
        variant.id as variantId,
        variant.name as variantName,
        variantValue.id as variantValueId,
        variantValue.variant_value as variantValue
        From inventory_product_variant as productVariant
        LEFT JOIN inventory_variants as variant ON variant.id = productVariant.variant_id
        LEFT JOIN inventory_variant_values as variantValue ON variantValue.id = productVariant.variation_value_id 
         WHERE product_sku_id = ${row[0].id}
        `);

    row[0].productOptions = productOptions;
    row[0].comboProduct = comboProduct;
    row[0].productVariant = productVariant;

    connection.release();

    return res.status(200).json({
      status: "ok",
      body: {
        message: "get single product",
        data: row,
      },
    });
  } catch (err) {
    console.error(`get single product error: ${err}`);
    return res.status(500).json({
      status: "error",
      body: {
        message: err || "cannot get single product",
      },
    });
  }
}


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

const addVariantValue = async (req, res) => {
  try {
    const {variant_id, variant_value} = req.body
    const variantValue = {variant_id, variant_value};

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
        "INSERT INTO inventory_variant_values SET ?",
        variantValue
    );

    connection.release();

    return res.status(200).json({
      status: "ok",
      body: {
        message: "one variant added",
        data: row,
      },
    });
  } catch (err) {
    console.error(`add variant error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: {
        message: err || "cannot add variant",
      },
    });
  }
}

const getAllSku = async (req, res) => {
  try {
    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
        "SELECT sku FROM inventory_products_sku"
    );

    connection.release();

    return res.status(200).json({
      status: "ok",
      body: {
        message: "get one variant",
        data: row,
      },
    });
  } catch (err) {
    console.error(`add variant error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: {
        message: err || "cannot add variant",
      },
    });
  }
}

// export
module.exports = {getAllSku, addProductList, getAllSkuInList, getAllProduct, getSingleSkuProduct, getProductListForComboSelect, updateProductList, deleteProductList, addProductOptions, getProductOptions, addVariantValue};
