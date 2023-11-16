// require
const getDatabaseConnection = require("../../../configs/db.config");

// add contact
const addContact = async (req, res) => {
  const contact = ({
    contact_type,
    name,
    image,
    business_name,
    tax_number,
    opening_balance,
    pay_term,
    pay_term_condition,
    email,
    mobile,
    alternate_contact_no,
    country,
    state,
    city,
    address,
    note,
    pc_address = null
  } = req.body);
  contact.user_id = req.decoded.id;
  contact.status = 0;
  contact.created_by = req.decoded.email;
  contact.updated_by = req.decoded.email;
  contact.image = req.files?.image?.[0]?.path;

  try {
    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
        `INSERT INTO inventory_contacts SET ?`,
        contact
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: { message: `one contact added`, data: row },
    });
  } catch (err) {
    console.error(`add contact error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot add contact` },
    });
  }
};

// export
module.exports = addContact;
