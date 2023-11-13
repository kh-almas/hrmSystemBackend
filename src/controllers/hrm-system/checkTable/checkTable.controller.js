// require
const getDatabaseConnection = require("../../../configs/db.config");


// get all manual attendance
const getAllManualAttendanceControllerForCheck = async (req, res) => {
    try {
        const mainQRY = `SELECT hrm_manual_attendance.id,
                                hrm_manual_attendance.date as date_s_g,
                                hrm_manual_attendance.in_time as in_time_s,
                                hrm_manual_attendance.late as late_s,
                                hrm_manual_attendance.company_id,
                                hrm_manual_attendance.branch_id,
                                hrm_manual_attendance.out_time as out_time_s,
                                hrm_manual_attendance.early_out as early_out_s,
                                hrm_manual_attendance.over_time as over_time_s_a,
                                hrm_manual_attendance.status,
                                hrm_manual_attendance.employee_id,
                                hrm_manual_attendance.shift_id,
                                hrm_manual_attendance.attendance_type,
                                hrm_manual_attendance.created_by,
                                hrm_employee.full_name          as employee_name_s,
                                hrm_shift.name                 as shift_name_s,
                                hrm_manual_attendance.day_type,
                                hrm_weekday.name               as day_name,
                                create_manual_attendance.email as c_mail,
                                hrm_manual_attendance.updated_by,
                                update_manual_attendance.email as u_mail
                         FROM hrm_manual_attendance
                                  LEFT JOIN hrm_employee ON hrm_manual_attendance.employee_id = hrm_employee.id
                                  LEFT JOIN hrm_shift ON hrm_manual_attendance.shift_id = hrm_shift.id
                                  LEFT JOIN hrm_weekday ON hrm_manual_attendance.day_type = hrm_weekday.id
                                  LEFT JOIN users as create_manual_attendance
                                            ON hrm_manual_attendance.created_by = create_manual_attendance.id
                                  LEFT JOIN users as update_manual_attendance
                                            ON hrm_manual_attendance.updated_by = update_manual_attendance.id
        `

        const connection = await getDatabaseConnection();
        const row = await connection.query(
            mainQRY
        );

        const result = {
            data: row[0],
        };

        return res.status(200).json({
            status: "ok",
            body: {
                message: `get all manual attendances`,
                data: result,
            },
        });
    } catch (err) {
        console.error(`get all manual attendances error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: {message: err || `cannot get all manual attendances`},
        });
    }
};


const getAllManualAttendanceControllerForCheckForDropdown = async (req, res) => {
    console.log(req.params);
    try {
        const mainQRY = `SELECT hrm_manual_attendance.id,
                                hrm_manual_attendance.date as date_s_g,
                                hrm_manual_attendance.in_time as in_time_s,
                                hrm_manual_attendance.late as late_s,
                                hrm_manual_attendance.company_id,
                                hrm_manual_attendance.branch_id,
                                hrm_manual_attendance.out_time as out_time_s,
                                hrm_manual_attendance.early_out as early_out_s,
                                hrm_manual_attendance.over_time as over_time_s_a,
                                hrm_manual_attendance.status,
                                hrm_manual_attendance.employee_id,
                                hrm_manual_attendance.shift_id,
                                hrm_manual_attendance.attendance_type,
                                hrm_manual_attendance.created_by,
                                hrm_employee.full_name          as employee_name_s,
                                hrm_shift.name                 as shift_name_s,
                                hrm_manual_attendance.day_type,
                                hrm_weekday.name               as day_name,
                                create_manual_attendance.email as c_mail,
                                hrm_manual_attendance.updated_by,
                                update_manual_attendance.email as u_mail
                         FROM hrm_manual_attendance
                                  LEFT JOIN hrm_employee ON hrm_manual_attendance.employee_id = hrm_employee.id
                                  LEFT JOIN hrm_shift ON hrm_manual_attendance.shift_id = hrm_shift.id
                                  LEFT JOIN hrm_weekday ON hrm_manual_attendance.day_type = hrm_weekday.id
                                  LEFT JOIN users as create_manual_attendance
                                            ON hrm_manual_attendance.created_by = create_manual_attendance.id
                                  LEFT JOIN users as update_manual_attendance
                                            ON hrm_manual_attendance.updated_by = update_manual_attendance.id
        `

        const connection = await getDatabaseConnection();
        const row = await connection.query(
            mainQRY
        );

        const result = {
            data: row[0],
        };

        return res.status(200).json({
            status: "ok",
            body: {
                message: `get all manual attendances for dropdown`,
                data: result,
            },
        });
    } catch (err) {
        console.error(`get all manual attendances error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: {message: err || `cannot get all manual attendances`},
        });
    }
};

module.exports = {getAllManualAttendanceControllerForCheck, getAllManualAttendanceControllerForCheckForDropdown};
