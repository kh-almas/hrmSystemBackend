// require
const getDatabaseConnection = require("../../../configs/db.config");

// add shift schedule
const addShiftScheduleController = async (req, res) => {
  try {
    const { date_from, date_to, shift_from, shift_to, active_on, status } =
      req.body;
    const data = {
      date_from,
      date_to,
      shift_from,
      shift_to,
      active_on,
      status,
    };
    data.created_by = req.decoded.id;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `INSERT INTO hrm_shift_schedule SET ?`,
      data
    );
    connection.release();

    // console.log(row);
    return res.status(200).json({
      status: "ok",
      body: {
        message: `post a shift schedule`,
        data: row,
      },
    });
  } catch (err) {
    console.error(`post a shift schedule: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot post a shift schedule` },
    });
  }
};

// export
module.exports = addShiftScheduleController;
