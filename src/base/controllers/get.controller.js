// require
const getDatabaseConnection = require("../../configs/db.config");

// get
const get = async (columns, tableName, id, dataName, res) => {
  try {
    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `SELECT ${columns.join(",")} FROM ${tableName} WHERE id = ?`,
      [id]
    );
    connection.release();

    if (!row.length) throw `no ${dataName} found of id: ${id}`;

    return res.status(200).json({
      status: "ok",
      body: {
        message: `get ${dataName}`,
        data: row[0],
      },
    });
  } catch (err) {
    console.error(`get ${dataName} error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot get ${dataName}` },
    });
  }
};

// get all
const getAll = async (columns, tableName, dataName, res) => {
  try {
    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `SELECT ${columns.join(",")} FROM ${tableName}`
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: {
        message: `get all ${dataName}`,
        data: row,
      },
    });
  } catch (err) {
    console.error(`get all ${dataName} error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot get all ${dataName}` },
    });
  }
};

const attendaceSearch = async (columns, tableName, dataName, res) => {
  // try {
  //   const connection = await getDatabaseConnection();
  //   const [row] = await connection.query(
  //       `SELECT ${columns.join(",")} FROM ${tableName}`
  //   );
  //   connection.release();
  //
  //   return res.status(200).json({
  //     status: "ok",
  //     body: {
  //       message: `get all ${dataName}`,
  //       data: row,
  //     },
  //   });
  // } catch (err) {
  //   console.error(`get all ${dataName} error: ${err}`);
  //
  //   return res.status(500).json({
  //     status: "error",
  //     body: { message: err || `cannot get all ${dataName}` },
  //   });
  // }
};
// export
module.exports = { get, getAll };
