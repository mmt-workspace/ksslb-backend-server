const db = require('../../../../../database/db');




updateloanRequest = (req,res)=>{
       
      
        
        // update req.body in case later code reads from it
       
              const { loanAmount,loanAmountWords,tenor,netMonthlyIncome,netMonthlyIncomeWords,loanCategory,user_token} = req.body

                const loanAmountClean = (data) => {
                        if (data === undefined || data === null) return 0.00;
                        const s = String(data).trim();
                        const cleaned = s.replace(/[^0-9.-]+/g, ''); // remove ₦, commas, spaces, etc.
                        const n = parseFloat(cleaned);
                        return Number.isFinite(n) ? n : 0.00;
                }

                const loan_amount = loanAmountClean(loanAmount)
                const net_monthly_income = loanAmountClean(netMonthlyIncome)

              const valuePer = 25

              const sql = "UPDATE loan_requests SET loan_amount = ?,loan_amount_words = ?, tenor = ?,net_monthly_income = ? , net_monthly_income_words = ? ,  loan_category = ?, valuePer = ? WHERE token = ?;";
        
              const list = [loanAmount ? loan_amount : 0.00,loanAmountWords,tenor ? tenor : 1,netMonthlyIncome ? net_monthly_income : 0.00,netMonthlyIncomeWords,loanCategory,valuePer,user_token]
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



module.exports = updateloanRequest


