// require
const getDatabaseConnection = require("../../configs/db.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

// login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `SELECT 
    users.id, users.email, users.password, emp.organization_id as orgID, emp.company_id as comID, emp.branch_id as branchID , emp.department_id as deptID 
FROM users 
        LEFT JOIN hrm_employee as emp ON emp.email = users.email  WHERE users.email = ?`,
      [email]
    );
    connection.release();

    if (!row.length || !(await bcrypt.compare(password, row[0].password)))
      throw "invalid credentials";

    const token = jwt.sign(
      { id: row[0].id, email },
      process.env.SECRET ?? "Tiggzy IT",
      {
        expiresIn: "7d",
      }
    );

    console.log(row)

    return res.status(200).json({
      status: "ok",
      body: {
        message: "login successful",
        token,
        id: row[0].id,
        org_id: row[0].orgID,
        email,
        com_id: row[0].comID,
        branch_id: row[0].branchID,
        dept_id: row[0].deptID,
      },
    });
  } catch (err) {
    console.error(`login error: ${err}`);

    return res.status(401).json({ status: "error", body: { message: err } });
  }
};

// export
module.exports = login;
