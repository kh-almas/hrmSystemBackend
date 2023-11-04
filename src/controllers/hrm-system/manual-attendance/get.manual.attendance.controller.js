// require
const getDatabaseConnection = require("../../../configs/db.config");

// get one manual attendance by id
const getManualAttendanceController = async (req, res) => {
    try {
        const {id} = req.params;

        const connection = await getDatabaseConnection();
        const [row] = await connection.query(
            `SELECT *
             FROM hrm_manual_attendance
             WHERE id = ?`,
            [id]
        );
        connection.release();

        return res.status(200).json({
            status: "ok",
            body: {message: `get a manual attendance`, data: row},
        });
    } catch (err) {
        console.error(`get manual attendance error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: {message: err || `cannot get a manual attendance`},
        });
    }
};

// get all manual attendance
const getAllManualAttendanceController = async (req, res) => {
    try {
        let {page, item, search = '', branch = '', company = '', startdate = '', enddate = '', singledays= ''} = req.query;
        const totalItem = item ? item : 10;
        const skip = page ? (parseInt(page) - 1) * totalItem : 0;

        let que = ``;

        if (search !== '') {
            que = `&& hrm_employee.full_name LIKE '%${search}%'`
        }
        if (company !== '') {
            que = `&& hrm_manual_attendance.company_id = '${company}'`
        }

        if (search !== '' && company !== '') {
            que = `&& hrm_employee.full_name LIKE '%${search}%'' && hrm_manual_attendance.company_id = '${company}'`
        }
        if (branch !== '' && company !== '') {
            que = `&& hrm_manual_attendance.branch_id = '${branch}' && hrm_manual_attendance.company_id = '${company}'`
        }
        if (search !== '' && branch !== '') {
            que = `&& hrm_employee.full_name LIKE '%${search}%' && hrm_manual_attendance.branch_id = '${branch}'`
        }
        if (search !== '' && company !== '' && branch !== '') {
            que = `&& hrm_employee.full_name LIKE '%${search}%' && hrm_manual_attendance.company_id = '${company}' && hrm_manual_attendance.branch_id = '${branch}'`
        }
        if (startdate !== '' && enddate !== '' ) {
            que = `&& hrm_manual_attendance.date BETWEEN '${startdate}' AND '${enddate}'`
        }

        if (startdate !== ''  && enddate !== '' && company !== '' ) {
            que = `&& hrm_manual_attendance.company_id = '${company}' && hrm_manual_attendance.date BETWEEN '${startdate}' AND '${enddate}'`
        }

        if (startdate !== ''  && enddate !== ''  && branch !== '' && company !== '' ) {
            que = `&& hrm_manual_attendance.date BETWEEN '${startdate}' AND '${enddate}' && hrm_manual_attendance.branch_id = '${branch}' && hrm_manual_attendance.company_id = '${company}' `
        }

        if (startdate !== ''  && enddate !== ''  && search !== '') {
            que = `&& hrm_manual_attendance.date BETWEEN '${startdate}' AND '${enddate}' && hrm_employee.full_name LIKE '%${search}%'`
        }

        if (startdate !== ''  && enddate !== ''  && branch !== '' && company !== '' && search !== '') {
            que = `&& hrm_manual_attendance.date BETWEEN '${startdate}' AND '${enddate}' && hrm_manual_attendance.branch_id = '${branch}' && hrm_manual_attendance.company_id = '${company}' && hrm_employee.full_name LIKE '%${search}%'`
        }

        if (singledays !== '') {
            que = `&& hrm_manual_attendance.date = '${singledays}'`
        }

        if (singledays !== '' && company !== '' ) {
            que = `&& hrm_manual_attendance.company_id = '${company}' && hrm_manual_attendance.date = '${singledays}'`
        }

        if (singledays !== '' && branch !== '' && company !== '' ) {
            que = `&& hrm_manual_attendance.date = '${singledays}' && hrm_manual_attendance.branch_id = '${branch}' && hrm_manual_attendance.company_id = '${company}' `
        }

        if (singledays !== '' && search !== '') {
            que = `&& hrm_manual_attendance.date = '${singledays}' && hrm_employee.full_name LIKE '%${search}%'`
        }

        if (singledays !== '' && branch !== '' && company !== '' && search !== '') {
            que = `&& hrm_manual_attendance.date = '${singledays}' && hrm_manual_attendance.branch_id = '${branch}' && hrm_manual_attendance.company_id = '${company}' && hrm_employee.full_name LIKE '%${search}%'`
        }

        const mainQRY = `SELECT hrm_manual_attendance.id,
                                hrm_manual_attendance.date,
                                hrm_manual_attendance.in_time,
                                hrm_manual_attendance.late,
                                hrm_manual_attendance.company_id,
                                hrm_manual_attendance.branch_id,
                                hrm_manual_attendance.out_time,
                                hrm_manual_attendance.early_out,
                                hrm_manual_attendance.over_time,
                                hrm_manual_attendance.status,
                                hrm_manual_attendance.employee_id,
                                hrm_manual_attendance.shift_id,
                                hrm_manual_attendance.attendance_type,
                                hrm_manual_attendance.created_by,
                                hrm_employee.full_name         as employee_name,
                                hrm_shift.name                 as shift_name,
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
                                  WHERE hrm_manual_attendance.attendance_type = '2'
                             ${que}
         LIMIT ${totalItem}
                         OFFSET ${skip}
        `

        const connection = await getDatabaseConnection();
        const row = await connection.query(
            mainQRY
        );

        const itemcount = `SELECT COUNT(hrm_manual_attendance.employee_id) as totalItem,
                                  hrm_employee.full_name
                           FROM hrm_manual_attendance
                                    LEFT JOIN
                                hrm_employee
                                ON
                                    hrm_manual_attendance.employee_id = hrm_employee.id
                                WHERE hrm_manual_attendance.attendance_type = '2'
                               ${que}`

        const count = await connection.query(
            `${itemcount}`
        );
        const result = {
            count: count[0][0]?.totalItem,
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

module.exports = {
    getManualAttendanceController,
    getAllManualAttendanceController,
};
