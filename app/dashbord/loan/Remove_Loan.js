const db = require("../../../database/db")







Remove_Loan = (req,res) => {


    const  token = req.params.token
 
    const sql = "DELETE FROM Set_loan WHERE token = ? ;"

    db.query(sql,[token],(err,result) =>{


          if(err) return console.log(err.message)

          res.send("Removed")



    })


};

module.exports = Remove_Loan;