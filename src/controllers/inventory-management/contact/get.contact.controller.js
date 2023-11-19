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
  try {
    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
        `SELECT 
    inventory_contacts.id,
    inventory_contacts.user_id,
    inventory_contacts.image as image_s_i,
    inventory_contacts.contact_type as contact_type_s,
    inventory_contacts.name as name_s,
    inventory_contacts.business_name as business_name_s,
    inventory_contacts.tax_number as tax_number_s,
    inventory_contacts.opening_balance as opening_balance_s,
    inventory_contacts.pay_term as pay_term_s,
    inventory_contacts.pay_term_condition as pay_term_condition_s_g,
    inventory_contacts.email as email_s,
    inventory_contacts.mobile as mobile_s,
    inventory_contacts.alternate_contact_no as alternate_contact_number_s,
    inventory_contacts.country as country_s,
    inventory_contacts.state as state_s,
    inventory_contacts.city as city_s,
    inventory_contacts.address as address_s,
    inventory_contacts.note,
    inventory_contacts.status,
    inventory_contacts.created_by,
    inventory_contacts.updated_by,
    inventory_contacts.pc_address,
    inventory_contacts.created_at,
    inventory_contacts.updated_at
    FROM inventory_contacts WHERE contact_type = '${contact_type}'`
    );

    const count = await connection.query(
        `SELECT
        COUNT(inventory_contacts.id) as totalItem,
        inventory_contacts.name
      FROM
        inventory_contacts WHERE contact_type = '${contact_type}'`
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
