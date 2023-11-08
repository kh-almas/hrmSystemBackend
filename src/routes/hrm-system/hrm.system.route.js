// require
const express = require("express");
const userVerify = require("../../middlewares/auth/user.verify");
const organizationRouter = require("./organization/organization.route");
const companyRouter = require("./company/company.route");
const branchRouter = require("./branch/branch.route");
const departmentRouter = require("./department/department.route");
const sectionRouter = require("./section/section.route");
const designationRouter = require("./designation/designation.route");
const projectRouter = require("./project/project.route");
const employeeRouter = require("./employee/employee.route");
const holidayRouter = require("./holiday/holiday.route");
const weekdayRouter = require("./weekday/weekday.route");
const shiftRouter = require("./shift/shift.route");
const shiftScheduleRouter = require("./shift-schedule/shift.schedule.route");
const employeeShiftRouter = require("./employee-shift/employee.shift.route");
const manualAttendanceRouter = require("./manual-attendance/manual.attendance.route");
const attendanceRouter = require("./attendance/attendance.route");
const leaveTypeRouter = require("./leave-type/leave.type.route");
const leaveSetupRouter = require("./leave-setup/leave.setup.route");
const leaveApplicationRouter = require("./leave-application/leave.application.route");
const leaveApprovalRouter = require("./leave-approval/leave.approval.route");
const employeeGradeRouter = require("./employee-grade/employee.grade.router");
const salaryGradeRouter = require("./salary-grade/salary.grade.router");
const employeeContactRoute = require("./employee-contact/employee.contact.route");
const machineInfoRouter = require("./machine-info/machine.info.route");
const reportRouter = require("./reports/report.route");
const checkInfoRouter = require("./checkRoute/check.info.route");

// router
const hrmSystemRouter = express.Router();

// use
hrmSystemRouter.use(userVerify);
hrmSystemRouter.use("/organization", organizationRouter);
hrmSystemRouter.use("/company", companyRouter);
hrmSystemRouter.use("/branch", branchRouter);
hrmSystemRouter.use("/department", departmentRouter);
hrmSystemRouter.use("/section", sectionRouter);
hrmSystemRouter.use("/designation", designationRouter);
hrmSystemRouter.use("/employee-grade", employeeGradeRouter);
hrmSystemRouter.use("/salary-grade", salaryGradeRouter);
hrmSystemRouter.use("/project", projectRouter);
hrmSystemRouter.use("/employee", employeeRouter);
hrmSystemRouter.use("/employee-contact", employeeContactRoute);
hrmSystemRouter.use("/holiday", holidayRouter);
hrmSystemRouter.use("/weekday", weekdayRouter);
hrmSystemRouter.use("/shift", shiftRouter);
hrmSystemRouter.use("/shift-schedule", shiftScheduleRouter);
hrmSystemRouter.use("/employee-shift", employeeShiftRouter);
hrmSystemRouter.use("/manual-attendance", manualAttendanceRouter);
hrmSystemRouter.use("/attendance", attendanceRouter);
hrmSystemRouter.use("/leave-type", leaveTypeRouter);
hrmSystemRouter.use("/leave-setup", leaveSetupRouter);
hrmSystemRouter.use("/leave-application", leaveApplicationRouter);
hrmSystemRouter.use("/leave-approval", leaveApprovalRouter);
hrmSystemRouter.use("/reports", reportRouter);
hrmSystemRouter.use("/machine", machineInfoRouter);
hrmSystemRouter.use("/check/table", checkInfoRouter);

// export
module.exports = hrmSystemRouter;
