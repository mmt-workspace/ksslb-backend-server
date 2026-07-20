const db = require("../../../database/db") 




  Matrix = (req, res) => {

/*Loan request 
CREATE TABLE loan_requests (

  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  loan_amount DECIMAL(18,2) NOT NULL DEFAULT 0.00,
  tenor TINYINT UNSIGNED NOT NULL DEFAULT 1,
  net_monthly_income DECIMAL(18,2) NOT NULL DEFAULT 0.00,
  loan_category VARCHAR(100),
  token VARCHAR(200) NOT NULL,
  program_type VARCHAR(200) DEFAULT "not selected",
  valuePer int DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CHECK (tenor BETWEEN 1 AND 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
 */


   sql = `SELECT 
                bt.*, 
                su.verify_status,
                et.*,
                loan.*,
                loan_step.*,
                demography_table.*,
                bank_details.*,
                disbursement_requests.*,
                loan_requests.*
            FROM 
                bio_table bt
            LEFT JOIN 
                sign_up su ON bt.user_token COLLATE utf8mb4_unicode_ci = su.user_token COLLATE utf8mb4_unicode_ci
            LEFT JOIN 
                edu_table et ON bt.user_token COLLATE utf8mb4_unicode_ci = et.user_token COLLATE utf8mb4_unicode_ci
            LEFT JOIN apply_loan loan ON bt.user_token COLLATE utf8mb4_unicode_ci = loan.user_token COLLATE utf8mb4_unicode_ci
            LEFT JOIN loan_steps loan_step ON bt.user_token COLLATE utf8mb4_unicode_ci = loan_step.user_token COLLATE utf8mb4_unicode_ci
            LEFT JOIN demography_table ON bt.user_token COLLATE utf8mb4_unicode_ci = demography_table.user_token COLLATE utf8mb4_unicode_ci
            LEFT JOIN bank_details ON bt.user_token COLLATE utf8mb4_unicode_ci = bank_details.user_token COLLATE utf8mb4_unicode_ci
            LEFT JOIN loan_requests ON bt.user_token COLLATE utf8mb4_unicode_ci = loan_requests.token COLLATE utf8mb4_unicode_ci
            LEFT JOIN disbursement_requests ON bt.user_token COLLATE utf8mb4_unicode_ci = disbursement_requests.user_token COLLATE utf8mb4_unicode_ci
            WHERE 
                su.verify_status = 'accepted' 
                AND loan.apply_status = 'applied' 
                AND loan_step.ut_letter = 'ut_letter_done' 
                AND loan_step.disbursment = 'approved_disbursement'
                AND loan_step.done = 'accepted_disbursement';` 


                db.query(sql, (err, result) => {


                    if (err) return console.log(err.message)


                    res.json(result)

                    
                })




}


module.exports = Matrix