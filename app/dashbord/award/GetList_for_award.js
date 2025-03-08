const db = require("../../../database/db")








GetList_for_award = (req,res)=>{

      const qualificationType = req.params.qualificationType
      
    sql = `SELECT 
        bt.*, 
        su.verify_status,
        et.*
    FROM 
        bio_table bt
    LEFT JOIN 
      sign_up su ON bt.user_token = su.user_token
    LEFT JOIN 
        edu_table et ON bt.user_token = et.user_token
        WHERE 
        et.applying_for_type = ? AND su.verify_status = 'selected_for_award';`


    db.query(sql,[qualificationType],(err,result)=>{

        if(err) return console.log(err.message)

        res.json(result)

    })



        
}


module.exports = GetList_for_award