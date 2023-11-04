// require
const getDatabaseConnection = require("../../configs/db.config");

// update
const update = async (tableName, tableData, id, res, dataName) => {
  try {
    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `UPDATE ${tableName} SET ? WHERE id = ?`,
      [tableData, id]
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: { message: `one ${dataName} updated`, data: row },
    });
  } catch (err) {
    console.error(`add ${dataName} error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot ${dataName} contact` },
    });
  }
};

// export
module.exports = update;
