// require
const add = require("../../../base/controllers/add.controller");

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
    pc_address,
  } = req.body);
  contact.user_id = req.decoded.id;
  contact.status = 0;
  contact.created_by = req.decoded.email;
  contact.updated_by = req.decoded.email;

  const tableName = "inventory_contacts";
  const dataName = "contact";

  add(tableName, contact, res, dataName);
};

// export
module.exports = addContact;
