// require
const getDatabaseConnection = require("../../../configs/db.config");

// get one company by id
const getCompanyController = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `SELECT
        id,
        name,
        email,
        phone,
        vat,
        address,
        country,
        zip,
        info,
        status,
        organization_id
      FROM 
        hrm_company
      WHERE id = ?`,
      [id]
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: { message: `get a company`, data: row },
    });
  } catch (err) {
    console.error(`get company error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot get a company` },
    });
  }
};

// get all company
const getAllCompanyController = async (req, res) => {
  let { page, item = 0, search} = req.query;
  const skip = page ? (parseInt(page) - 1) * item : 0;
  search = search ? search : "";
  try {
    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `SELECT 
        hrm_company.id,
        hrm_company.name,
        hrm_company.shortname,
        hrm_company.slogan,
        hrm_company.description,
        hrm_company.email,
        hrm_company.phone,
        hrm_company.vat,
        hrm_company.address,
        hrm_company.country,
        hrm_company.zip,
        hrm_company.info,
        hrm_company.status,
        hrm_company.organization_id,
        hrm_organization.name as organization_name,
        hrm_company.created_by,
        create_company.email as c_mail,
        hrm_company.updated_by,
        update_company.email as u_mail,
        hrm_organization.name as org_name
      FROM 
        hrm_company 
      LEFT JOIN
        hrm_organization 
      ON
        hrm_company.organization_id = hrm_organization.id
      LEFT JOIN
        users as create_company
      ON
        hrm_company.created_by = create_company.id
      LEFT JOIN
        users as update_company
      ON
        hrm_company.updated_by = update_company.id
        WHERE hrm_company.status = 'Active'
        ${search ? `&& hrm_company.name LIKE '%${search}%'` : ''}
        ${item !== 0 ? `LIMIT ${item} OFFSET ${skip}` : ''}
        `
    );

    const count = await connection.query(
        `SELECT COUNT(hrm_company.id) as totalItem FROM hrm_company ${search ? `WHERE hrm_company.name LIKE '%${search}%'` : ''}`
    );

    const result = {
      count: count[0][0]?.totalItem,
      data: row,
    };

    connection.release();

    return res.status(200).json({
      status: "ok",
      body: { message: `get all companies`, data: result },
    });
  } catch (err) {
    console.error(`get all companies error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot get all companies` },
    });
  }
};

module.exports = { getCompanyController, getAllCompanyController };
