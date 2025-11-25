const db = require("../../../database/db")











Check_If_all_files_are_provided = (req,res)=>{

 
     const {user_token,loan_category} = req.params

   //   console.log(user_token,loan_category)

     const sqlApplicant = "SELECT * FROM applicant_doc WHERE user_token = ? ;"
     const sqlDoc = "SELECT * FROM upload_doc WHERE loan_category = ?;"



       db.query(sqlDoc,[loan_category],(err,result)=>{

             if(err) console.log(err)



               if(result.length > 0){

                    const requiredDocs = result.length
                      
                  //   console.log(requiredDocs)

                   db.query(sqlApplicant,[user_token],(err,result)=>{
    
                       if(err) console.log(err)
    
     
                         const uploadedDocs = result.length

                          //  console.log("uploadedDocs", uploadedDocs)
                         //   console.log("requiredDocs", requiredDocs)

                             
                              
                            if(uploadedDocs ){

                                  res.send(
                                    {
                                        status:true,

                                    }
                                  )
                                  return
                            }else{

                                  res.send(
                                    {
                                        status:false,
                                        textStatus:"Please upload all required documents"

                                    }
                                  )

                            }
                        //     console.log(uploadedDocs)
    
    
    
    
    
    
                   })

                     
               }    












       })









}



module.exports = Check_If_all_files_are_provided