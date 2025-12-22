const db = require('../../../database/db');
const validator = require("validator")



// update aknowledge 

UpdateAcknowledgment = (user_token)=>{


        const sql = "UPDATE acknowledgment SET mssg = ?, ack_status = ? WHERE user_token = ?;"

        db.query(sql,["return_application","unread",user_token],(err,result)=>{

                 if (err) return reject(err);

                 console.log("acknowledgment reset")
        })




}


const CheckifAllinputFilled = (user_token,loan_category) => {


  return new Promise((resolve, reject) => {

    // basic validation
    if (typeof user_token !== 'string' || validator.isEmpty(user_token)) {
      return resolve({
        status: false,
        textStatus: "Empty usertoken"
      });
    }

    const checkUserTokenSql = "SELECT COUNT(*) AS count FROM bio_table WHERE user_token = ?;"

    db.query(checkUserTokenSql, [user_token], (err, result) => {
      if (err) return reject(err);

      if (!result || result[0].count === 0) {
        return resolve({
          status: false,
          textStatus: "User account not exist"
        });
      } 

      const sql1 = "SELECT  loan_amount,tenor,net_monthly_income,loan_category FROM loan_requests WHERE token = ?;"
      const sql2 = "SELECT first_name,surname,date_of_birth,gender,marital_status,phone_no_1,email,number_of_dependants,mother_maiden_name,bvn,nin_number,billing_address FROM sponsorIdentification WHERE token = ?;"
      const sql3 = "SELECT first_name,surname,office_address,phone_no_1,email FROM spouse_details WHERE token = ?;"
      const sql4 = "SELECT  residential_address,residential_status,years_in_apartment,nearest_landmark,profession,profession_type,position FROM residentialAddress WHERE token = ?;"
      const sql5 = "SELECT  employer_name,employer_address,year_of_confirmation,gross_annual_income,psn_ippis,year_of_retirement,net_monthly_income,grade_level,salary_payment_date,employee_id,qualification FROM employment_details WHERE token = ?;"
      const sql6 = "SELECT account_name,bank,account_number,account_type FROM salary_bank_details WHERE token = ?;"
      const sql7 = "SELECT first_ref_first_name,first_ref_surname,first_ref_relationship,first_ref_address,first_ref_phone_no_1,first_ref_email,second_ref_first_name,second_ref_surname,second_ref_relationship,second_ref_address,second_ref_phone_no_1,second_ref_email   FROM personal_references WHERE token = ?;"
      const sql8 = "SELECT first_name,surname,date_of_birth,gender,phone_no_1,marital_status,email,psn_no,mother_maiden_name,account_name,account_number,bvn,nin_number,bank_name,home_address,office_address FROM guarantor_details WHERE token = ?;"

      db.query(sql1, [user_token], (err, result1) => {
        if (err) return reject(err);

        db.query(sql2, [user_token], (err, result2) => {
          if (err) return reject(err);

          db.query(sql3, [user_token], (err, result3) => {
            if (err) return reject(err);

            db.query(sql4, [user_token], (err, result4) => {
              if (err) return reject(err);

              db.query(sql5, [user_token], (err, result5) => {
                if (err) return reject(err);

                db.query(sql6, [user_token], (err, result6) => {
                  if (err) return reject(err);

                  db.query(sql7, [user_token], (err, result7) => {
                    if (err) return reject(err);

                    db.query(sql8, [user_token], (err, result8) => {
                      if (err) return reject(err);

                      // helper to check first row fields are non-empty
                      const rowIsComplete = (rows) => {
                        if (!rows || rows.length === 0) return false;
                        const first = rows[0];
                        return Object.values(first).every(v => v !== null && v !== undefined && String(v).trim() !== "");
                      };

                      const loanrequestComplete = rowIsComplete(result1);
                      const sponsorIdentificationComplete = rowIsComplete(result2);
                      const spouse_detailsComplete = rowIsComplete(result3);
                      const residentialAddressComplete = rowIsComplete(result4);
                      const employment_detailsComplete = rowIsComplete(result5);
                      const salary_bank_detailsComplete = rowIsComplete(result6);
                      const personal_referencesComplete = rowIsComplete(result7);
                       const guarantor_detailsComplete = rowIsComplete(result8);

                       let details , rows;

                        if(loan_category === "studentloan"){
                            details = {
                              loanrequestComplete,
                              residentialAddressComplete,
                              employment_detailsComplete,
                              salary_bank_detailsComplete,
                               personal_referencesComplete,
                                guarantor_detailsComplete
                            }

                            rows  = {
                           loanrequest: result1 && result1[0] ? result1[0] : null,
                           spouse_details: result3 && result3[0] ? result3[0] : null,
                           residentialAddress: result4 && result4[0] ? result4[0] : null,
                           employment_details: result5 && result5[0] ? result5[0] : null,
                           salary_bank_details: result6 && result6[0] ? result6[0] : null,
                           personal_references: result7 && result7[0] ? result7[0] : null,
                          guarantor_details: result8 && result8[0] ? result8[0] : null
                        }

                        }else if(loan_category === "thirdparty"){
                            details = {
                              loanrequestComplete,
                              sponsorIdentificationComplete,
                              spouse_detailsComplete,
                              residentialAddressComplete,
                              employment_detailsComplete,
                              salary_bank_detailsComplete,
                               personal_referencesComplete,
                                guarantor_detailsComplete
                            }


                            rows  = {
                           loanrequest: result1 && result1[0] ? result1[0] : null,
                           sponsorIdentification: result2 && result2[0] ? result2[0] : null,
                           spouse_details: result3 && result3[0] ? result3[0] : null,
                           residentialAddress: result4 && result4[0] ? result4[0] : null,
                           employment_details: result5 && result5[0] ? result5[0] : null,
                           salary_bank_details: result6 && result6[0] ? result6[0] : null,
                           personal_references: result7 && result7[0] ? result7[0] : null,
                           guarantor_details: result8 && result8[0] ? result8[0] : null
                        }


                        }



                      return resolve({
                        status: true,
                           details,
                           rows
                      });
                    });

                  });

                });

              });

            });
          });
        });
      });
    });
  });
}



