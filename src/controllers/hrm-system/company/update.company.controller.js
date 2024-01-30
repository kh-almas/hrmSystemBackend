// require
const getDatabaseConnection = require("../../../configs/db.config");

// update company
const updateCompanyController = async (req, res) => {
  try {
    const { id } = req.params;

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
    data.updated_by = req.decoded.id;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `UPDATE hrm_company SET ? WHERE id = ?`,
      [data, id]
    );
    connection.release();
    return res.status(200).json({
      status: "ok",
      body: {
        message: `one company updated`,
        data: row,
      },
    });
  } catch (err) {
    console.error(`update company error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot update company` },
    });
  }
};

// export
module.exports = updateCompanyController;
