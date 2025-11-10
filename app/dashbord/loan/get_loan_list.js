const db = require("../../../database/db")






// Get the Paid list

get_loan_list = (req,res) =>{



    const sql = "SELECT * FROM Set_loan ORDER BY set_loan_id DESC;"

    db.query(sql,(err,result) =>{


          if(err) return console.log(err.message)

          res.send(result)

    })



}


module.exports = get_loan_list
