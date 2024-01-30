// require
const getDatabaseConnection = require("../../../configs/db.config");
const {
  manualAttendanceService,
} = require("../../../services/hrm-system/manual-attendance/manual.attendance.service");

// update manual attendance
const updateManualAttendanceController = async (req, res) => {
  try {
    const { id } = req.params;
    const { employee_id, shift_id, date, in_time, out_time, day_type, status } =
      req.body;
    const data = {employee_id, shift_id, date, in_time, out_time, day_type, status};
    const { late, early_out, over_time } = await manualAttendanceService(
      req.body.shift_id,
      req.body.in_time,
      req.body.out_time
    );
    data.late = late;
    data.early_out = early_out;
    data.over_time = over_time;
    data.updated_by = req.decoded.id;

    const connection = await getDatabaseConnection();

    // const [check] = await connection.query(
    //     `SELECT * FROM hrm_manual_attendance WHERE employee_id = '${employee_id}' && date = '${date}'`
    // );

    // if(check?.length == 0){
      const [row] = await connection.query(
          `UPDATE hrm_manual_attendance SET ? WHERE id = ?`,
          [data, id]
      );
      connection.release();

      return res.status(200).json({
        status: "ok",
        body: {
          message: `put a manual attendance`,
          data: row,
        },
      });
    // }
    // else {
    //   return res.status(409).json({
    //     status: "ok",
    //     body: {
    //       message: `Can not duplicate a manual attendance`,
    //       errno:'409'
    //     },
    //   });
    // }

  } catch (err) {
    console.error(`put a manual attendance error: ${err}`);

    return res.status(500).json({
      status: "err",
      body: { message: err || `cannot put a manual attendance` },
    });
  }
};

// export
module.exports = updateManualAttendanceController;
