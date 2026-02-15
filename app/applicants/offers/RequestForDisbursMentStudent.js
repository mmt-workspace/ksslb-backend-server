const db = require("../../../database/db");
const { SetDateFomat, SetTimeFormat } = require("../../../functions/Date");
const TokensGenerator = require("../../../functions/TokensGenerator");
const CreditSearch_is_Ok = require("../../../email/CreditSearch_is_Ok");
const ReturnUTLetter = require("../../../email/ReturnUTLetter");
const { get } = require("https");



const createDisbursementRequest = (req, res) => {


    const {
        user_token,
        clientName,
        disbursementStudentName,
        disbursementAmountText,
        sponsorName,
        guarantor,
        totalAmountRequested,
        paymentType,
        isInternational,
        hasOthers,
        loanbank_account_number,
        a_studentName,
        a_accountName,
        a_amount,
        a_level,
        a_remita,
        b_studentName,
        b_amount,
        b_bank,
        b_course,
        b_level,
        b_matricNo,
        b_schoolAccountName,
        b_schoolAccountNumber,
        b_schoolName,
        c_studentName,
        c_bank,
        c_branch,
        c_course,
        c_iban,
        c_level,
        c_matricNo,
        c_schoolAccountName,
        c_schoolAccountNumber,
        c_schoolName,
        c_swift,
        oth_accNo,
        oth_amount,
        oth_bank,
        oth_name,
        sk_accNo,
        sk_amount,
        sk_bank,
        sk_centre,
        sk_centreAcc,
        up_accNo,
        up_amount,
        up_bank,
        up_name,
        amount_approve,
        accept_request
    } = req.body;

    // Check if disbursement request already exists for this user
    const checkSql = "SELECT * FROM disbursement_requests WHERE user_token = ?;";
    const updateLoanStepsSql = "UPDATE loan_steps SET ut_letter = ? , accept_offer = ? WHERE user_token = ?;";

   
    
    db.query(checkSql, [user_token], (err, result) => {


        if (err) {
            console.log(err);
            return res.send({ status: false, textStatus: "Error checking disbursement request" });
        }


        if(accept_request === "returned_request"){


               if (result.length > 0) {


                  (async()=>{

                        try {

                              UpdateDisbursementRequest( user_token,
        clientName,
        disbursementStudentName,
        disbursementAmountText,
        sponsorName,
        guarantor,
        totalAmountRequested,
        paymentType,
        isInternational,
        hasOthers,
        loanbank_account_number,
        a_studentName,
        a_accountName,
        a_amount,
        a_level,
        a_remita,
        b_studentName,
        b_amount,
        b_bank,
        b_course,
        b_level,
        b_matricNo,
        b_schoolAccountName,
        b_schoolAccountNumber,
        b_schoolName,
        c_studentName,
        c_bank,
        c_branch,
        c_course,
        c_iban,
        c_level,
        c_matricNo,
        c_schoolAccountName,
        c_schoolAccountNumber,
        c_schoolName,
        c_swift,
        oth_accNo,
        oth_amount,
        oth_bank,
        oth_name,
        sk_accNo,
        sk_amount,
        sk_bank,
        sk_centre,
        sk_centreAcc,
        up_accNo,
        up_amount,
        up_bank,
        up_name,
        amount_approve)
                            res.send({ status: true, textStatus: "Disbursement request updated successfully" });
                        } catch (error) {
                            
                             res.send({ status: false, textStatus: "Server Error" });
                             console.log(err)
                        }
                  })()
      
            
        }else{

              return res.send({ status: false, textStatus: "Disbursement request not exists" });
        }
        


        }else{
            
            if (result.length > 0) {
                return res.send({ status: false, textStatus: "Disbursement request already exists" });
            }
    
            // Proceed with insert if no existing record
            const insertSql = `
                INSERT INTO disbursement_requests (
                    user_token, clientName, disbursementStudentName, disbursementAmountText, sponsorName, guarantor, totalAmountRequested,
                    paymentType, isInternational, hasOthers, loanbank_account_number,
                    a_studentName, a_accountName, a_amount, a_level, a_remita,
                    b_studentName, b_amount, b_bank, b_course, b_level, b_matricNo,
                    b_schoolAccountName, b_schoolAccountNumber,b_schoolName, c_studentName,c_schoolAccountNumber, c_bank, c_branch,
                    c_course, c_iban, c_level, c_matricNo, c_schoolAccountName,
                    c_schoolName, c_swift, oth_accNo, oth_amount, oth_bank, oth_name,
                    sk_accNo, sk_amount, sk_bank, sk_centre,sk_centreAcc,
                    up_accNo, up_amount, up_bank, up_name,
                    createdAtTime, createdAtDate, amount_approve
                ) VALUES(?, ?, ?, ?, ?, ?, ?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ? ,?);`;
    
            db.query(insertSql, [
                user_token, clientName, disbursementStudentName, disbursementAmountText, sponsorName, guarantor, totalAmountRequested,
                paymentType, isInternational, hasOthers, loanbank_account_number,
                a_studentName, a_accountName, a_amount, a_level, a_remita,
                b_studentName, b_amount, b_bank, b_course, b_level, b_matricNo,
                b_schoolAccountName,b_schoolAccountNumber, b_schoolName, c_studentName,c_schoolAccountNumber, c_bank, c_branch,
                c_course, c_iban, c_level, c_matricNo, c_schoolAccountName,
                c_schoolName, c_swift, oth_accNo, oth_amount, oth_bank, oth_name,
                sk_accNo, sk_amount, sk_bank, sk_centre, sk_centreAcc,
                up_accNo, up_amount, up_bank, up_name,
                SetTimeFormat(),SetDateFomat(),amount_approve
            ], (err) => {
                if (err) {
                    console.log(err);
                    return res.send({ status: false, textStatus: "Error inserting disbursement request" });
                }
                  db.query(updateLoanStepsSql, ["ut_letter_done", "accept_offer_done", user_token], (err) => {
                      if (err) {
                          console.log(err);
                          // Not returning here since the main operation succeeded
                      }
                  });
    
                res.send({ status: true, textStatus: "Disbursement request created" });
    
            });
            
        }

    });





    
};


