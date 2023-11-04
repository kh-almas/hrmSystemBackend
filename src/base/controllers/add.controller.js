// require
const getDatabaseConnection = require("../../configs/db.config");

// add
const add = async (tableName, tableData, res, dataName) => {
  try {
    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `INSERT INTO ${tableName} SET ?`,
      tableData
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: { message: `one ${dataName} added`, data: row },
    });
  } catch (err) {
    console.error(`add ${dataName} error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot add ${dataName}` },
    });
  }
};

// export
module.exports = add;
