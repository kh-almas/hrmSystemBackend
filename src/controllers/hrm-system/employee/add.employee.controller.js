// require
const getDatabaseConnection = require("../../../configs/db.config");

// add employee
const addEmployeeController = async (req, res) => {
  const {
      organization_id = null,
      company_id = null,
      branch_id = '',
      department_id = '',
      section_id = '',
      employee_grade_id = '',
      salary_grade_id = '',
      shift_id = '',
      status = '',
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
      contact= ''
  } = req.body

    const img = req.files?.image?.[0]?.path;
    const cv = req.files?.cv?.[0].path;

    const employee_basic_information = {
        organization_id,
        company_id,
        branch_id,
        department_id,
        section_id,
        employee_grade_id,
        salary_grade_id,
        shift_id,
        status,
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
        img,
        cv
  }
    try {
      const connection = await getDatabaseConnection();
      await connection.beginTransaction();
      const [row] = await connection.query(
          `INSERT INTO hrm_employee SET ?`,
          employee_basic_information
      );
      if (contact) {
        const allContact = JSON.parse(contact);
        for (let i = 0; i < allContact.length; i++) {
          allContact[i].employee_id = row?.insertId;
        }

        for (const data of allContact) {
          // const contactInformationResult =
          await connection.query(
              `INSERT INTO hrm_employee_contact SET ?`,
              data
          );
        }
      }
      await connection.commit();
      connection.release();

      return res.status(200).json({
        status: "ok",
        body: { message: `one employee added`, data: row },
      });
    } catch (err) {
      // connection.rollback();
      console.error(`add employee error: ${err}`);

      return res.status(500).json({
        status: "error",
        body: { message: err || `cannot add employee` },
      });
    }
};

// export
module.exports = addEmployeeController;
