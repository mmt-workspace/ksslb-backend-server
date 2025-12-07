const db = require('../../../database/db')
const TokensGenerator = require('../../../functions/TokensGenerator')
const {SetDateFomat,SetTimeFormat} = require('../../../functions/Date')








CreditSearch = (req,res)=>{



const {search_status,comments,user_tokens} = req.body
const token = TokensGenerator(10)



        const sql = "INSERT INTO credit_search(user_token,search_status,credit_file,token,credit_comment,createdAtTime,createdAtDate) VALUES(?,?,?,?,?,?,?);"
        const updateSql = "UPDATE credit_search SET search_status = ?, credit_file = ?, credit_comment = ? WHERE user_token = ? AND token = ?;"
           
           
        const file = req.file.filename
        const checksql = "SELECT credit_search WHERE user_token = ?;"


        db.query(checksql,[user_tokens,token],(err,checkresult)=>{
            
            if(err) return console.log(err.message)

            if(checkresult.length > 0){


                db.query(updateSql,[search_status,file,comments,user_tokens],(err,updateresult)=>{
            
                    if(err) return console.log(err.message)

                    return res.send({  
                        status:true,
                        textStatus:"Credit Search Updated"
                    })  

                   })

                return


            }else{


                 db.query(sql,[user_tokens,search_status,file,token,comments,SetTimeFormat(),SetDateFomat()],(err,result)=>{
            
                   if(err) return console.log(err.message)




                            res.send({  
                                status:true,
                                textStatus:"Credit Search Uploaded"
                            })  

                        })  


            }
            


        })
  

       






}






GetCreditSearch = (req,res)=>{


        const {user_token} = req.body

        const sql = "SELECT * FROM credit_search WHERE user_token = ? ORDER BY credit_search_id DESC;"



        db.query(sql,[user_token],(err,result)=>{
            
            if(err) return console.log(err.message)




            res.send(result)  



        })  







}















module.exports = {CreditSearch,GetCreditSearch}