// require
const getDatabaseConnection = require("../../../configs/db.config");

// get one shift by id
const getShiftController = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `SELECT id,organization_id,DayDiff,company_id,gross_time,branch_id,name,start_time,end_time,weekends,note,statusFROM hrm_shiftWHERE id = ?`,
      [id]
    );
    connection.release();
    console.log(row);

    return res.status(200).json({
      status: "ok",
      body: { message: `get a shift`, data: row },
    });
  } catch (err) {
    console.error(`get shift error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot get a shift` },
    });
  }
};

// get all shift
const getAllShiftController = async (req, res) => {
  try {
    let { page, item = 0, search } = req.query;
    // const totalItem = item ? item : 10;
    const skip = page ? (parseInt(page) - 1) * item : 0;
    search = search ? search : "";

    const connection = await getDatabaseConnection();
    const row = await connection.query(
      `SELECT
        hrm_shift.id,
        hrm_shift.organization_id,hrm_shift.company_id,hrm_shift.branch_id,hrm_shift.DayDiff,
        hrm_shift.name,
        hrm_shift.start_time,
        hrm_shift.end_time,
        hrm_shift.weekends,
        hrm_shift.status,
        hrm_shift.created_by,
        hrm_shift.gross_time,
        create_shift.email as c_mail,
        hrm_shift.updated_by,
        hrm_shift.note,
        update_shift.email as u_mail
      FROM
        hrm_shift
      LEFT JOIN
        users as create_shift
      ON
        hrm_shift.created_by = create_shift.id
      LEFT JOIN
        users as update_shift
      ON
        hrm_shift.updated_by = update_shift.id
        WHERE hrm_shift.status = "Active"
      ${search ? `&& hrm_shift.name LIKE '%${search}%'` : ''}
      ${item !== 0 ? `LIMIT ${item} OFFSET ${skip}` : ''}`
    );


    const count = await connection.query(
      `SELECT
        COUNT(hrm_shift.id) as totalItem,
        hrm_shift.name
      FROM
        hrm_shift
      ${search ? `WHERE hrm_shift.name LIKE '%${search}%'` : ''}`
    );
    const result = {
      count: count[0][0]?.totalItem,
      data: row[0],
    };

    return res.status(200).json({
      status: "ok",
      body: {
        message: `get all hrm shift`,
        data: result,
      },
    });
  } catch (err) {
    console.error(`get all hrm shift error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot get all hrm shift` },
    });
  }
};

module.exports = { getShiftController, getAllShiftController };
