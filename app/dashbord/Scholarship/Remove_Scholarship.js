const db = require("../../../database/db")







removeScholarship = (req,res) => {


    const  token = req.params.token
 
    const sql = "DELETE FROM Set_scholarship WHERE schl_token = ? ;"

    db.query(sql,[token],(err,result) =>{


          if(err) return console.log(err.message)

          res.send("Removed")



    })


};

module.exports = removeScholarship;