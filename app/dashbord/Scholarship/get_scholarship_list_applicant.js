const db = require("../../../database/db")






// Get the Paid list

get_scholarship_list_applicant = (req,res) =>{



    const sql = "SELECT * FROM Set_scholarship ORDER BY Set_scholarship_id DESC;"

    db.query(sql,(err,result) =>{


          if(err) return console.log(err.message)

          res.send(result)

    })



}


module.exports = get_scholarship_list_applicant
