// require
const getDatabaseConnection = require("../../../configs/db.config");
const path = require("path");
const fs = require("fs");

const cvPath = path.join(__dirname, "../../../../");

// get employee image
const getEmployeeCvController = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `SELECT cv FROM hrm_employee WHERE id = ?`,
      [id]
    );
    connection.release();

    res.setHeader("Content-Type", "application/pdf");

    if (row[0]?.cv) {
      const cvFilePath = path.join(cvPath, row[0]?.cv);
      if (fs.existsSync(cvFilePath)) {
        res.sendFile(cvFilePath);
      } else {
        console.error("cv does not exists");
        return res.status(404).json({
          status: "not exists",
          body: { message: "cv does not exists" },
        });
      }
    } else {
      console.error("cv not found");
      return res.status(404).json({
        status: "not found",
        body: { message: "cv not found" },
      });
    }
  } catch (err) {
    console.error(`get employee cv error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot get employee cv` },
    });
  }
};

module.exports = getEmployeeCvController;
