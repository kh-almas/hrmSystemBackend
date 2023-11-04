// require
const { get, getAll } = require("../../../base/controllers/get.controller");
const getDatabaseConnection = require("../../../configs/db.config");

// column names
const columns = [
  "id",
  "name",
  "email",
  "phone",
  "vat",
  "address",
  "country",
  "zip",
  "info",
  "status",
];

// table and data names
const tableName = "hrm_organization";
const dataName = "organization";

// get one organization by id
const getOrganizationController = (req, res) => {
  const { id } = req.params;

  get(columns, tableName, id, dataName, res);
};

// get all organization
const getAllOrganizationController = async (req, res) => {
  try {
    let { page, item = 0, search } = req.query;
    const skip = page ? (parseInt(page) - 1) * item : 0;
    search = search ? search : "";
    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
        `SELECT id, name, email, phone, vat, address, country, zip, info, status, shortname,slogan,description
        FROM hrm_organization WHERE status = 'Active'
            ${search ? `&& hrm_organization.name LIKE '%${search}%'` : ''}
            ${item !== 0 ? `LIMIT ${item} OFFSET ${skip}` : ''}
        `
    );
    const count = await connection.query(
        `SELECT
        COUNT(hrm_organization.id) as totalItem
      FROM
        hrm_organization
      ${search ? `WHERE hrm_organization.name LIKE '%${search}%'` : ''}`
    );

    const result = {
      count: count[0][0]?.totalItem,
      data: row,
    };

    connection.release();

    return res.status(200).json({
      status: "ok",
      body: {
        message: `get all organization`,
        data: result,
      },
    });
  } catch (err) {
    console.error(`get all organization error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot get all organization` },
    });
  }
};

module.exports = { getOrganizationController, getAllOrganizationController };
