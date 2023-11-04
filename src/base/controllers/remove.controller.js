// require
const getDatabaseConnection = require("../../configs/db.config");

// delete
const remove = async (tableName, id, res, dataName) => {
  try {
    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `DELETE FROM ${tableName} WHERE id = ?`,
      [id]
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: { message: `one ${dataName} deleted`, data: row },
    });
  } catch (err) {
    console.error(`delete ${dataName} error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot delete ${dataName}` },
    });
  }
};

// export
module.exports = remove;
