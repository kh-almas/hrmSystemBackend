// require
const getDatabaseConnection = require("../../../configs/db.config");

// update employee
const updateEmployeeController = async (req, res) => {

  // console.log('req.body7', req.body)
  const { id } = req.params;
  const {
    branch_id = '',
    department_id = '',
    section_id = '',
    employee_grade_id = '',
    salary_grade_id = '',
    shift_id, status = '',
    name_title = '',
    gender = '',
    employee_type = '',
    full_name = '',
    job_code = '',
    first_name = '',
    last_name = '',
    email = '',
    phone = '',
    father_name = '',
    mother_name = '',
    spouse_name = '',
    card_no = '',
    date_of_birth = '',
    joining_date = '',
    emp_machine_id = '',
    website = '',
    skills = '',
    old_cv = '',
    old_image = '',
    contact,
  } = req.body;

  const img = req.files?.image?.[0]?.path;
  const cv = req.files?.cv?.[0].path;

  const employee_basic_information = {
    branch_id,
    department_id,
    section_id,
    employee_grade_id,
    salary_grade_id,
    shift_id, status,
    name_title,
    gender,
    employee_type,
    full_name,
    first_name,
    last_name,
    job_code: job_code === '' || job_code === 'null' ? null : job_code,
    email: email === '' || email === 'null' ? null : email,
    phone: phone === '' || phone === 'null' ? null : phone,
    father_name,
    mother_name,
    spouse_name,
    card_no,
    date_of_birth,
    joining_date,
    emp_machine_id,
    website,
    skills,
    img: img ? img : old_image,
    cv: cv ? cv : old_cv,

  }
  try {
    const connection = await getDatabaseConnection();
    // await connection.beginTransaction();

    if (contact !== 'undefined') {
      const allContact = JSON.parse(contact);
      for (const data of allContact) {
        const contact_id = data.id;
        data.employee_id = id;
        delete data.id;
        if (contact_id)
        {
          const [row1] = await connection.query(
              `UPDATE hrm_employee_contact SET ? WHERE id = ?`,
              [data, contact_id]
          );
        }else
        {
          const [row2] = await connection.query(
              `INSERT INTO hrm_employee_contact
                     SET ?`,
              data
          );
        }

      }
    }

    const [row] = await connection.query(
        `UPDATE hrm_employee SET ? WHERE id = ?`,
        [employee_basic_information, id]
    );
    connection.release();

    return res.status(200).json({
      status: "ok",
      body: { message: `one employee updated` },
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      body: { message: err || `cannot update employee` },
    });
  }
};

// export
module.exports = updateEmployeeController;