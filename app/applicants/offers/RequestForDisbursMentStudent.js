const db = require("../../../database/db");
const { SetDateFomat, SetTimeFormat } = require("../../../functions/Date");
const TokensGenerator = require("../../../functions/TokensGenerator");
const CreditSearch_is_Ok = require("../../../email/CreditSearch_is_Ok");
const { get } = require("https");



const createDisbursementRequest = (req, res) => {


    const {
        user_token,
        clientName,
        disbursementStudentName,
        disbursementAmountText,
        sponsorName,
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
        b_schoolName,
        c_studentName,
        c_bank,
        c_branch,
        c_course,
        c_iban,
        c_level,
        c_matricNo,
        c_schoolAccountName,
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
        up_name
    } = req.body;


  

    const insertSql = `
        INSERT INTO disbursement_requests (
            user_token, clientName, disbursementStudentName, disbursementAmountText, sponsorName, totalAmountRequested,
            paymentType, isInternational, hasOthers, loanbank_account_number,
            a_studentName, a_accountName, a_amount, a_level, a_remita,
            b_studentName, b_amount, b_bank, b_course, b_level, b_matricNo,
            b_schoolAccountName, b_schoolName, c_studentName, c_bank, c_branch,
            c_course, c_iban, c_level, c_matricNo, c_schoolAccountName,
            c_schoolName, c_swift, oth_accNo, oth_amount, oth_bank, oth_name,
            sk_accNo, sk_amount, sk_bank, sk_centre,sk_centreAcc,
            up_accNo, up_amount, up_bank, up_name,
            createdAtTime, createdAtDate
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

    db.query(insertSql, [
        user_token, clientName, disbursementStudentName, disbursementAmountText, sponsorName, totalAmountRequested,
        paymentType, isInternational, hasOthers, loanbank_account_number,
        a_studentName, a_accountName, a_amount, a_level, a_remita,
        b_studentName, b_amount, b_bank, b_course, b_level, b_matricNo,
        b_schoolAccountName, b_schoolName, c_studentName, c_bank, c_branch,
        c_course, c_iban, c_level, c_matricNo, c_schoolAccountName,
        c_schoolName, c_swift, oth_accNo, oth_amount, oth_bank, oth_name,
        sk_accNo, sk_amount, sk_bank, sk_centre, sk_centreAcc,
        up_accNo, up_amount, up_bank, up_name,
        SetTimeFormat(), SetDateFomat()
    ], (err) => {
        if (err) {
            console.log(err);
            return res.send({ status: false, textStatus: "Error inserting disbursement request" });
        }
        res.send({ status: true, textStatus: "Disbursement request created" });
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






 
// Export the functions if needed
module.exports = {  createDisbursementRequest,getDisbursementRequestByUserToken};


