const db = require("../../../../database/db")
const TokensGenerator = require("../../../../functions/TokensGenerator");
const {SetDateFomat,SetTimeFormat} = require("../../../../functions/Date")







AddBank = (req,res) =>{

    const {bank_name,bank_address,bank_terms,bank_branch,agent_phone_number,bank_email}  = req.body

    const bank_token = TokensGenerator(10)
    const  createdAtTime = SetTimeFormat()
    const  createdAtDate = SetDateFomat()

    const checkSql = "SELECT * FROM addbank ;"

    const sql = "INSERT INTO addbank(bank_name,bank_token,bank_address,bank_terms,bank_branch,agent_phone_number,bank_email,createdAtTime,createdAtDate) VALUES(?,?,?,?,?,?,?,?,?);"
  

    db.query(checkSql,async (err,result)=>{

                 if(err) console.log(err.message)

                      
                    if(result.length > 0){
                            
                           
                           async  function Check(){

                                 
                                 const email = result.find(item => item.bank_email === bank_email)
                                 const bankname = result.find(item => item.bank_name === bank_name)
                                 const agentphonenumber = result.find(item => item.agent_phone_number === agent_phone_number)
                                  
                                 // if any match, send response and return false
                                 if(email){
                                      res.send({ status:false,   textStatus: "Email Exist"})
                                      return false
                                 }

                                 if(bankname){
                                      res.send({ status:false,   textStatus: "Bank name Exist"})
                                      return false
                                 }
                                  

                                 if(agentphonenumber){

                                  res.send({ status:false,   textStatus: "Mobile number Exist"})
                                  return false

                                 }

                                 return true
                                   
                             }


                             Check().then(ok=>{

                                           if(ok){

                                                                             
                                            db.query(sql,[bank_name,bank_token,bank_address,bank_terms,bank_branch,agent_phone_number,bank_email,createdAtTime,createdAtDate],(err)=>{

                                            if(err)  return console.log(err)

                                                res.send({
                                                    status:true,
                                                    textStatus: "Bank Added"
                                                })

 
                                    })

                                               
                                           }else{
                                             console.log("system failed at bank file ")
                                           }










                             })
  
                        




                    }else{

                          db.query(sql,[bank_name,bank_token,bank_address,bank_terms,bank_branch,agent_phone_number,bank_email,createdAtTime,createdAtDate],(err)=>{

                                            if(err)  return console.log(err)

                                                res.send({
                                                    status:true,
                                                    textStatus: "Bank Added"
                                                })

 
                                    })
                    }


    })




}




Get_Bank = (req,res)=>{



         const sql = "SELECT * FROM addbank;" 


         db.query(sql,(err,result)=>{

              if(err)  console.log(err.message)


                 res.send(result)


         })
        




}



























module.exports = {AddBank,Get_Bank}