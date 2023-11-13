// require
const getDatabaseConnection = require("../../configs/db.config");
const bcrypt = require("bcrypt");

// post user
const postUser = async (req, res) => {
  try {
    const { userId, password } = req.body;


    const connection = await getDatabaseConnection();

    const [user] = await connection.query(
        `SELECT email FROM hrm_employee where id = ${userId}`
    );

    const userData = {
      email: user[0].email,
      password: password
    }


    // console.log(user[0].email);
    const [row] = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [user[0].email]
    );
    connection.release();

    if (row.length) {
      throw "user exists";
    }

    bcrypt.genSalt((saltRounds = 10), (err, salt) => {
      if (err) {
        throw err;
      }

      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          throw err;
        }

        try {
          const data = {
            email: user[0].email,
            password: hash,
            role: 'user'
          };

          const connection = await getDatabaseConnection();
          const [row] = await connection.query("INSERT INTO users SET ?", data);
          connection.release();

          console.log(`user post: ${row}`);

          res.status(200).json({
            status: "ok",
            body: { message: "user post", user: 'row' },
          });
        } catch (err) {
          console.error(`post user error: ${err}`);

          res.status(500).json({
            status: "error",
            body: { message: err || "cannot post user" },
          });
        }
      });
    });
  } catch (err) {
    console.error(`post user error: ${err}`);

    res.status(500).json({
      status: "error",
      body: { message: err || "cannot post user" },
    });
  }
};

// get all user
const getAllUser = async (req, res) => {
  try {
    const columns = ["id", "email", "password"];

    const connection = await getDatabaseConnection();
    const [row] = await connection.query(
      `SELECT ${columns.join(",")} FROM users`
    );
    // console.log(row);
    connection.release();

    return res
      .status(200)
      .json({ status: "ok", body: { message: "all users", users: row } });
  } catch (err) {
    console.error(`get user error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || "cannot get user" },
    });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await getDatabaseConnection();
    const result = await connection.query(`DELETE FROM users WHERE id = ?`, [
      id,
    ]);
    connection.release();

    console.log(result[0]);
    return res.status(200).json({
      status: "ok",
      body: result[0],
    });
  } catch (err) {
    console.error(`add role error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot add role` },
    });
  }
};

// export
module.exports = { getAllUser, postUser, deleteUserController };
