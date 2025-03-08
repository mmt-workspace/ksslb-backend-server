const db = require('../../../../database/db');
const {SetDateFomat,SetTimeFormat} = require("../../../../functions/Date")
const TokensGenerator = require("../../../../functions/TokensGenerator")








ApplyScholarship = (req,res) => {


    const  { user_token, scholarship_applied,scholarship_type,schl_token } = req.body;

    const sql = ` INSERT INTO apply_scholarship(user_token,scholarship_applied,scholarship_type,token,apply_status,schl_token,award_status,createdAtTime,createdAtDate) VALUES (?, ?, ?, ?, ?, ?, ?,?,?)`;
 

    const createdAtTime = SetTimeFormat()   
    const createdAtDate = SetDateFomat()
    const token = TokensGenerator(14) 
    const apply_status = "applied"
    const award_status = "Pending"
    const values = [user_token, scholarship_applied,scholarship_type, token, apply_status,schl_token,award_status, createdAtTime, createdAtDate];
       
    db.query(sql, values, (err, result) => {

        if (err) {
            console.error('Error inserting data:', err);
            return;
        }

        res.send({
            status: true,
            message: "Application submitted successfully!"
        });
    
       
    });



    

};

module.exports = ApplyScholarship;
