const db = require("../../../database/db")
const {SetDateFomat,SetTimeFormat} = require("../../../functions/Date")
const TokensGenerator = require("../../../functions/TokensGenerator")
const CreditSearch_is_Ok = require("../../../email/CreditSearch_is_Ok")



Inpriciple_offer = (req,res)=>{


     
     const {guarantor,program_type,email,Sponsor,Student,Amount_Requested,Amount_Requested_Tenor,Amount_Offered,Amount_Offered_Tenor,Credit_Report,Credit_Status,offer_status,user_token,bank_reviewer_token} = req.body

     // Check if user_token exists
     const checkSql = 'SELECT * FROM inprinciple_offer WHERE user_token = ?'
     
     db.query(checkSql, [user_token], (err, result) => {
          if(err) {
               console.log(err.message)
               return res.send({status: false, textStatus: "Error checking record"})
          }
           console.log(result.length)
          const token = TokensGenerator(10)

          if(result.length > 0) {
               // Update existing record
               const updateSql = 'UPDATE inprinciple_offer SET Sponsor =?,guarantor=?,program_type=?,Student=?,Amount_Requested=?,Amount_Requested_Tenor=?,Amount_Offered=?,Amount_Offered_Tenor=?,Credit_Report=?,Credit_Status=?,offer_status=?,bank_reviewer_token=?,token=?,createdAtTime=?,createdAtDate=? WHERE user_token=?'
               
               db.query(updateSql, [Sponsor,guarantor,program_type,Student,Amount_Requested,Amount_Requested_Tenor,Amount_Offered,Amount_Offered_Tenor,Credit_Report,Credit_Status,offer_status,bank_reviewer_token,token,SetTimeFormat(),SetDateFomat(),user_token], (err) => {
                    if(err) console.log(err)

                  //  CreditSearch_is_Ok(email)

                    res.send({status: true, textStatus: "Offer updated"})
               })
          } else {
               // Insert new record
               const insertSql = 'INSERT INTO inprinciple_offer(Sponsor,guarantor,program_type,Student,Amount_Requested,Amount_Requested_Tenor,Amount_Offered,Amount_Offered_Tenor,Credit_Report,Credit_Status,offer_status,user_token,bank_reviewer_token,token,createdAtTime,createdAtDate) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
               
               db.query(insertSql, [Sponsor,guarantor,program_type,Student,Amount_Requested,Amount_Requested_Tenor,Amount_Offered,Amount_Offered_Tenor,Credit_Report,Credit_Status,offer_status,user_token,bank_reviewer_token,token,SetTimeFormat(),SetDateFomat()], (err) => {
                    
                    if(err) console.log(err)

                   //  CreditSearch_is_Ok(email)

                    res.send({status: true, textStatus: "Offer set"})
               })
          }
     })
}




Get_Inpriciple_offer = (req,res) =>{


           const {user_token}  = req.params
  console.log(user_token)
           const sql = "SELECT * FROM inprinciple_offer WHERE user_token = ?;"
           const sql2 = "SELECT s_i_d FROM applicant_credentials WHERE user_token = ?;"
           
          

 
           db.query(sql,[user_token],(err,result)=>{
             

           if(err) console.log(err.message)

     
           db.query(sql2,[user_token],(err,result2)=>{
             

               if(err) console.log(err.message)


                      

                    res.send({
                         ...result[0],
                         SID: result2[0].s_i_d
                    })
 


  
           })
                   

  


           })


 


}




Decline_offer = (req,res)=>{



           const {confirmDecline,user_token} = req.body


          const sql = "UPDATE inprinciple_offer SET did_accept = ?, reasons = ? WHERE user_token = ?; "


         db.query(sql,["declined",confirmDecline,user_token],(err,result)=>{


                      if(err) console.log(err)

                         res.send(
                              {

                                   status: true,
                                   textStatus:"Offer Declined"
                              }
                         )
         })



}







module.exports = {Inpriciple_offer,Get_Inpriciple_offer,Decline_offer}
