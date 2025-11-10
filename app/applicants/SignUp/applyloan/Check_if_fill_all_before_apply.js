const db = require('../../../../database/db');
const validator = require("validator");

// Constants for SQL queries
const SQL_QUERIES = {
  checkUserToken: "SELECT COUNT(*) AS count FROM bio_table WHERE user_token = ?;",
  loanRequest: "SELECT loan_amount,tenor,net_monthly_income,loan_category FROM loan_requests WHERE token = ?;",
  sponsorIdentification: "SELECT first_name,surname,date_of_birth,gender,marital_status,phone_no_1,phone_no_2,email,number_of_dependants,mother_maiden_name,bvn,nin_number,tin_number,billing_address FROM sponsorIdentification WHERE token = ?;",
  spouseDetails: "SELECT first_name,surname,office_address,phone_no_1,phone_no_2,email FROM spouse_details WHERE token = ?;",
  residentialAddress: "SELECT residential_address,residential_status,years_in_apartment,nearest_landmark,profession,profession_type,position FROM residentialAddress WHERE token = ?;",
  employmentDetails: "SELECT employer_name,employer_address,year_of_confirmation,gross_annual_income,psn_ippis,year_of_retirement,net_monthly_income,grade_level,salary_payment_date,employee_id,qualification FROM employment_details WHERE token = ?;",
  salaryBankDetails: "SELECT account_name,bank,account_number,account_type FROM salary_bank_details WHERE token = ?;",
  personalReferences: "SELECT first_ref_first_name,first_ref_surname,first_ref_relationship,first_ref_address,first_ref_phone_no_1,first_ref_phone_no_2,first_ref_email,second_ref_first_name,second_ref_surname,second_ref_relationship,second_ref_address,second_ref_phone_no_1,second_ref_phone_no_2,second_ref_email FROM personal_references WHERE token = ?;",
  guarantorDetails: "SELECT first_name,surname,date_of_birth,gender,phone_no_1,phone_no_2,marital_status,email,psn_no,mother_maiden_name,account_name,account_number,bvn,nin_number,bank_name,tin_number,home_address,office_address FROM guarantor_details WHERE token = ?;"
};

// Promisified database query
const queryAsync = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// Helper to check if row is complete
const rowIsComplete = (rows) => {
  if (!rows || rows.length === 0) return false;
  return Object.values(rows[0]).every(v => v !== null && v !== undefined && String(v).trim() !== "");
};

const CheckifAllinputFilled = async (user_token) => {
  try {
    // Basic validation
    if (typeof user_token !== 'string' || validator.isEmpty(user_token)) {
      return {
        status: false,
        textStatus: "Empty usertoken"
      };
    }

    // Check if user exists
    const userExists = await queryAsync(SQL_QUERIES.checkUserToken, [user_token]);
    if (!userExists || userExists[0].count === 0) {
      return {
        status: false,
        textStatus: "User account not exist"
      };
    }

    // Execute all queries in parallel
    const [
      result1, result2, result3, result4,
      result5, result6, result7, result8
    ] = await Promise.all([
      queryAsync(SQL_QUERIES.loanRequest, [user_token]),
      queryAsync(SQL_QUERIES.sponsorIdentification, [user_token]),
      queryAsync(SQL_QUERIES.spouseDetails, [user_token]),
      queryAsync(SQL_QUERIES.residentialAddress, [user_token]),
      queryAsync(SQL_QUERIES.employmentDetails, [user_token]),
      queryAsync(SQL_QUERIES.salaryBankDetails, [user_token]),
      queryAsync(SQL_QUERIES.personalReferences, [user_token]),
      queryAsync(SQL_QUERIES.guarantorDetails, [user_token])
    ]);

    const details = {
      loanrequestComplete: rowIsComplete(result1),
      sponsorIdentificationComplete: rowIsComplete(result2),
      spouse_detailsComplete: rowIsComplete(result3),
      residentialAddressComplete: rowIsComplete(result4),
      employment_detailsComplete: rowIsComplete(result5),
      salary_bank_detailsComplete: rowIsComplete(result6),
      personal_referencesComplete: rowIsComplete(result7),
      guarantor_detailsComplete: rowIsComplete(result8)
    };

    return {
      status: true,
      details,
      rows: {
        loanrequest: result1[0] || null,
        sponsorIdentification: result2[0] || null,
        spouse_details: result3[0] || null,
        residentialAddress: result4[0] || null,
        employment_details: result5[0] || null,
        salary_bank_details: result6[0] || null,
        personal_references: result7[0] || null,
        guarantor_details: result8[0] || null
      }
    };
  } catch (error) {
    throw error;
  }
};

const Check_if_fill_all_before_apply = async (req, res) => {


  const { user_token } = req.body;

  if (!user_token) {
    return res.status(400).json({ error: "User token is required" });
  }


 
     const sql = "SELECT * FROM acknowledgment WHERE user_token = ? AND mssg = ?;"

     db.query(sql,[user_token, 'acknowledged'],async(err,result)=>{

        if(err) return console.log(err.message)

                
          try {
          const validation = await CheckifAllinputFilled(user_token);



          if (!validation.status || Object.values(validation.details).includes(false)) {

          const incompleteKey = Object.keys(validation.details).find(key => !validation.details[key]);

          return res.json({
          status: false,
          textStatus: "Please complete all required fields first",
          sectionName: incompleteKey
          });
          }



             if(result.length > 0){


                  
              return res.json({
               status: true,
               textStatus: "Pass all required fields"
          });


            }else{
                 
                 return res.json({
                  status: false,
                  textStatus: " Finish with Acknowledgment Page",
                
                  });
                  
                 
            }






          
          } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Server error" });
          }
         






      })













};

module.exports = { Check_if_fill_all_before_apply };
