// require
const getDatabaseConnection = require("../../../configs/db.config");

// get one shift schedule by id
const getShiftScheduleController = async (req, res) => {
    try {
        const {id} = req.params;

        const connection = await getDatabaseConnection();
        const [row] = await connection.query(
            `SELECT id,
                    date_from,
                    date_to,
                    shift_from,
                    shift_to,
                    active_on,
                    status
             FROM hrm_shift_schedule
             WHERE id = ?`,
            [id]
        );
        connection.release();

        return res.status(200).json({
            status: "ok",
            body: {message: `get a shift schedule`, data: row},
        });
    } catch (err) {
        console.error(`get shift schedule error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: {message: err || `cannot get a shift schedule`},
        });
    }
};

// get all shift schedule
const getAllShiftScheduleController = async (req, res) => {
    let { page, item = 0 } = req.query;
    const skip = page ? (parseInt(page) - 1) * item : 0;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
        `SELECT 
    hrm_shift_schedule.id, 
    hrm_shift_schedule.date_from, 
    hrm_shift_schedule.date_to, 
    hrm_shift_schedule.shift_from, 
    hrm_shift_schedule.shift_to, 
    hrm_shift_schedule.active_on, 
    hrm_shift_schedule.status, 
    shift_start.name as s_shift, 
    shift_to.name as e_shift 
FROM hrm_shift_schedule 
    LEFT JOIN hrm_shift as shift_start ON hrm_shift_schedule.shift_from = shift_start.id
    LEFT JOIN hrm_shift as shift_to ON hrm_shift_schedule.shift_to = shift_to.id
    ${item !== 0 ? `LIMIT ${item} OFFSET ${skip}` : ''}`
    );

    const count = await connection.query(
        `SELECT count(id) as totalItem FROM hrm_shift_schedule`
    );
    const result = {
        count: count[0][0]?.totalItem,
        data: row,
    };

    connection.release();
    return res.status(200).json({
        status: "ok",
        body: {message: `get a shift schedule`, data: result},
    });
};

module.exports = {getShiftScheduleController, getAllShiftScheduleController};
