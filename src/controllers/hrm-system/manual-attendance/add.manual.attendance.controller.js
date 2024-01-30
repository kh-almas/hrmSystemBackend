// require
const getDatabaseConnection = require("../../../configs/db.config");
const {manualAttendanceService} = require("../../../services/hrm-system/manual-attendance/manual.attendance.service");

// add manual attendance
const addManualAttendanceController = async (req, res) => {
  try {

    const { organization_id, company_id, branch_id, device_id, attendance_type = 2, employee_id, shift_id, date, in_time, out_time, day_type, status } = req.body;
    const data = {organization_id, company_id, branch_id, device_id, attendance_type, employee_id, shift_id, date, in_time, out_time, day_type, status,};

    const { late, early_out, over_time } = await manualAttendanceService(
      req.body.shift_id,
      req.body.in_time,
      req.body.out_time
    );
    data.late = late;
    data.early_out = early_out;
    data.over_time = over_time;
    data.created_by = req?.decoded?.id;


    const connection = await getDatabaseConnection();

    const [check] = await connection.query(
            `SELECT * FROM hrm_manual_attendance WHERE employee_id = '${employee_id}' && date = '${date}'`
    );

    if(check?.length == 0){
      const [row] = await connection.query(
          `INSERT INTO hrm_manual_attendance SET ?`,
          data
      );
      connection.release();

      return res.status(200).json({
        status: "ok",
        body: {
          message: `post a manual attendance`,
          data: row,
        },
      });
    }else
    {
      return res.status(409).json({
        status: "ok",
        body: {
          message: `Can not duplicate a manual attendance`,
          errno:'409'
        },
      });
    }

  } catch (err) {
    console.error(`post a manual attendance error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot post a manual attendance` },
    });
  }
};

// export
module.exports = addManualAttendanceController;
