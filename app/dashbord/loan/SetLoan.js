const validator = require("validator")
const db = require("../../../database/db")
const TokensGenerator = require("../../../functions/TokensGenerator")

// Amount function
SetLoan = (req, res) => {

    const { loan_name, loan_type, qualification_type, residential_type, will_pay, amount_to_pay, loan_description } = req.body
     
    // Validate
    if (validator.isEmpty(loan_name.trim()) || validator.isEmpty(loan_type.trim()) || validator.isEmpty(qualification_type.trim()) || validator.isEmpty(residential_type.trim())) {
        console.log("no empty input allow")
        res.sendStatus(422)
        return
    }
  
    const token = TokensGenerator(10)
    const createdAtTime = new Date().toLocaleTimeString()
    const createdAtDate = new Date().toLocaleDateString()
    const bank_name = loan_name

    const sql = "INSERT INTO Set_loan(loan_name, loan_type, qualification_type, residential_type, will_pay, amount_to_pay, token, loan_description,bank_name,createdAtTime, createdAtDate) VALUES(?,?,?,?,?,?,?,?,?,?,?);"
    const list = [loan_name, loan_type, qualification_type, residential_type, will_pay, amount_to_pay, token,loan_description, bank_name,createdAtTime,createdAtDate]

    
    db.query(sql, list, (err, result) => {

        if (err) return console.log(err.message)

        res.send({
            statusText: "Done",
            status: true
        })

 
      })


}
















module.exports = SetLoan
