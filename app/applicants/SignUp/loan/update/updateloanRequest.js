const db = require('../../../../../database/db');




updateloanRequest = (req,res)=>{
       
      
        
        // update req.body in case later code reads from it
       
              const { loanAmount,tenor,fieldName,netMonthlyIncome,loanCategory,program_type,user_token} = req.body

                const loanAmountClean = (data) => {
                        if (data === undefined || data === null) return 0.00;
                        const s = String(data).trim();
                        const cleaned = s.replace(/[^0-9.-]+/g, ''); // remove ₦, commas, spaces, etc.
                        const n = parseFloat(cleaned);
                        return Number.isFinite(n) ? n : 0.00;
                }
                 

                const loan_amount = loanAmountClean(loanAmount)
                const net_monthly_income = loanAmountClean(netMonthlyIncome)
                let changeTenor  = tenor
                const sqluser = "SELECT d_o_b  FROM bio_table WHERE user_token = ?;"
                const currentYear = new Date().getFullYear();

               db.query(sqluser,[user_token],(err,result)=>{
       
                        if(err) return console.log(err.message)
                       
                        if(result.length > 0){

                                // 
                                const dob = result[0].d_o_b
                                const birthYear = new Date(dob).getFullYear();
                                const age = currentYear - birthYear;
                              //  console.log(age)
                               
                              if(fieldName === "loanCategory"){
                              


                                      if(loanCategory === "studentloan"){



                                                if(age > 30){

                                           return    res.send({

                                                  textStatus:"STUDENT TERTIARY EDUCATION LOAN, MAX AGE IS 30 YEARS FOR STUDENT LOAN",
                                                   status:false,
                                                      })
 
                                        
                                                   }
      
                                              changeTenor = 10


                const valuePer = 25

                const sql = "UPDATE loan_requests SET loan_amount = ?, tenor = ?,net_monthly_income = ?  ,  loan_category = ?,program_type = ?, valuePer = ? WHERE token = ?;";
                
                const list = [loanAmount ? loan_amount : 0.00,changeTenor ? changeTenor : 1,netMonthlyIncome ? net_monthly_income : 0.00,loanCategory,program_type,valuePer,user_token]
                // Store hash in your password DB.
                db.query(sql,list,(err,result)=>{
                
                        if(err) return console.log(err.message)
                        //  console.log("Updated p")
                        res.send({
                                textStatus:"Updated!!",
                                status:true,
                        })
        
                })

                
                  }
      


                               if(loanCategory === "thirdparty"){



      
                                changeTenor = 5



                const valuePer = 25

                const sql = "UPDATE loan_requests SET loan_amount = ?, tenor = ?,net_monthly_income = ?  ,  loan_category = ?,program_type = ?, valuePer = ? WHERE token = ?;";
                
                const list = [loanAmount ? loan_amount : 0.00,changeTenor ? changeTenor : 1,netMonthlyIncome ? net_monthly_income : 0.00,loanCategory,program_type,valuePer,user_token]
                // Store hash in your password DB.
                db.query(sql,list,(err,result)=>{
                
                        if(err) return console.log(err.message)
                        //  console.log("Updated p")
                        res.send({
                                textStatus:"Updated!!",
                                status:true,
                        })
        
                })


                                      }


          
                                }else{



                const valuePer = 25

                const sql = "UPDATE loan_requests SET loan_amount = ?, tenor = ?,net_monthly_income = ?  ,  loan_category = ?, program_type = ?, valuePer = ? WHERE token = ?;";
                
                const list = [loanAmount ? loan_amount : 0.00,changeTenor ? changeTenor : 1,netMonthlyIncome ? net_monthly_income : 0.00,loanCategory, program_type,valuePer,user_token]
                // Store hash in your password DB.
                db.query(sql,list,(err,result)=>{
                
                        if(err) return console.log(err.message)
                        //  console.log("Updated p")
                        res.send({
                                textStatus:"Updated!!",
                                status:true,
                        })
        
                })
 
                                }




                                 }




                           }) 
                 
        


        


}



module.exports = updateloanRequest


