// require
const getDatabaseConnection = require("../../../configs/db.config");

// add shift
const addMachineInfoController = async (req, res) => {
    try {
        const { OrgId, CompanyId, BranchId, MachineIP, MachineNo, MachinePort, commKey, Location, isInActive = 0 } = req.body;
        const data = { OrgId, CompanyId, BranchId, MachineIP, MachineNo, MachinePort, commKey, Location, isInActive };

        const connection = await getDatabaseConnection();
        const [row] = await connection.query(`INSERT INTO hrm_machineinfo SET ?`, data);
        connection.release();

        return res.status(200).json({
            status: "ok",
            body: {
                message: `add a machine info`,
                data: row,
            },
        });
    } catch (err) {
        console.error(`add a machine info error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: { message: err || `cannot add a machine info` },
        });
    }
};

const getMachineInfoController = async (req, res) => {
    try {
        let { page, item = 0, search } = req.query;
        // const totalItem = item ? item : 10;
        const skip = page ? (parseInt(page) - 1) * item : 0;
        search = search ? search : "";

        const connection = await getDatabaseConnection();
        const row = await connection.query(
            `SELECT hrm_machineinfo.id, hrm_machineinfo.OrgId, hrm_machineinfo.CompanyId, hrm_machineinfo.BranchId, hrm_machineinfo.MachineIP, hrm_machineinfo.MachineNo, hrm_machineinfo.MachinePort, hrm_machineinfo.commKey, hrm_machineinfo.Location, hrm_machineinfo.isInActive,
        org.name as org_name, com.name as com_name, branch.name as branch_name
      FROM
          hrm_machineinfo
      LEFT JOIN
        hrm_organization as org
      ON
          hrm_machineinfo.OrgId = org.id
      LEFT JOIN
        hrm_company as com
      ON
          hrm_machineinfo.companyId = com.id
      LEFT JOIN
        hrm_branch as branch
      ON
          hrm_machineinfo.BranchId = branch.id
          WHERE hrm_machineinfo.isInActive = 0
      ${search ? `&& hrm_machineinfo.MachineNo LIKE '%${search}%'` : ''}
      ${item !== 0 ? `LIMIT ${item} OFFSET ${skip}` : ''}`
        );


        const count = await connection.query(
            `SELECT
        COUNT(hrm_machineinfo.id) as totalItem,
        hrm_machineinfo.MachineNo
      FROM
          hrm_machineinfo
      ${search ? `WHERE hrm_machineinfo.MachineNo LIKE '%${search}%'` : ''}`
        );
        const result = {
            count: count[0][0]?.totalItem,
            data: row[0],
        };

        return res.status(200).json({
            status: "ok",
            body: {
                message: `get all machine info`,
                data: result,
            },
        });
    } catch (err) {
        console.error(`get all machine info error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: { message: err || `cannot get all machine info` },
        });
    }
};

const updateMachineInfoController = async (req, res) => {
    try {
        const { id } = req.params;
        const { OrgId, CompanyId, BranchId, MachineIP, MachineNo, MachinePort, commKey, Location, isInActive = 0 } = req.body;
        const data = { OrgId, CompanyId, BranchId, MachineIP, MachineNo, MachinePort, commKey, Location, isInActive };

        const connection = await getDatabaseConnection();
        const [row] = await connection.query(
            `UPDATE hrm_machineinfo SET ? WHERE id = ?`,
            [data, id]
        );
        connection.release();

        return res.status(200).json({
            status: "ok",
            body: {
                message: `Update a machine info`,
                data: row,
            },
        });
    } catch (err) {
        console.error(`update a machine info error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: { message: err || `cannot update a machine info` },
        });
    }
};

const deleteMachineInfoController = async (req, res) => {
    try {
        const { id } = req.params;

        const connection = await getDatabaseConnection();
        const [row] = await connection.query(`DELETE FROM hrm_machineinfo WHERE id = ?`, [
            id,
        ]);
        connection.release();

        return res.status(200).json({
            status: "ok",
            body: { message: `one machine info deleted`, data: row },
        });
    } catch (err) {
        console.error(`delete machine info error: ${err}`);

        return res.status(500).json({
            status: "error",
            body: { message: err || `cannot delete machine` },
        });
    }
};

// export
module.exports = { addMachineInfoController, getMachineInfoController, updateMachineInfoController, deleteMachineInfoController };
