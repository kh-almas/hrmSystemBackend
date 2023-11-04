// require
const { get, getAll } = require("../../../base/controllers/get.controller");
const getDatabaseConnection = require("../../../configs/db.config");

// column names
const columns = ["id", "name", "status"];

// table and data names
const tableName = "hrm_designation";
const dataName = "designation";

// get one designation by id
const getDesignationController = (req, res) => {
  const { id } = req.params;

  get(columns, tableName, id, dataName, res);
};

// get all designation
const getAllDesignationController = async (req, res) => {
  let { page, item = 0, search} = req.query;
  const skip = page ? (parseInt(page) - 1) * item : 0;
  search = search ? search : "";
  try {
    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
        `SELECT hrm_designation.id, hrm_designation.name, org.name as organization_name, company.name as company_name, hrm_designation.details, hrm_designation.organization_id, hrm_designation.company_id, hrm_designation.status 
FROM hrm_designation 
    LEFT JOIN hrm_organization as org ON hrm_designation.organization_id = org.id
    LEFT JOIN hrm_company as company ON hrm_designation.company_id = company.id
    WHERE hrm_designation.status = 'Active'
        ${search ? `&& hrm_designation.name LIKE '%${search}%'` : ''}
        ${item !== 0 ? `LIMIT ${item} OFFSET ${skip}` : ''}`
    );

    const count = await connection.query(
        `SELECT COUNT(hrm_designation.id) as totalItem FROM hrm_designation ${search ? `WHERE hrm_designation.name LIKE '%${search}%'` : ''}`
    );
    connection.release();

    const result = {
      count: count[0][0]?.totalItem,
      data: row,
    };

    return res.status(200).json({
      status: "ok",
      body: {
        message: `get all designation`,
        data: result,
      },
    });
  } catch (err) {
    console.error(`get all designation error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot get all designation` },
    });
  }
};

module.exports = { getDesignationController, getAllDesignationController };
