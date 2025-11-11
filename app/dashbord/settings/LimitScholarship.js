const db = require("../../../database/db")





LimitScholarship = (req,res)=>{


    const {count} = req.body
    
    
    const sql = "UPDATE set_limit_scholarship SET set_limit = ?;"


    db.query(sql,[count],(err,result)=>{


            if(err) return console.log(err.message)

            res.send("Limit Set to:")


    })


}


GetLimitScholarship = (req,res)=>{

    
    const sql = "SELECT * FROM set_limit_scholarship;"


    db.query(sql,(err,result)=>{


            if(err) return console.log(err.message)

            res.send(result)


    })





}









module.exports = {LimitScholarship,GetLimitScholarship}