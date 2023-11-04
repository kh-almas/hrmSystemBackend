// require
const { get, getAll } = require("../../../base/controllers/get.controller");
const getDatabaseConnection = require("../../../configs/db.config");

// column names
const columns = ["id", "name", "status", "department_id"];

// table and data names
const tableName = "hrm_section";
const dataName = "section";

// get one section by id
const getSectionController = (req, res) => {
  const { id } = req.params;

  get(columns, tableName, id, dataName, res);
};

// get all section
const getAllSectionController = async (req, res) => {
  try {
    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
        `SELECT hrm_section.id, 
        hrm_section.name, 
        hrm_section.status, 
        hrm_section.department_id, 
        hrm_section.company_id, 
        dept.name as dept_name 
        FROM hrm_section
        LEFT JOIN hrm_department as dept ON hrm_section.department_id = dept.id
        where hrm_section.status = 'Active'`
    );
    connection.release();
    return res.status(200).json({
      status: "ok",
      body: {
        message: `get all section`,
        data: row,
      },
    });
  } catch (err) {
    console.error(`get all section error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot get all section` },
    });
  }
};

module.exports = { getSectionController, getAllSectionController };