// Acknowledgment

Acknowledgment =  (req, res) => {


    const { mssg, user_token,loan_category } = req.body
         console.log(loan_category)
    if (!mssg || !user_token) {
        return res.sendStatus(400)
    }

    (async ()=>{

      try {
          const validation = await CheckifAllinputFilled(user_token,loan_category)
          
          if (!validation.status || Object.values(validation.details).includes(false)) {
            // Log the first incomplete section (if any) without using break inside a callback
            const incompleteKey = Object.keys(validation.details).find(key => validation.details[key] === false);
            
           /*  if (incompleteKey) {

              console.log(validation.details[incompleteKey]);
              console.log(incompleteKey)

            } */
            
            return res.send({ 

               status: validation.details[incompleteKey],
               textStatus: "Please complete all required fields first",
               sectionName: incompleteKey
             
                            })
  


          }

  
          const sql = "UPDATE acknowledgment SET mssg = ?, createdAtTime = ?, createdAtDate = ? WHERE user_token = ?;"
          const time = new Date().toLocaleTimeString()
          const date = new Date().toLocaleDateString()
  
           db.query(sql, [mssg, time, date, user_token], (err, result) => {
              if (err) {
                  console.error(err)
                  return res.status(500).json({ 
                    status: false,
                    textStatus: "Database error" 
                  })
              }
              res.json({ 
                 status: true,
                 textStatus: "Successfully"
                
                })
          }) 
      } catch (error) {
          console.error(error)
          res.status(500).json({ error: "Server error" })
      }

    })()








}











// Get Acknowledgment
GetAcknowledgment = (req,res)=> {


    const {user_token} = req.params


    if(!user_token){
        return res.sendStatus(400)
    }




     const sql = "SELECT * FROM acknowledgment WHERE user_token = ? ORDER BY ack_id DESC;"

     db.query(sql,[user_token],(err,result)=>{

        if(err) return console.log(err.message)

        res.send(result)

      })








}






 

module.exports = {Acknowledgment, GetAcknowledgment,UpdateAcknowledgment}