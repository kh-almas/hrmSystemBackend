// require
const getDatabaseConnection = require("../../../configs/db.config");

// add branch
const addBranchController = async (req, res) => {
  try {
    const data = ({ name, email, phone, address, status, company_id } =
      req.body);
    data.created_by = req.decoded.id;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(`INSERT INTO hrm_branch SET ?`, data);
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: {
        message: `post a branch`,
        data: row,
      },
    });
  } catch (err) {
    console.error(`post a branch error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot post a branch` },
    });
  }
};

// export
module.exports = addBranchController;
