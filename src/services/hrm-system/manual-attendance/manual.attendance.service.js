const getDatabaseConnection = require("../../../configs/db.config");
const moment = require("moment");

const timeFormatter = (secondsDifference) => {
  const hours = Math.floor(secondsDifference / 3600);
  const minutes = Math.floor((secondsDifference % 3600) / 60);
  const seconds = secondsDifference % 60;

  const formattedDifference = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return formattedDifference;
};

const timeFormatter1 = (time) => {
  const timeArray = time.split(":");
  return `${time[0]}h ${time[1]}m`;
};

const manualAttendanceService = async (shift_id, in_time, out_time) => {
  try {
    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `SELECT start_time, end_time, late_time, early_time FROM hrm_shift WHERE id = ?`,
      [shift_id]
    );
    connection.release();

    const { start_time, end_time, late_time, early_time } = row[0];

    const startTime = moment(
      `${in_time.split(" ")[0]} ${start_time}`,
      "YYYY-MM-DDTHH:mm:ss"
    );
    const endTime = moment(
      `${out_time.split(" ")[0]} ${end_time}`,
      "YYYY-MM-DDTHH:mm:ss"
    );
    const inTime = moment(in_time, "YYYY-MM-DDTHH:mm:ss");
    const outTime = moment(out_time, "YYYY-MM-DDTHH:mm:ss");

    let late = null;
    let early_out = null;
    let over_time = null;

    if (
      startTime.diff(inTime, "seconds") +
        moment.duration(late_time).asSeconds() <
      0
    )
      late = timeFormatter(inTime.diff(startTime, "seconds"));
    if (
      outTime.diff(endTime, "seconds") +
        moment.duration(early_time).asSeconds() <
      0
    )
      early_out = timeFormatter(endTime.diff(outTime, "seconds"));
    if (outTime.diff(inTime, "seconds") > endTime.diff(startTime, "seconds"))
      over_time = timeFormatter(
        outTime.diff(inTime, "seconds") - endTime.diff(startTime, "seconds")
      );

    return { late, early_out, over_time };
  } catch (err) {
  }
};

module.exports = { manualAttendanceService, timeFormatter1 };
