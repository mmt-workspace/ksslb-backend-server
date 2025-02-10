const db = require('../../../database/db')





GetAllApplicant = (req,res)=>{

    
    const sql = `SELECT 
    su.email,su.signupDate,su.user_token, 
    bt.*, 
    dt.*, 
    pt.*, 
    et.*
FROM 
    sign_up su
LEFT JOIN 
    bio_table bt ON su.user_token = bt.user_token
LEFT JOIN 
    demography_table dt ON su.user_token = dt.user_token
LEFT JOIN 
    parent_table pt ON su.user_token = pt.user_token
LEFT JOIN 
    edu_table et ON su.user_token = et.user_token`



    db.query(sql,(err,result)=>{
        if(err) return console.log(err.message)
             res.send(result)
    })



}



module.exports = GetAllApplicant