const db = require('../../../../database/db');
const RandomID = require('../../../../functions/RandomID');

const UpdateBankDetails = (req, res) => {

    
    const { bank_name, account_name, account_number, user_token } = req.body;
    const valuePer = 25;

    const sql = "UPDATE bank_details SET bank_name = ?, account_name = ?, account_number = ?, valuePer = ?, UpdateDate = NOW() WHERE user_token = ?;";
    const list = [bank_name, account_name, account_number, valuePer, user_token];

    db.query(sql, list, (err, result) => {
        if (err) return console.log(err.message);
        console.log("Updated Bank Details");
        res.send({
            textStatus: "Updated!!",
            status: true,
        });
    });
};

module.exports = UpdateBankDetails;