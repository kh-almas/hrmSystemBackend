// require
const getDatabaseConnection = require("../../../configs/db.config");

// update shift
const updateShiftController = async (req, res) => {
  try {
    const { id } = req.params;
    const { DayDiff, organization_id, company_id, branch_id, name, start_time, end_time, weekends, status, note, gross_time } = req.body;
    const data = { DayDiff, organization_id, company_id, branch_id, name, start_time, end_time, weekends, status, note, gross_time };
    data.updated_by = req.decoded.id;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `UPDATE hrm_shift SET ? WHERE id = ?`,
      [data, id]
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: {
        message: `put a shift`,
        data: row,
      },
    });
  } catch (err) {
    console.error(`put a shift error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot put a shift` },
    });
  }
};

// export
module.exports = updateShiftController;
