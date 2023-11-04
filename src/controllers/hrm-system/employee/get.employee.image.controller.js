// require
const getDatabaseConnection = require("../../../configs/db.config");
const path = require("path");
const fs = require("fs");

const imagePath = path.join(__dirname, "../../../../");

// get employee image
const getEmployeeImageController = async (req, res) => {
  try {
    const { id } = req?.params;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `SELECT img FROM hrm_employee WHERE id = ?`,
      [id]
    );
    connection.release();

    // console.log(__dirname);

    res.setHeader("Content-Type", "image/jpeg");

    if (row[0]?.img) {
      const imageFilePath = path.join(imagePath, row[0]?.img);
      //   console.log(fs.existsSync(imageFilePath));
      if (fs.existsSync(imageFilePath)) {
        res.sendFile(imageFilePath);
      } else {
        console.error("image does not exists");
        return res.status(404).json({
          status: "not exists",
          body: { message: "image does not exists" },
        });
      }
    } else {
      console.error("image not found");
      return res.status(404).json({
        status: "not found",
        body: { message: "image not found" },
      });
    }
  } catch (err) {
    console.error(`get employee image error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot get employee image` },
    });
  }
};

module.exports = getEmployeeImageController;
