// require
const getDatabaseConnection = require("../../../configs/db.config");

// remove shift
const removeContact = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `DELETE FROM hrm_employee_contact WHERE id = ?`,
      id
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: { message: `one contact deleted`, data: row },
    });
  } catch (err) {
    console.error(`contact deleted error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot contact deleted` },
    });
  }
};

// export
module.exports = removeContact;
