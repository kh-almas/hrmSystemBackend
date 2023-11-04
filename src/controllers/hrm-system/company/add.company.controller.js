// require
const getDatabaseConnection = require("../../../configs/db.config");

// add company
const addCompanyController = async (req, res) => {
  try {
    const data = ({
      name,
      email,
      phone,
      vat,
      address,
      country,
      zip,
      info,
      status,
      organization_id,
      shortname,
      slogan,
      description
    } = req.body);
    data.created_by = req.decoded.id;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(`INSERT INTO hrm_company SET ?`, data);
    connection.release();
    // console.log(row)

    // console.log(row);
    return res.status(200).json({
      status: "ok",
      body: {
        message: `post a company`,
        data: row,
      },
    });
  } catch (err) {
    console.error(`post a company error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot post a company` },
    });
  }
};

// export
module.exports = addCompanyController;
