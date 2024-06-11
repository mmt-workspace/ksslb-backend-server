const db = require("../../../database/db")






// Get the Paid list

GetAmount = (req,res) =>{



    const sql = "SELECT * FROM amount_to_pay ORDER BY amount_to_pay_id DESC;"

    db.query(sql,(err,result) =>{


          if(err) return console.log(err.message)

          res.send(result)



    })



}


module.exports = GetAmount
