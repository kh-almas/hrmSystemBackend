const getDatabaseConnection = require("../../../configs/db.config");

const getSalaryGradeController = async (req, res) => {
    try {
        const columns = [
            "id",
            "salary_grade_name",
            "organization_id",
            "company_id",
            "status"
        ]

        const connection = await getDatabaseConnection();
        const [row] = await connection.query(
            `SELECT ${columns.join(",")} FROM salary_grade`
        );

        connection.release();

        return res.status(200).json({
            status: "ok",
            body: {
                message: `get all salary grade`,
                data: row,
            },
        });
    } catch (err) {
        console.error(`get all salary grade error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: { message: err || `cannot get all salary grade` },
        });
    }
}

const postSalaryGradeController = async (req, res) => {
    try {
        const data = ({
            salary_grade_name,
            organization_id,
            company_id,
            status
        } = req.body)

        data.created_by = req.decoded.id;
        data.updated_by = req.decoded.id;

        const connection = await getDatabaseConnection();
        const [row] = await connection.query(
            `INSERT INTO salary_grade SET ?`,
            data
        );
        connection.release();

        return res.status(200).json({
            status: "ok",
            body: { message: `one salary grade added`, data: row },
        });

    } catch (err) {
        console.error(`add salary grade error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: {message: err || `cannot add salary grade`},
        });
    }
}

module.exports = { getSalaryGradeController, postSalaryGradeController }