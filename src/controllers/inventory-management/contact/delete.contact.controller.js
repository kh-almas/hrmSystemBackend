// require
const getDatabaseConnection = require("../../../configs/db.config");

// delete contact
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      "DELETE FROM inventory_contacts WHERE id = ?",
      [id]
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: { message: "one contact deleted", contact: row },
    });
  } catch (err) {
    console.error(`delete contact error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot delete contact" },
    });
  }
};

// export
module.exports = deleteContact;
