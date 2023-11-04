// require
const getDatabaseConnection = require("../../../configs/db.config");

// add shift
const addShiftController = async (req, res) => {
  try {
    const {DayDiff, organization_id, company_id, branch_id, name, start_time, end_time, weekends, status, note, gross_time } = req.body;
    const data = {DayDiff, organization_id, company_id, branch_id, name, start_time, end_time, weekends, status, note, gross_time };
    data.created_by = req?.decoded?.id;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(`INSERT INTO hrm_shift SET ?`, data);
    connection.release();

    // console.log(row);
    return res.status(200).json({
      status: "ok",
      body: {
        message: `post a shift`,
        data: row,
      },
    });
  } catch (err) {
    console.error(`post a shift error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot post a shift` },
    });
  }
};

// export
module.exports = addShiftController;
