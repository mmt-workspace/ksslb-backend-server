const db = require('../../../../database/db');
const {SetDateFomat,SetTimeFormat} = require("../../../../functions/Date")
const TokensGenerator = require("../../../../functions/TokensGenerator")
const Acknowledgment = require("../../../../email/Acknowledgment")






ApplyLoan = (req,res) => {


    const  { user_token,loan_applied,loan_type,loan_card_token } = req.body;

  

    const sql = ` INSERT INTO apply_loan(user_token,loan_applied,loan_type,token,apply_status,loan_card_token,award_status,createdAtTime,createdAtDate) VALUES (?, ?, ?, ?, ?, ?, ?,?,?)`;
    const sqlCheck = "SELECT * FROM apply_loan WHERE user_token = ?;"
    const sqlemail = "SELECT email FROM sign_up WHERE user_token = ?;"
 

    const createdAtTime = SetTimeFormat()   
    const createdAtDate = SetDateFomat()
    const token = TokensGenerator(14) 
    const apply_status = "applied"
    const award_status = "Pending"
    const values = [user_token,loan_applied,loan_type,token,apply_status,loan_card_token,award_status, createdAtTime, createdAtDate];
       

    db.query(sqlCheck,[user_token],(err,result)=>{

       if (err) {
            console.error('Error inserting data:', err);
            return;
        }
         
      //   console.log(result)

        if(result.length > 0){
           
               res.send(
                {

                    status:false,
                    message:`You have already Applied to ${result[0].loan_applied} loan`
                }
               )

                  
        }else{

           


            db.query(sql, values, (err, result) => {
    
            if (err) {
                console.error('Error inserting data:', err);
                return;
            }
    
            res.send({
                status: true,
                message: "Application submitted successfully!"
            });

              db.query(sqlemail,[user_token],(err,result) =>{

                        if(err)  return console.log(err)

                             if(result.length > 0){

                                  const email = result[0].email

                                   Acknowledgment(email)

                             }
              })  
        
        });  
     

        } 
         
     
    })





};


GetloanAppliedList =  (req,res) =>{


const  {user_token,loan_card_token}  = req.params;
 
 
const sql = `SELECT * FROM apply_loan WHERE user_token = ? AND loan_card_token = ?;`;

db.query(sql,[user_token,loan_card_token],(err, result) => {

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








GetLoanAppliedList_for_my_app =  (req,res) =>{


    const  user_token = req.params.user_token;
     

    
     const sql = `
      SELECT DISTINCT a.*, su.verify_status,su.user_token
      FROM apply_loan a
      LEFT JOIN sign_up su
        ON a.user_token = su.user_token
      WHERE a.user_token = ?;
    `;
    
    db.query(sql,[user_token],(err, result) => {
    
        if (err) {
            console.log(err);
            return res.status(500)
        }
    
       
    
        if (result.length === 0) {
            return res.status(404)
        }
       //  console.log(result)
        res.send(result);
        
    });
    


    }




module.exports = {ApplyLoan,GetloanAppliedList,GetLoanAppliedList_for_my_app};
