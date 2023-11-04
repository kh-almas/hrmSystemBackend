// require
const getDatabaseConnection = require("../../../configs/db.config");

// remove manual attendance
const removeManualAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `DELETE FROM hrm_manual_attendance WHERE id = ?`,
      [id]
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: { message: `one manual attendance deleted`, data: row },
    });
  } catch (err) {
    console.error(`delete manual attendance error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot delete manual attendance` },
    });
  }
};

// export
module.exports = removeManualAttendance;
