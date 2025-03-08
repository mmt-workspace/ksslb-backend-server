const db = require('../../../../database/db');









GetScholarshipAppliedList =  (req,res) =>{


const  {user_token,token}  = req.params;
 

const sql = `SELECT * FROM apply_scholarship WHERE user_token = ? AND schl_token = ?;`;

db.query(sql,[user_token,token],(err, result) => {

    if (err) {
        console.log(err);
        return res.status(500)
    }

   

    if (result.length === 0) {
        return res.status(404)
    }

    res.send(result);
    
});


}


GetScholarshipAppliedList_for_my_app =  (req,res) =>{


    const  user_token = req.params.user_token;
     
    
    const sql = `SELECT * FROM apply_scholarship WHERE user_token = ?;`;
    
    db.query(sql,[user_token],(err, result) => {
    
        if (err) {
            console.log(err);
            return res.status(500)
        }
    
       
    
        if (result.length === 0) {
            return res.status(404)
        }
    
        res.send(result);
        
    });
    

    }








module.exports = {GetScholarshipAppliedList,GetScholarshipAppliedList_for_my_app}


