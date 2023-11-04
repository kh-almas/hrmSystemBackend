// require
const getDatabaseConnection = require("../../../configs/db.config");

// get one branch by id
const getBranchController = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `SELECT 
        id,
        name,
        email,
        phone,
        address,
        status,
        company_id
      FROM 
        hrm_branch
      WHERE id = ?`,
      [id]
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: { message: `get a branch`, data: row },
    });
  } catch (err) {
    console.error(`get branch error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot get a branch` },
    });
  }
};

// get all branch
const getAllBranchController = async (req, res) => {
  let { page, item = 0, search} = req.query;
  const skip = page ? (parseInt(page) - 1) * item : 0;
  search = search ? search : "";
  try {
    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `SELECT 
        hrm_branch.id, 
        hrm_branch.name, 
        hrm_branch.email, 
        hrm_branch.phone, 
        hrm_branch.address, 
        hrm_branch.status, 
        hrm_branch.company_id, 
        hrm_company.name as company_name,
        hrm_branch.created_by,
        create_branch.email as c_mail,
        hrm_branch.updated_by,
        update_branch.email as u_mail,
        hrm_company.name as company_name
      FROM 
        hrm_branch 
      LEFT JOIN
        hrm_company 
      ON 
        hrm_branch.company_id = hrm_company.id
      LEFT JOIN
        users as create_branch
      ON
        hrm_branch.created_by = create_branch.id
      LEFT JOIN
        users as update_branch
      ON
        hrm_branch.updated_by = update_branch.id
        WHERE hrm_branch.status = 'Active'
        ${search ? `&& hrm_branch.name LIKE '%${search}%'` : ''}
        ${item !== 0 ? `LIMIT ${item} OFFSET ${skip}` : ''}`
    );

    const count = await connection.query(
        `SELECT COUNT(hrm_branch.id) as totalItem FROM hrm_branch ${search ? `WHERE hrm_branch.name LIKE '%${search}%'` : ''}`
    );

    const result = {
      count: count[0][0]?.totalItem,
      data: row,
    };

    connection.release();

    // console.log(result);

    return res.status(200).json({
      status: "ok",
      body: { message: `get all branches`, data: result },
    });
  } catch (err) {
    console.error(`get all branches error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot get all branches` },
    });
  }
};

module.exports = { getBranchController, getAllBranchController };
