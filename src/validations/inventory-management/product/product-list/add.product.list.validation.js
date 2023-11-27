// require
const Joi = require("joi");

// schema
const addProductListValidationSchema = Joi.object({
  unit_id: Joi.number().integer().required(),
  brand_id: Joi.number().integer().required(),
  category_id: Joi.number().integer().required(),
  subcategory_id: Joi.number().integer().required(),
  model_id: Joi.number().integer().required(),
  is_raw_material: Joi.number().integer().required(),
  product_type: Joi.string().required(),
  name: Joi.string().required(),
  sku: Joi.string().required(),
  barcode_type: Joi.string().required(),
  hsn: Joi.string().required(),
  length: Joi.string().required(),
  height: Joi.string().required(),
  zip_length: Joi.string().required(),
  flap_length: Joi.string().required(),
  stitches: Joi.string().required(),
  fabrics: Joi.string().required(),
  front_sheet: Joi.string().required(),
  wall: Joi.string().required(),
  zipper: Joi.string().required(),
  alert_quantity: Joi.string().required(),
  image: Joi.string().required(),
  purchase_price: Joi.number().required(),
  selling_price: Joi.number().required(),
  other_currency_price: Joi.number().required(),
  tax: Joi.string().required(),
  note: Joi.string().required(),
  pc_address: Joi.string().required(),
});

// add product List validation
const addProductListValidation = async (req, res, next) => {
  try {
    const {unit_id, brand_id, category_id, model_id, is_raw_material,
          product_type,
          name,
          sku,
          barcode_type,
          hsn,
          p_length,
          p_height,
          p_width,
          package_height,
          package_width,
          package_length,
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
    } = req.body
    const product = {unit_id, brand_id, category_id, model_id, is_raw_material,
      product_type,
      name,
      sku,
      barcode_type,
      hsn,
      p_length,
      p_height,
      p_width,
      package_height,
      package_width,
      package_length,
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
    };

    await addProductListValidationSchema.validateAsync(product);

    next();
  } catch (err) {
    console.error(`add product list validation error: ${err}`);

    return res.status(400).json({
      status: "error",
      body: { message: err },
    });
  }
};

// export
module.exports = addProductListValidation;
