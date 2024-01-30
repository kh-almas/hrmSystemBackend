const getDatabaseConnection = require("../../../configs/db.config");

const getEmployeeContactController = async (req, res) => {
    try {
        const columns = [
            "contact_type",
            "address",
            "division",
            "district",
            "country",
            "post_code"
        ]

        const connection = await getDatabaseConnection();
        const [row] = await connection.query(
            `SELECT ${columns.join(",")} FROM hrm_employee_contact`
        );

        connection.release();

        return res.status(200).json({
            status: "ok",
            body: {
                message: `get all employee contact`,
                data: row,
            },
        });
    } catch (err) {
        console.error(`get all employee contact error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: {message: err || `cannot get all employee contact`},
        });
    }
}

const postEmployeeContactController = async (req, res) => {
    try {
        const data = ({
            employee_id,
            contact_type,
            address,
            division,
            district,
            country,
            post_code
        } = req.body)

        const connection = await getDatabaseConnection();
        const [row] = await connection.query(
            `INSERT INTO hrm_employee_contact SET ?`,
            data
        );
        connection.release();
        return res.status(200).json({
            status: "ok",
            body: { message: `one employee contact added`, data: row },
        });
    } catch (err) {
        console.error(`add employee contact error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: {message: err || `cannot add employee contact`},
        });
    }
}

module.exports = { postEmployeeContactController, getEmployeeContactController }