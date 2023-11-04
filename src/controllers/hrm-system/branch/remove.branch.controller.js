// require
const getDatabaseConnection = require("../../../configs/db.config");

// remove branch
const removeBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `DELETE FROM hrm_branch WHERE id = ?`,
      [id]
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: { message: `one branch deleted`, data: row },
    });
  } catch (err) {
    console.error(`delete branch error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot delete branch` },
    });
  }
};

// export
module.exports = removeBranch;