getDisbursementRequestByUserToken = (req, res) => {

    const { user_token } = req.params;

    const sql = "SELECT * FROM disbursement_requests WHERE user_token = ?;";

    db.query(sql, [user_token], (err, result) => {

        if (err) {
            console.log(err);
            return res.send({ status: false, textStatus: "Error fetching disbursement request" });
        }

        if (result.length > 0) {
            res.send({ status: true, data: result[0] });
        } else {
            res.send({ status: false, textStatus: "No disbursement request found" });
        }

        
    });
};


const UpdateDisbursementRequest = ( user_token,
        clientName,
        disbursementStudentName,
        disbursementAmountText,
        sponsorName,
        guarantor,
        totalAmountRequested,
        paymentType,
        isInternational,
        hasOthers,
        loanbank_account_number,
        a_studentName,
        a_accountName,
        a_amount,
        a_level,
        a_remita,
        b_studentName,
        b_amount,
        b_bank,
        b_course,
        b_level,
        b_matricNo,
        b_schoolAccountName,
        b_schoolAccountNumber,
        b_schoolName,
        c_studentName,
        c_bank,
        c_branch,
        c_course,
        c_iban,
        c_level,
        c_matricNo,
        c_schoolAccountName,
        c_schoolAccountNumber,
        c_schoolName,
        c_swift,
        oth_accNo,
        oth_amount,
        oth_bank,
        oth_name,
        sk_accNo,
        sk_amount,
        sk_bank,
        sk_centre,
        sk_centreAcc,
        up_accNo,
        up_amount,
        up_bank,
        up_name,
        amount_approve) => {
   

    // Check if disbursement request exists for this user
    const checkSql = "SELECT * FROM disbursement_requests WHERE user_token = ?;";

    db.query(checkSql, [user_token], (err, result) => {
        if (err) {
            console.log(err);
            //return res.send({ status: false, textStatus: "Error checking disbursement request" });
        }

        if (result.length === 0) {
            return  console.log({ status: false, textStatus: "Disbursement request not found" });
        }

        // Proceed with update
        const updateSql = `
            UPDATE disbursement_requests SET
                clientName = ?, disbursementStudentName = ?, disbursementAmountText = ?, 
                sponsorName = ?,guarantor = ?, totalAmountRequested = ?, paymentType = ?, 
                isInternational = ?, hasOthers = ?, loanbank_account_number = ?,
                a_studentName = ?, a_accountName = ?, a_amount = ?, a_level = ?, a_remita = ?,
                b_studentName = ?, b_amount = ?, b_bank = ?, b_course = ?, b_level = ?, 
                b_matricNo = ?, b_schoolAccountName = ?, b_schoolAccountNumber = ?, b_schoolName = ?,
                c_studentName = ?, c_schoolAccountNumber = ?, c_bank = ?, c_branch = ?, c_course = ?, 
                c_iban = ?, c_level = ?, c_matricNo = ?, c_schoolAccountName = ?, c_schoolName = ?, c_swift = ?,
                oth_accNo = ?, oth_amount = ?, oth_bank = ?, oth_name = ?,
                sk_accNo = ?, sk_amount = ?, sk_bank = ?, sk_centre = ?, sk_centreAcc = ?,
                up_accNo = ?, up_amount = ?, up_bank = ?, up_name = ?,
                amount_approve = ?,accept_request = ?,return_ut = ?
            WHERE user_token = ?;`;

        db.query(updateSql, [
            clientName, disbursementStudentName, disbursementAmountText, sponsorName, guarantor, totalAmountRequested,
            paymentType, isInternational, hasOthers, loanbank_account_number,
            a_studentName, a_accountName, a_amount, a_level, a_remita,
            b_studentName, b_amount, b_bank, b_course, b_level, b_matricNo,
            b_schoolAccountName, b_schoolAccountNumber, b_schoolName, c_studentName, c_schoolAccountNumber, c_bank, c_branch,
            c_course, c_iban, c_level, c_matricNo, c_schoolAccountName,
            c_schoolName, c_swift, oth_accNo, oth_amount, oth_bank, oth_name,
            sk_accNo, sk_amount, sk_bank, sk_centre, sk_centreAcc,
            up_accNo, up_amount, up_bank, up_name,
            amount_approve,null,"yes", user_token
        ], (err) => {
            if (err) {
                console.log(err);
                //return res.send({ status: false, textStatus: "Error updating disbursement request" });
            }

             // console.log({ status: true, textStatus: "Disbursement request updated successfully" });
        });
    });
};


