// require
const { get, getAll } = require("../../../base/controllers/get.controller");
const getDatabaseConnection = require("../../../configs/db.config");

// column names
const columns = [
  "employee_type",
  "joining_date",
  "emp_machine_id",
  "id",
  'name_title',
  'first_name',
  'last_name',
  'full_name',
  'father_name',
  'mother_name',
  'spouse_name',
  'img',
  'cv',
  'email',
  'phone',
  'date_of_birth',
  'gender',
  'website',
  'job_code',
  'joining_date',
  'account_holder_name',
  'account_number',
  'bank_name',
  'bank_identifier_code',
  'branch_location',
  'tax_pay_id',
  'status',
  'organization_id',
  'company_id',
  'branch_id ',
  'department_id ',
  'designation_id ',
  'section_id',
  'shift_id',
  'employee_grade_id',
  'salary_grade_id',
  'card_no',
  'skills',
  'created_by ',
  'updated_by '
];

// table and data names
const tableName = "hrm_employee";
const dataName = "employee";

// get one employee by id
const getEmployeeController = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
        `SELECT ${columns.join(",")} FROM hrm_employee WHERE id = ?`,
        [id]
    );


    const [contact] = await connection.query(
        `SELECT * FROM hrm_employee_contact WHERE employee_id = ?`,
        [id]
    );

    const result = {
      data: row[0],
      contact: contact
    }
    // console.log(result);
    connection.release();

    if (!row.length) throw `no employee found of id: ${id}`;

    return res.status(200).json({
      status: "ok",
      body: {
        message: `get employee`,
        data: result,
      },
    });
  } catch (err) {
    console.error(`get ${dataName} error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot get ${dataName}` },
    });
  }
};

// get all employee
const getAllEmployeeController = async (req, res) => {
  const { page, item, search } = req.query;
  // const searchData = search ? `${search}%` : '';
  const totalItem = item === "" ? 10 : item;
  const skip = page === "" || page === "1" ? 0 : (parseInt(page) - 1) * totalItem;
  // console.log(page, item, skip)
  try {
    const connection = await getDatabaseConnection();
    const employee = await connection.query(
        `SELECT
           hrm_employee.id,
           hrm_employee.img,
           hrm_employee.employee_type,
           hrm_employee.joining_date,
           hrm_employee.emp_machine_id,
           hrm_employee.name_title,
           hrm_employee.full_name,
           hrm_employee.email,
           hrm_employee.phone,
           hrm_employee.organization_id,
           hrm_employee.branch_id,
           hrm_employee.department_id,
           hrm_employee.designation_id,
           hrm_employee.shift_id,
           hrm_employee.card_no,
           hrm_employee.skills,
           branch.name as branch_name,
           dept.name as dept_name,
           deg.name as deg_name
         FROM hrm_employee
                LEFT JOIN hrm_branch as branch ON hrm_employee.branch_id = branch.id
                LEFT JOIN hrm_department as dept ON hrm_employee.department_id = dept.id
                LEFT JOIN hrm_designation as deg ON hrm_employee.designation_id = deg.id
           ${search ? `WHERE email LIKE '${search}%'` : '' } ${totalItem ? `LIMIT ${totalItem}` : '' } ${skip? `OFFSET ${skip}` : ''}`
    );

    const count = await connection.query(
        `SELECT COUNT(id) as totalItem from hrm_employee  ${search ? `WHERE email LIKE '${search}%'` : '' }`
    )
    const result = {
      count: count[0][0]?.totalItem,
      data: employee[0]
    }
    // console.log(result);
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: {
        message: `get all employee`,
        data: result,
      },
    });
  } catch (err) {
    console.error(`get all employee error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot get all employee` },
    });
  }
};

module.exports = { getEmployeeController, getAllEmployeeController };
