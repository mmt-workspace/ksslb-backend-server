const db = require('../../../database/db');
const RandomID = require('../../../functions/RandomID');

const BankDetail = (user_token) => {


    const sql = "INSERT INTO bank_details(user_token) VALUES(?)";
    const list = [user_token];

    db.query(sql, list, (err, result) => {
        if (err) return console.log(err.message);
        console.log("bank_details inserted");
    });
};

module.exports = BankDetail;