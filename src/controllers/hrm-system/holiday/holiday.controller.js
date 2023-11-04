// require
const getDatabaseConnection = require("../../../configs/db.config");

const postHolidayController = async (req, res) => {
  try {
    const { title, date, status = "Active", holiday_group } = req.body;
    const holiday = { title, date,  status, holiday_group };
    holiday.created_by = req.decoded.id;

    const connection = await getDatabaseConnection();


    const [row] = await connection.query(
      `INSERT INTO hrm_holiday SET ?`,
      holiday
    );

    // console.log(req.body)
    connection.release();

    // console.log(`post holiday: ${row}`);

    res.status(200).json({
      status: "post holiday",
      body: { message: "one holiday added", data: row },
    });
  } catch (err) {
    console.error(`post holiday error: ${err}`);

    res.status(500).json({
      status: "post holiday error",
      body: { message: err || "cannot post holiday" },
    });
  }
};

const getAllHolidayController = async (req, res) => {
  try {
    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `SELECT id, title,holiday_group, holiday_year, max(fromDate) as fromDate,max(todate) as todate,status
       FROM
         (
           SELECT id, title,holiday_group, DATE_FORMAT(date,'%Y') as holiday_year, min(date) as fromDate,null as todate,status
           FROM hrm_holiday
           group by holiday_group,title
           UNION
           SELECT id, title,holiday_group, DATE_FORMAT(date,'%Y') as holiday_year, null as fromDate,max(date) as todate,status
           FROM hrm_holiday
           group by holiday_group,title
         ) as abc
       group by id, title,holiday_group, holiday_year,status
       ORDER BY holiday_year desc,max(fromDate) ASC`
    );

    const [holiday_group_value] = await connection.query(
        `SELECT ifnull(max(holiday_group),0)+1 as count_holiday_group FROM hrm_holiday;`
    );

    // row.holiday_group = holiday_group_value[0]?.count_holiday_group;
    // console.log(row);

    connection.release();

    // console.log(holiday_group);

    res.status(200).json({
      status: "get all holidays",
      body: {
        message: "get all holiday",
        data: row,
        holiday_group: holiday_group_value[0]?.count_holiday_group,
      },
    });
  } catch (err) {
    console.error(`get all holiday error: ${err}`);

    res.status(500).json({
      status: "get all holiday error",
      body: { message: err || "cannot get all holiday" },
    });
  }
};

const getHolidayController = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `SELECT id, title, date, status, created_by, updated_by FROM hrm_holiday WHERE id = ?`,
      [id]
    );
    connection.release();

    // console.log(`get holiday: ${row}`);

    res.status(200).json({
      status: "get holiday",
      body: {
        message: "get holiday",
        data: row,
      },
    });
  } catch (err) {
    console.error(`get holiday error: ${err}`);

    res.status(500).json({
      status: "get holiday error",
      body: { message: err || "cannot get holiday" },
    });
  }
};

const putHolidayController = async (req, res) => {

  try {
    const { id } = req.params;
    const { title, date, status } = req.body;
    // console.log(id)
    const holiday = { title, date, status };
    holiday.updated_by = req.decoded.id;
    holiday.created_by = req.decoded.id;
    holiday.holiday_group = id;

    const connection = await getDatabaseConnection();


    const [deleteRow] = await connection.query(
      `DELETE FROM hrm_holiday WHERE holiday_group = ?`,
      id
    );
    // console.log(deleteRow);

    const [row] = await connection.query(
        `INSERT INTO hrm_holiday SET ?`,
        holiday
    );
    connection.release();

    // console.log(`put holiday: ${row}`);

    res.status(200).json({
      status: "put holiday",
      body: { message: "put holiday", data: row },
    });
  } catch (err) {
    console.error(`put holiday error: ${err}`);

    res.status(500).json({
      status: "put holiday error",
      body: { message: err || "cannot put holiday" },
    });
  }
};

const deleteHolidayController = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `DELETE FROM hrm_holiday WHERE id = ?`,
      [id]
    );
    connection.release();

    // console.log(`delete holiday: ${row}`);

    res.status(200).json({
      status: "delete holiday",
      body: { message: `delete holiday`, data: row },
    });
  } catch (err) {
    console.error(`delete holiday error: ${err}`);

    res.status(500).json({
      status: "delete holiday error",
      body: { message: err || `delete holiday error` },
    });
  }
};

// export
module.exports = {
  postHolidayController,
  getAllHolidayController,
  getHolidayController,
  putHolidayController,
  deleteHolidayController,
};
