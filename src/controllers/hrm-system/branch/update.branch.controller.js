// require
const getDatabaseConnection = require("../../../configs/db.config");

// update branch
const updateBranchController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = ({ name, email, phone, address, status, company_id } =
      req.body);
    data.updated_by = req.decoded.id;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `UPDATE hrm_branch SET ? WHERE id = ?`,
      [data, id]
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: { message: `one branch updated`, data: row },
    });
  } catch (err) {
    console.error(`update branch error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot update branch` },
    });
  }
};

// export
module.exports = updateBranchController;
