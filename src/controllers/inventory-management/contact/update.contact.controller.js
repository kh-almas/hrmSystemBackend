// require
const getDatabaseConnection = require("../../../configs/db.config");

// update contact
const updateContact = async (req, res) => {
  try {
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
      status,
      pc_address,
    } = req.body);
    contact.user_id = req.decoded.id;
    contact.created_by = req.decoded.email;
    contact.updated_by = req.decoded.email;
    const id = req.params.id;
    contact.image = req.files?.image?.[0]?.path;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      "UPDATE inventory_contacts SET ? WHERE id = ?",
      [contact, id]
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: { message: "one contact updated", contact: row },
    });
  } catch (err) {
    console.error(`add contact error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot update contact" },
    });
  }
};

// export
module.exports = updateContact;
