const csv = require("csv-parser");
const fs = require("fs");
const getDatabaseConnection = require("../../../configs/db.config");

const csvManualAttendanceController = async (req, res) => {
  try {
    fs.createReadStream(req?.file?.path)
      .pipe(csv())
      .on("data", async (data) => {
        try {
          delete data.id;
          delete data.updated_by;
          delete data.created_at;
          delete data.updated_at;

          data.created_by = req.decoded.id;

          const connection = await getDatabaseConnection();
          const [result] = await connection.query(
            `INSERT INTO hrm_manual_attendance SET ?`,
            data
          );
          connection.release();
        } catch (err) {
          console.error(`csv file import error: ${err}`);

          return res.status(500).json({
            status: "csv import error",
            body: { message: err || "csv file import error" },
          });
        }
      })
      .on("end", async () => {
        fs.unlink(req?.file?.path, (err) => {
          if (err) {
          } else {
          }
        });


        return res.status(200).json({
          status: "ok",
          body: { message: "csv file imported" },
        });
      });
  } catch (err) {

    return res.status(500).json({
      status: "csv error",
      body: { message: err || "csv file error" },
    });
  }
};

module.exports = csvManualAttendanceController;
