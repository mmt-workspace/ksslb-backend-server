const db = require('../../../database/db');
const validator = require('validator');
const { promisify } = require('util');

const query = promisify(db.query).bind(db);

const SQLS = {
  loanrequestComplete: "SELECT loan_amount,tenor,net_monthly_income,loan_category FROM loan_requests WHERE token = ?;",
  sponsorIdentificationComplete:
    "SELECT first_name,surname,date_of_birth,gender,marital_status,phone_no_1,email,number_of_dependants,mother_maiden_name,bvn,nin_number,billing_address FROM sponsorIdentification WHERE token = ?;",
  spouse_detailsComplete:
    "SELECT first_name,surname,office_address,phone_no_1,email FROM spouse_details WHERE token = ?;",
  residentialAddressComplete:
    "SELECT residential_address,residential_status,years_in_apartment,nearest_landmark,profession,profession_type,position FROM residentialAddress WHERE token = ?;",
  employment_detailsComplete:
    "SELECT employer_name,employer_address,year_of_confirmation,gross_annual_income,psn_ippis,year_of_retirement,net_monthly_income,grade_level,salary_payment_date,employee_id,qualification FROM employment_details WHERE token = ?;",
  salary_bank_detailsComplete:
    "SELECT account_name,bank,account_number,account_type FROM salary_bank_details WHERE token = ?;",
  personal_referencesComplete:
    "SELECT first_ref_first_name,first_ref_surname,first_ref_relationship,first_ref_address,first_ref_phone_no_1,first_ref_email,second_ref_first_name,second_ref_surname,second_ref_relationship,second_ref_address,second_ref_phone_no_1,second_ref_email FROM personal_references WHERE token = ?;",
  guarantor_detailsComplete:
    "SELECT first_name,surname,date_of_birth,gender,phone_no_1,marital_status,email,psn_no,mother_maiden_name,account_name,account_number,bvn,nin_number,bank_name,home_address,office_address FROM guarantor_details WHERE token = ?;"
};

const rowIsComplete = (rows) => {
  if (!Array.isArray(rows) || rows.length === 0) return false;
  const first = rows[0];
  return Object.values(first).every(v => v !== null && v !== undefined && String(v).trim() !== '');
};

const Check_if_all_inputs_are_set = async (req, res) => {


  try {

    const { user_token, section_list_name } = req.params || {};

    if (typeof user_token !== 'string' || validator.isEmpty(user_token.trim())) {
      return res.status(400).send({ status: false, textStatus: "Empty or missing user_token" });
    }

    // verify user exists
    const checkUserTokenSql = "SELECT COUNT(*) AS count FROM bio_table WHERE user_token = ?;";
    const userCountRows = await query(checkUserTokenSql, [user_token]);
    const count = userCountRows && userCountRows[0] ? Number(userCountRows[0].count || 0) : 0;

    if (count === 0) {
      return res.status(404).send({ status: false, textStatus: "User account does not exist" });
    }

    // fetch all sections in parallel
    const keys = Object.keys(SQLS);
    const results = await Promise.all(keys.map(k => query(SQLS[k], [user_token])));

    const details = keys.reduce((acc, k, i) => {
      acc[k] = rowIsComplete(results[i]);
      return acc;
    }, {});

    // if a specific section is requested, validate the name
    if (section_list_name) {
      if (!details.hasOwnProperty(section_list_name)) {
        return res.status(400).send({ status: false, textStatus: "Invalid section_list_name" });
      }
      if (!details[section_list_name]) {
        return res.send({
          status: false,
          textStatus: "Please complete all required fields first",
          sectionName: section_list_name
        });
      }
      return res.send({ status: true, textStatus: "Next Step", sectionName: section_list_name });
    }

    // no specific section: ensure all are complete
    const firstIncomplete = keys.find(k => details[k] === false);
    if (firstIncomplete) {
      return res.send({
        status: false,
        textStatus: "Please complete all required fields first",
        sectionName: firstIncomplete
      });
    }

    return res.send({ status: true, textStatus: "Next Step" });
  } catch (err) {
    console.error('Check_if_all_inputs_are_set error:', err);
    return res.status(500).send({ status: false, textStatus: "Internal server error" });
  }
};

module.exports = Check_if_all_inputs_are_set;
