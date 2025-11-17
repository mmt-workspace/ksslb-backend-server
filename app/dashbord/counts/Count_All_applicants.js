const db = require("../../../database/db")












Count_All_applicants = (req,res)=>{





    const sql = "SELECT COUNT(*) AS total FROM sign_up;"



    db.query(sql,(err,result)=>{

      if(err) return console.log(err)


        console.log(result)
        res.send(result)


        

   

    })











}









module.exports = {Count_All_applicants}