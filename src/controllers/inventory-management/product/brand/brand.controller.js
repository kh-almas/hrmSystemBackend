// require
const getDatabaseConnection = require("../../../../configs/db.config");

const addBrand = async (req, res) => {
  try {
    const brand = ({ name, description, status, pc_address } = req.body);
    brand.created_by = req.decoded.email;
    brand.updated_by = req.decoded.email;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      "INSERT INTO inventory_product_brands SET ?",
      brand
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: {
        message: "one brand added",
        brand: row,
      },
    });
  } catch (err) {
    console.error(`add brand error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot add brand" },
    });
  }
};

const getBrand = async (req, res) => {
  try {
    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
        `SELECT
           inventory_product_brands.id,
           hrm_company.name as company_name_s,
           hrm_branch.name as branch_name_s,
           inventory_product_brands.name as name_s,
           inventory_product_brands.description description_s,
           inventory_product_brands.status as status_s_g,
           inventory_product_brands.created_by,
           inventory_product_brands.updated_by
         FROM inventory_product_brands
                LEFT JOIN hrm_company ON hrm_company.id = inventory_product_brands.company_id
                LEFT JOIN hrm_branch ON hrm_branch.id = inventory_product_brands.branch_id`
    );
    connection.release();

    if (!row.length) throw "no brands found";

    return res.status(200).json({
      status: "ok",
      body: {
        message: "get all brands`",
        data: row,
      },
    });
  } catch (err) {
    console.error(`get brand error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot get brand" },
    });
  }
};

const updateBrand = async (req, res) => {
  try {
    const brand = ({ name, description, status, pc_address } = req.body);
    brand.created_by = req.decoded.email;
    brand.updated_by = req.decoded.email;
    const { id } = req.params;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
        "UPDATE inventory_product_brands SET ? WHERE id = ?",
        [brand, id]
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: { message: "one brand updated", contact: row },
    });
  } catch (err) {
    console.error(`add brand error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot update brand" },
    });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
        "DELETE FROM inventory_product_brands WHERE id = ?",
        [id]
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: { message: "one brand deleted", contact: row },
    });
  } catch (err) {
    console.error(`delete brand error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot delete brand" },
    });
  }
};

module.exports = {addBrand, getBrand, updateBrand, deleteBrand};
