// require
const getDatabaseConnection = require("../../../../configs/db.config");

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

    console.log(row)

    if (!row.length) throw "no product list found";
    console.log('row', row)

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

// export
module.exports = getProductList;
