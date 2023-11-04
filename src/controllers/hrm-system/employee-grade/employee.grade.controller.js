const getDatabaseConnection = require("../../../configs/db.config");

const getEmployeeGradeController = async (req, res) => {
    try {
        const columns = [
            "id",
            "grade_name",
            "organization_id",
            "company_id",
            "status"
        ]

        const connection = await getDatabaseConnection();
        const [row] = await connection.query(
            `SELECT ${columns.join(",")} FROM hrm_employee_grade`
        );

        connection.release();

        // console.log(row);
        return res.status(200).json({
            status: "ok",
            body: {
                message: `get all employee grade`,
                data: row,
            },
        });
    } catch (err) {

        console.error(`get all employee grade error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: {message: err || `cannot get all employee grade`},
        });
    }
}

const postEmployeeGradeController = async (req, res) => {
    try {
        const data = ({
            grade_name,
            organization_id,
            company_id,
            status
        } = req.body)

        data.created_by = req.decoded.id;
        data.updated_by = req.decoded.id;

        const connection = await getDatabaseConnection();
        const [row] = await connection.query(
            `INSERT INTO hrm_employee_grade SET ?`,
            data
        );
        connection.release();

        // console.log(row);
        return res.status(200).json({
            status: "ok",
            body: { message: `one employee grade added`, data: row },
        });
    } catch (err) {
        console.error(`add employee grade error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: {message: err || `cannot add employee grade`},
        });
    }
}

module.exports = { postEmployeeGradeController, getEmployeeGradeController }