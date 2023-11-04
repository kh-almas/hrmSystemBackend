// require
const { get } = require("../../../base/controllers/get.controller");

// get contact
const getContact = async (req, res) => {
  const { id } = req.params;
  const columns = [
    "contact_type",
    "name",
    "image",
    "business_name",
    "tax_number",
    "opening_balance",
    "pay_term",
    "pay_term_condition",
    "email",
    "mobile",
    "alternate_contact_no",
    "country",
    "state",
    "city",
    "address",
    "note",
    "status",
  ];

  const tableName = "inventory_contacts";
  const dataName = "contact";

  get(columns, tableName, id, dataName, res);
};

// get all contacts
const getAllContact = async (req, res) => {
  try {
    const { contact_type } = req.params;
    const columns = [
      "id",
      "name",
      "email",
      "mobile",
      "pay_term",
      "tax_number",
      "status",
    ];

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `SELECT ${columns.join(
        ","
      )} FROM inventory_contacts WHERE contact_type = ?`,
      [contact_type]
    );
    connection.release();

    if (!row.length) throw `no ${contact_type}s found`;

    return res.status(200).json({
      status: "ok",
      body: {
        message: `get all ${contact_type}s`,
        contacts: row,
      },
    });
  } catch (err) {
    console.error(`get all contacts error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot get all contacts" },
    });
  }
};

// export
module.exports = { getAllContact, getContact };
