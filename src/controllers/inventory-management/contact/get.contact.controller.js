// require
const { get } = require("../../../base/controllers/get.controller");
const getDatabaseConnection = require("../../../configs/db.config");


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

  try {
    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
        `SELECT ${columns.join(",")} FROM inventory_contacts WHERE id = ?`,
        [id]
    );
    connection.release();

    if (!row.length) throw `no contact found of id: ${id}`;

    return res.status(200).json({
      status: "ok",
      body: {
        message: `get contact`,
        data: row[0],
      },
    });
  } catch (err) {
    console.error(`get contact error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot get contact` },
    });
  }
};

// get all contacts
const getAllContact = async (req, res) => {
  const { contact_type } = req.params;
  let { page, item = 0, search = "" } = req.query;
  const skip = page ? (parseInt(page) - 1) * item : 0;
  try {

    const que = `SELECT * FROM inventory_contacts WHERE contact_type = '${contact_type}'
      ${search ? `&& name LIKE '%${search}%'` : ''}
      ${page > 1 ? `LIMIT ${item} OFFSET ${skip}` : ''}`;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `${que}`
    );

    const count = await connection.query(
        `SELECT
        COUNT(inventory_contacts.id) as totalItem,
        inventory_contacts.name
      FROM
        inventory_contacts WHERE contact_type = '${contact_type}'
           ${search ? `&& name LIKE '%${search}%'` : ''}`
    );


    const result = {
      count: count[0][0]?.totalItem,
      data: row,
    };

    connection.release();


    return res.status(200).json({
      status: "ok",
      body: {
        message: `get all ${contact_type}s`,
        data: result,
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
