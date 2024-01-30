// require
const { get, getAll } = require("../../../base/controllers/get.controller");
const getDatabaseConnection = require("../../../configs/db.config");

// column names
const columns = ["id", "name", "details", "status"];

// table and data names
const tableName = "hrm_department";
const dataName = "department";

// get one department by id
const getDepartmentController = (req, res) => {
  const { id } = req.params;

  get(columns, tableName, id, dataName, res);
};

// get all department
const getAllDepartmentController = async (req, res) => {
  let { page, item = 0, search} = req.query;
  const skip = page ? (parseInt(page) - 1) * item : 0;
  search = search ? search : "";
  try {
    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
        `SELECT 
    hrm_department.id, 
    hrm_department.name,
    hrm_department.company_id, 
    hrm_department.details, 
    hrm_department.status, 
    com.name as company_name 
FROM hrm_department 
    LEFT JOIN hrm_company as com ON hrm_department.company_id = com.id
    WHERE hrm_department.status = 'Active'
        ${search ? `&& hrm_department.name LIKE '%${search}%'` : ''}
        ${item !== 0 ? `LIMIT ${item} OFFSET ${skip}` : ''}`
    );

    const count = await connection.query(
        `SELECT COUNT(hrm_department.id) as totalItem FROM hrm_department
    ${search ? `WHERE hrm_department.name LIKE '%${search}%'` : ''}`
    );

    const result = {
      count: count[0][0]?.totalItem,
      data: row,
    };

    connection.release();

    return res.status(200).json({
      status: "ok",
      body: {
        message: `get all department`,
        data: result,
      },
    });
  } catch (err) {
    console.error(`get all department error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot get all department` },
    });
  }
};

module.exports = { getDepartmentController, getAllDepartmentController };
