const db = require("../../../database/db")
const validator = require("validator")

GetApplicantData = (req, res) => {


  const user_token = req.params.user_token

  if (validator.isEmpty(user_token)) {
    return res.sendStatus(422)
  }



  const checkUserTokenSql = "SELECT COUNT(*) AS count FROM bio_table WHERE user_token = ?;"

  db.query(checkUserTokenSql, [user_token], (err, result) => {

    if (err) return console.log(err.message)

    if (result[0].count === 0) {
      return res.sendStatus(422)
    }
    

    
    const sql1 = "SELECT * FROM bio_table WHERE user_token = ?;"
    const sql2 = "SELECT * FROM demography_table WHERE user_token = ?;"
    const sql3 = "SELECT * FROM parent_table WHERE user_token = ?;"
    const sql4 = "SELECT * FROM edu_table WHERE user_token = ?;"
    const sql5 = "SELECT email FROM sign_up WHERE user_token = ?;"
    const sql6 = "SELECT * FROM bank_details WHERE user_token = ?;"
    const sql7 = "SELECT * FROM apply_scholarship WHERE user_token = ?;"
    const sql8 = "SELECT * FROM applicant_doc WHERE user_token = ?;"
    
    
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
                              bio_data: result1,
                              demography_data: result2,
                              parent_data: result3,
                              edu_data: result4,
                              sign_up: result5,
                              bank_details_data: result6,
                              apply_scholarship_data: result7,
                              applicant_doc_data: result8,
                              bioProgressStatus: result1[0].valuePer + result2[0].valuePer + result3[0].valuePer + result4[0].valuePer
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

module.exports = GetApplicantData
