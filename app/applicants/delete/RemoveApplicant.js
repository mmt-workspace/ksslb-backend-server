const db = require("../../../database/db")



   

RemoveApplicant = (req,res) => {

   
    const  token = req.params.token
 
    const queries = [
        "DELETE FROM sign_up WHERE user_token = ?",
        "DELETE FROM bio_table WHERE user_token = ?",
        "DELETE FROM demography_table WHERE user_token = ?",
        "DELETE FROM parent_table WHERE user_token = ?",
        "DELETE FROM edu_table WHERE user_token = ?",
        "DELETE FROM bank_details WHERE user_token = ?",
        "DELETE FROM applicant_credentials WHERE user_token = ?",
        "DELETE FROM applicant_doc WHERE user_token = ?",
        "DELETE FROM apply_scholarship WHERE user_token = ?"
    ];

    queries.forEach(query => {
        db.query(query, [token], (err) => {
            if (err) return console.log(err.message);
        });
    });

    res.send("Removed");

  

}


module.exports = RemoveApplicant