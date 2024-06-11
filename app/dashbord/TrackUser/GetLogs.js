const db = require("../../../database/db")






// Get the Paid list

GetLogs = (req,res) =>{



    const sql = "SELECT * FROM track_activity ORDER BY track_activity_id DESC;"

    db.query(sql,(err,result) =>{


          if(err) return console.log(err.message)

          res.send(result)



    })



}


module.exports = GetLogs
