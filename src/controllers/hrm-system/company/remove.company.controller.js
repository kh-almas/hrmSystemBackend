// require
const getDatabaseConnection = require("../../../configs/db.config");

// remove company
const removeCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `DELETE FROM hrm_company WHERE id = ?`,
      [id]
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: { message: `one company deleted`, data: row },
    });
  } catch (err) {
    console.error(`delete company error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot delete company` },
    });
  }
};

// export
module.exports = removeCompany;
