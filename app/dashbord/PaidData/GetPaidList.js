const db = require("../../../database/db")






// Get the Paid list

GetPaidList = (req,res) =>{



    const sql = "SELECT * FROM register_list ORDER BY register_list_id DESC;"

    db.query(sql,(err,result) =>{


          if(err) return console.log(err.message)

          res.send(result)



    })



}


module.exports = GetPaidList
