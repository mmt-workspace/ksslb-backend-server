const db = require("../../../database/db")
const validator = require("validator")



GetLoanData = (req, res) => {


  
  const user_token = req.params.user_token

   // console.log(user_token)
  if (validator.isEmpty(user_token)) {
    return res.sendStatus(422)
  }
// console.log("here")


  const checkUserTokenSql = "SELECT COUNT(*) AS count FROM bio_table WHERE user_token = ?;"

  db.query(checkUserTokenSql, [user_token], (err, result) => {

    if (err) return console.log(err.message)
     
    if (result[0].count === 0) {
      console.log("User token not found")
      return res.sendStatus(422)
    }
  
    

    
    const sql1 = "SELECT * FROM loan_requests WHERE token = ?;"
    const sql2 = "SELECT * FROM sponsorIdentification WHERE token = ?;"
    const sql3 = "SELECT * FROM spouse_details WHERE token = ?;"
    const sql4 = "SELECT * FROM residentialAddress WHERE token = ?;"
    const sql5 = "SELECT * FROM employment_details WHERE token = ?;"
    const sql6 = "SELECT * FROM salary_bank_details WHERE token = ?;"
    const sql7 = "SELECT * FROM personal_references WHERE token = ?;"
    const sql8 = "SELECT * FROM guarantor_details WHERE token = ?;"

    
    
    db.query(sql1, [user_token], (err, result1) => {
      
      if (err) return console.log(err.message)

      db.query(sql2, [user_token], (err, result2) => {
        if (err) return console.log(err.message)

        db.query(sql3, [user_token], (err, result3) => {
          if (err) return console.log(err.message)

          db.query(sql4, [user_token], (err, result4) => {
            if (err) return console.log(err.message)


              db.query(sql5, [user_token], (err, result5) => {
                if (err) return console.log(err.message)
    
               
                  db.query(sql6, [user_token], (err, result6) => {
                    if (err) return console.log(err.message)
        
                      db.query(sql7, [user_token], (err, result7) => {
                        if (err) return console.log(err.message)
            

                          db.query(sql8, [user_token], (err, result8) => {
                            if (err) return console.log(err.message)

                           
                           
                            res.send({

                              loanrequest: result1,
                              sponsorIdentification: result2,
                              spouse_details: result3,
                              residentialAddress: result4,
                              employment_details: result5,
                              salary_bank_details: result6,
                              personal_references: result7,
                              guarantor_details: result8
                             

                            })
                        

 
   
                      })


                       
                      })

                  })


              })

          })
        })
      })
    })
  })






}



module.exports = GetLoanData