ApprovedisbursementRequest = (req, res) => {

    const { user_token, approver_status, reason } = req.body;

    
    // check if disbursement request exists before updating
    const checkSql = "SELECT * FROM disbursement_requests WHERE user_token = ?;";

    db.query(checkSql, [user_token], (err, result) => {

        let status,list,sql
         
            if(approver_status === "" || user_token == ""){

              return res.send({ status: false, textStatus: "No action taken" });

            }

        if(approver_status === "approved_disbursement"){
              
                
              status = "approved_disbursement"
              sql = "UPDATE disbursement_requests SET approver_status = ? WHERE user_token = ?;"
              list = [status,user_token]
              
              const sqlLoanSteps = "UPDATE loan_steps SET disbursment = ? WHERE user_token = ?; "

               db.query(sqlLoanSteps,[status,user_token], (err) => {

            if (err) {
                console.log(err);
                return console.log({ status: false, textStatus: "Error updating disbursement request" });
                 }  

                 });



        }if(approver_status === "returned_request"){

            status = "returned_request"
           
            sql = "UPDATE disbursement_requests SET accept_request = ?, isactive = ?, reason_text = ? WHERE user_token = ?;"
            list = [status,"no",reason,user_token]
            db.query("SELECT email FROM sign_up WHERE user_token = ?;", [user_token], (err, result) => {

                if (err) {
                    console.log(err);
                    return console.log({ status: false, textStatus: "Error fetching user email" });
                }

                if (result.length > 0) {
                    const email = result[0].email;
                    ReturnUTLetter(email,reason);
                } else {
                    console.log({ status: false, textStatus: "User not found for email notification" });
                }
            });
           

         }if(approver_status === "approved_request"){

            status = "approved_request"
            sql = "UPDATE disbursement_requests SET accept_request = ? WHERE user_token = ?;"
            list = [status,user_token]



            const sqlLoanSteps = "UPDATE loan_steps SET ap_letter = ? WHERE user_token = ?; "
 
              db.query(sqlLoanSteps,[status,user_token], (err) => {

            if (err) {
                console.log(err);
                return console.log({ status: false, textStatus: "Error updating disbursement request" });
            }

        
        });





        }




        if (err) {
            console.log(err);
            return res.send({ status: false, textStatus: "Error updating disbursement request" });
        }



        if (result.length === 0) {

            return res.send({ status: false, textStatus: "Disbursement request not found" });
        }



        db.query(sql,list, (err) => {

            if (err) {
                console.log(err);
                return res.send({ status: false, textStatus: "Error updating disbursement request" });
            }

            res.send({ status: true, textStatus: "Done" });

        });


        
    });
};



 
// Export the functions if needed
module.exports = { ApprovedisbursementRequest, createDisbursementRequest, getDisbursementRequestByUserToken };


