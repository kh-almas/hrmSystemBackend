const moment = require("moment");
const getDatabaseConnection = require("../../../configs/db.config");

const manualAttendanceReport = async (req, res) => {
  try {
    const sortedData = [];
    const connection = await getDatabaseConnection();

    const company = await connection.query(`SELECT * FROM hrm_company`);

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
                                hrm_manual_attendance.created_by,
                                hrm_employee.full_name         as employee_name,
                                hrm_employee.card_no         as c_no,
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
                                            ON hrm_manual_attendance.updated_by = update_manual_attendance.id`;

    for (let i = 0; i <= company[0].length - 1; i++) {
      let companyId = company[0][i]?.id;
      let allBranch = await connection.query(
        `SELECT * FROM hrm_branch WHERE company_id = ${companyId}`
      );
      if (allBranch[0].length !== 0) {
        let sortAttendanceWithBranch = [];
        for (let j = 0; j <= allBranch[0]?.length - 1; j++) {
          let branchID = allBranch[0][j]?.id;
          let allAttendance = await connection.query(
            `${mainQRY} WHERE hrm_manual_attendance.branch_id = ${branchID}`
          );
          if (allAttendance[0].length !== 0) {
            let abc = {
              branch: {
                id: allBranch[0][j]?.id,
                name: allBranch[0][j]?.name,
                attendance: allAttendance[0],
              },
            };
            sortAttendanceWithBranch.push(abc);
          }
        }
        if (sortAttendanceWithBranch.length !== 0) {
          let final = {
            company_id: company[0][i].id,
            company_name: company[0][i].name,
            // department: allBranch[0],
            branch: sortAttendanceWithBranch,
          };
          sortedData.push(final);
        }
      }
    }

    const result = {
      data: sortedData,
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
      body: { message: err || `cannot get all manual attendances` },
    });
  }
};

const dateWiseAttendanceReport = async (req, res) => {
  const {
    startdate = "",
    enddate = "",
    setcompany = "",
    setbranch = "",
  } = req.query;
  try {
    const sortedData = [];
    const connection = await getDatabaseConnection();
    let que = ``;
    if (startdate !== "" && enddate !== "") {
      que = ` && hrm_manual_attendance.date BETWEEN '${startdate}' AND '${enddate}'`;
    }
    const mainQRY = `SELECT hrm_manual_attendance.id,
                            DATE_FORMAT(hrm_manual_attendance.date, '%m/%d/%Y') as date,
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
                                hrm_manual_attendance.created_by,
                                hrm_employee.full_name as employee_name,
                                hrm_designation.name as desig_name,
                                hrm_employee.card_no as c_no,
                                hrm_shift.name as shift_name,
                                hrm_manual_attendance.day_type,
                                hrm_weekday.name               as day_name,
                                create_manual_attendance.email as c_mail,
                                hrm_manual_attendance.updated_by,
                                update_manual_attendance.email as u_mail
                         FROM hrm_manual_attendance
                                  LEFT JOIN hrm_employee ON hrm_manual_attendance.employee_id = hrm_employee.id
                                  LEFT JOIN hrm_designation ON hrm_employee.designation_id = hrm_designation.id
                                  LEFT JOIN hrm_shift ON hrm_manual_attendance.shift_id = hrm_shift.id
                                  LEFT JOIN hrm_weekday ON hrm_manual_attendance.day_type = hrm_weekday.id
                                  LEFT JOIN users as create_manual_attendance
                                            ON hrm_manual_attendance.created_by = create_manual_attendance.id
                                  LEFT JOIN users as update_manual_attendance
                                            ON hrm_manual_attendance.updated_by = update_manual_attendance.id`;

    const company = await connection.query(`SELECT * FROM hrm_company`);
    // if there have no search by company and branch
    if (setcompany !== "" && setbranch === "") {
      const singleCompany = await connection.query(
        `SELECT name FROM hrm_company where id = ${setcompany}`
      );
      let allBranch = await connection.query(
        `SELECT * FROM hrm_branch WHERE company_id = ${setcompany}`
      );

      if (allBranch[0].length !== 0) {
        let sortAttendanceWithBranch = [];
        for (let j = 0; j <= allBranch[0]?.length - 1; j++) {
          let branchID = allBranch[0][j]?.id;

          let allAttendance = await connection.query(
            `${mainQRY} WHERE hrm_manual_attendance.branch_id = ${branchID} ${que}`
          );
          if (allAttendance[0].length !== 0) {
            let abc = {
              branch: {
                id: allBranch[0][j]?.id,
                name: allBranch[0][j]?.name,
                attendance: allAttendance[0],
              },
            };
            sortAttendanceWithBranch.push(abc);
          }
        }

        if (sortAttendanceWithBranch.length !== 0) {
          let final = {
            company_id: setcompany,
            company_name: singleCompany[0][0].name,
            branch: sortAttendanceWithBranch,
          };
          sortedData.push(final);
        }
      }
    } else if (setbranch !== "") {
      let singlebranch = await connection.query(
        `SELECT * FROM hrm_branch WHERE id = ${setbranch}`
      );
      let singlecompany = await connection.query(
        `SELECT * FROM hrm_company WHERE id = ${singlebranch[0][0].company_id}`
      );
      let allAttendance = await connection.query(
        `${mainQRY} WHERE hrm_manual_attendance.branch_id = ${setbranch} ${que}`
      );
      if (allAttendance[0].length !== 0) {
        let sortForSingleBranch = [];
        let abc = {
          branch: {
            id: singlebranch[0][0].id,
            name: singlebranch[0][0].name,
            attendance: allAttendance[0],
          },
        };
        sortForSingleBranch.push(abc);
        let final = {
          company_id: singlecompany[0][0].id,
          company_name: singlecompany[0][0].name,
          branch: sortForSingleBranch,
        };
        sortedData.push(final);
      }
    } else {
      for (let i = 0; i <= company[0].length - 1; i++) {
        let companyId = company[0][i]?.id;
        let allBranch = await connection.query(
          `SELECT * FROM hrm_branch WHERE company_id = ${companyId}`
        );
        if (allBranch[0].length !== 0) {
          let sortAttendanceWithBranch = [];
          for (let j = 0; j <= allBranch[0]?.length - 1; j++) {
            let branchID = allBranch[0][j]?.id;
            let allAttendance = await connection.query(
              `${mainQRY} WHERE hrm_manual_attendance.branch_id = ${branchID}`
            );
            if (allAttendance[0].length !== 0) {
              let abc = {
                branch: {
                  id: allBranch[0][j]?.id,
                  name: allBranch[0][j]?.name,
                  attendance: allAttendance[0],
                },
              };
              sortAttendanceWithBranch.push(abc);
            }
          }
          if (sortAttendanceWithBranch.length !== 0) {
            let final = {
              company_id: company[0][i].id,
              company_name: company[0][i].name,
              // department: allBranch[0],
              branch: sortAttendanceWithBranch,
            };
            sortedData.push(final);
          }
        }
      }
    }
    const result = {
      data: sortedData,
    };

    // console.log(result);

    return res.status(200).json({
      status: "ok",
      body: {
        message: `get all manual attendances`,
        data: result,
      },
    });
  } catch (err) {
    console.error(`get all date wise attendance error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot get all manual attendances` },
    });
  }
};

const employeeWiseAttendanceReport = async (req, res) => {
  const { startdate = "", enddate = "", employee = "" } = req.query;
  // console.log(startdate, enddate, employee)
  try {
    let que = "";
    if (employee) {
      que = `WHERE hrm_employee.id = ${employee}`;
    }

    let dateQue = ``;
    if (startdate && enddate) {
      dateQue = `&& date BETWEEN '${startdate}' AND '${enddate}'`;
    }

    const allInfo = [];
    const connection = await getDatabaseConnection();
    const [allEmployee] = await connection.query(
      `SELECT 
    hrm_employee.id, 
    hrm_employee.full_name, 
    hrm_employee.card_no, 
    hrm_employee.department_id, 
    hrm_department.name as dept_name
    FROM hrm_employee 
        LEFT JOIN hrm_department ON hrm_employee.department_id = hrm_department.id ${que}`
    );

    if (allEmployee?.length !== 0) {
      let emp_att = [];
      for (let i = 0; i < allEmployee?.length; i++) {
        const emp_id = allEmployee[i]?.id;
        const [attendance] = await connection.query(
          `SELECT * FROM hrm_manual_attendance where employee_id = ${emp_id} ${dateQue}`
        );

        if (attendance?.length > 0) {
          const processData = {
            emp_name: allEmployee[i]?.full_name,
            card_no: allEmployee[i]?.card_no,
            dept_name: allEmployee[i]?.dept_name,
            data: attendance,
          };
          allInfo?.push(processData);
        }
      }
    }

    return res.status(200).json({
      status: "ok",
      body: {
        message: `get all manual attendances`,
        data: allInfo,
      },
    });
  } catch (err) {
    console.error(`get a employee wise attendance report error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot get employee wise attendance report` },
    });
  }
};

const summaryReport = async (req, res) => {
  try {
    const summary = [];
    const connection = await getDatabaseConnection();
    const department = await connection.query(`SELECT * FROM hrm_department`);
    const mainQRY = `
      SELECT
        hrm_employee.id as id,
        hrm_employee.full_name as name,
        hrm_designation.name as designation
      FROM
        hrm_employee
      LEFT JOIN
        hrm_designation
      ON
        hrm_employee.designation_id = hrm_designation.id
    `;
    for (let I = 0; I < department[0].length; I++) {
      const [employees] = await connection.query(
        `${mainQRY} WHERE department_id = ${department[0][I]?.id}`
      );
      //   console.log(employees);
      if (employees.length !== 0) {
        const allEmployee = [];
        for (let I = 0; I < employees.length; I++) {
          //   console.log(employees[I].id);
          const [attendance] = await connection.query(
            `SELECT * FROM hrm_manual_attendance WHERE employee_id = ${employees[I].id}`
          );
          //   console.log(attendance);
          if (attendance.length !== 0) {
            let totalPresent = 0;
            let totalAbsent = 0;
            let totalLate = 0;
            let totalEarlyOut = 0;
            let totalOverTime = 0;

            for (let I = 0; I < attendance.length; I++) {
              if (attendance[I].in_time) {
                totalPresent++;

                if (attendance[I].late) {
                  totalLate++;
                }
                if (attendance[I].early_out) {
                  totalEarlyOut++;
                }
                if (attendance[I].over_time) {
                  const overTime = moment(attendance[I].over_time, "HH:mm:ss");
                  const seconds =
                    overTime.hours() * 3600 +
                    overTime.minutes() * 60 +
                    overTime.seconds();
                  totalOverTime += seconds;
                }
              } else {
                totalAbsent++;
              }
            }

            // console.log(totalPresent, totalAbsent, totalLate, totalEarlyOut);
            const duration = moment.duration(totalOverTime, "seconds");
            const formattedTime = moment
              .utc(duration.asMilliseconds())
              .format("HH:mm:ss");
            // console.log(formattedTime);
            // console.log(employees[I]);
            let sin_att = {
              emp_id: employees[I].id,
              emp_name: employees[I].name,
              emp_designation: employees[I].designation,
              totalPresent,
              totalAbsent,
              totalLate,
              totalEarlyOut,
              totalOverTime: formattedTime,
            };
            allEmployee.push(sin_att);
          }
        }
        const singleDepartment = {
          department_id: department[0][I].id,
          department_name: department[0][I].name,
          employees: allEmployee,
        };

        summary.push(singleDepartment);
      }
    }
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: {
        message: `get summary`,
        data: summary,
      },
    });
  } catch (err) {
    console.error(`get summary error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot get summary` },
    });
  }
};

const employeeMovementReport = async (req, res) => {
    const { startdate = "", enddate = "", employee = "" } = req.query;
    console.log(startdate, enddate, employee)
    try {
      let que = "";
      if (employee) {
        que = `WHERE hrm_employee.id = ${employee}`;
      }

      let dateQue = ``;
      if (startdate && enddate) {
        dateQue = `&& PunchTime BETWEEN '${startdate}' AND '${enddate}'`;
      }

      const allInfo = [];
      const connection = await getDatabaseConnection();
      const [allEmployee] = await connection.query(
          `SELECT 
    hrm_employee.id, 
    hrm_employee.full_name, 
    hrm_employee.card_no, 
    hrm_employee.department_id, 
    hrm_department.name as dept_name
    FROM hrm_employee 
        LEFT JOIN hrm_department ON hrm_employee.department_id = hrm_department.id ${que}`
      );

      if (allEmployee?.length !== 0) {
        let emp_att = [];
        for (let i = 0; i < allEmployee?.length; i++) {
          const emp_id = allEmployee[i]?.job_code;
          const [movement] = await connection.query(
              `SELECT hrm_attnmachinedata.EmpID, hrm_attnmachinedata.AttnType, hrm_attnmachinedata.PunchTime, hrm_attnmachinedata.MachineIP, m_info.MachineNo as M_No
FROM hrm_attnmachinedata LEFT JOIN hrm_machineinfo as m_info ON m_info.MachineIP = hrm_attnmachinedata.MachineIP where EmpID = ${emp_id} ${dateQue}`
          );
          // console.log(movement);

          if (movement?.length > 0) {
            const processData = {
              emp_name: allEmployee[i]?.full_name,
              card_no: allEmployee[i]?.card_no,
              dept_name: allEmployee[i]?.dept_name,
              data: movement,
            };
            allInfo?.push(processData);
          }
        }
      }

      return res.status(200).json({
        status: "ok",
        body: {
          message: `get all employee movement report`,
          data: allInfo,
        },
      });
    } catch (err) {
      console.error(`get a employee movement report error: ${err}`);

      return res.status(500).json({
        status: "error",
        body: { message: err || `cannot get employee movement report`},
      });
    }
  };




const checkActiveReport = async (req, res) => {
  try {

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
        `call proc_hrm_report ('10/15/2023')`
    );

    const result = {
      data: row[0],
    };

    return res.status(200).json({
      status: "ok",
      body: {
        message: `get all checkActiveReport info`,
        data: result,
      },
    });
  } catch (err) {
    console.error(`get all checkActiveReport info error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot get all checkActiveReport info` },
    });
  }
};

module.exports = {checkActiveReport, manualAttendanceReport, dateWiseAttendanceReport, employeeWiseAttendanceReport, summaryReport, employeeMovementReport};
