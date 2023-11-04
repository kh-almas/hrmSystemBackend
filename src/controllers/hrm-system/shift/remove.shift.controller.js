// require
const getDatabaseConnection = require("../../../configs/db.config");

// remove shift
const removeShift = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(`DELETE FROM hrm_shift WHERE id = ?`, [
      id,
    ]);
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: { message: `one shift deleted`, data: row },
    });
  } catch (err) {
    console.error(`delete shift error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot delete shift` },
    });
  }
};

// export
module.exports = removeShift;
