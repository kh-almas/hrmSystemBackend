const getDatabaseConnection = require("../../configs/db.config");

const getRoleController = async (req, res) => {
  try {
    const { page, item, search } = req.query;
    // const searchData = search ? `${search}%` : '';
    const totalItem = item === "" ? 10 : item;
    const skip =
      page === "" || page === "1" ? 0 : (parseInt(page) - 1) * totalItem;
    // console.log(page, item)
    const data = [
      "role.id",
      "role.name",
      "role.unique_id",
      "role.read_permission",
      "role.insert_permission",
      "role.update_permission",
      "role.delete_permission",
      "role.status",
      "role.created_by",
      "role.updated_by",
      "create_role.email as c_email",
      "update_role.email as u_email",
    ];

    console.log("search:", search);
    const connection = await getDatabaseConnection();
    let roles = await connection.query(
      `SELECT role.id, role.name, role.unique_id, role.read_permission, role.insert_permission, role.update_permission, role.delete_permission, role.status, role.created_by, role.updated_by, create_role.email as c_email, update_role.email as u_email 
            FROM roles as role 
            LEFT JOIN users as create_role ON role.created_by = create_role.id 
            LEFT JOIN users as update_role ON role.updated_by = update_role.id 
            WHERE role.name LIKE '${search}%' LIMIT ${totalItem} OFFSET ${skip};`
    );

    const count = await connection.query(
      `SELECT COUNT(role.id) as totalItem FROM roles as role WHERE role.name LIKE '${search}%'`
    );
    // if(search)
    // {
    //     roles = await connection.query(
    //         `Select ${data.join(",")} from roles as role
    //          LEFT JOIN users as create_role on role.created_by = create_role.id
    //          LEFT JOIN users as update_role on role.updated_by = update_role.id
    //          WHERE role.name LIKE '${search}%' LIMIT ${totalItem} OFFSET ${skip}`
    //     );
    // }

    const result = {
      count: count[0][0]?.totalItem,
      data: roles[0],
    };

    connection.release();

    // console.log(roles);
    return res.status(200).json({
      status: "ok",
      body: result,
    });
  } catch (err) {
    console.error(`add role error: ${err}`);

    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot add role` },
    });
  }
};
const postRoleController = async (req, res) => {
  try {
    const data = ({
      name,
      unique_id,
      read_permission,
      insert_permission,
      update_permission,
      delete_permission,
      status,
    } = req.body);
    data.created_by = req.decoded.id;
    data.updated_by = req.decoded.id;

    const connection = await getDatabaseConnection();
    const result = await connection.query(`INSERT INTO roles SET ?`, data);
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

const getSingleRoleController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = [
      "id",
      "name",
      "unique_id",
      "read_permission",
      "insert_permission",
      "update_permission",
      "delete_permission",
      "status",
      "created_by",
      "updated_by",
    ];

    const connection = await getDatabaseConnection();
    const result = await connection.query(
      `Select ${data.join(",")} from roles WHERE ID = ?`,
      [id]
    );
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

const updateRoleController = async (req, res) => {
  const { id } = req.params;

  const data = ({
    name,
    unique_id,
    read_permission,
    insert_permission,
    update_permission,
    delete_permission,
    status,
  } = req.body);

  data.updated_by = req.decoded.id;

  const connection = await getDatabaseConnection();
  const result = await connection.query(`UPDATE roles SET ? WHERE id = ?`, [
    data,
    id,
  ]);
  connection.release();

  console.log(result[0]);
  return res.status(200).json({
    status: "ok",
    body: result[0],
  });
};

const deleteRoleController = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await getDatabaseConnection();
    const result = await connection.query(`DELETE FROM roles WHERE id = ?`, [
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

module.exports = {
  postRoleController,
  updateRoleController,
  getRoleController,
  getSingleRoleController,
  deleteRoleController,
};
