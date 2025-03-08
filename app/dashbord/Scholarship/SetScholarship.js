const validator = require("validator")
const db = require("../../../database/db")
const TokensGenerator = require("../../../functions/TokensGenerator")

// Amount function
SetScholarship = (req, res) => {
    
    const { scholarship_name, scholarship_type, qualification_type, residential_type, will_pay, amount_to_pay,scholarship_description } = req.body
     
    // Validate
    if (validator.isEmpty(scholarship_name.trim()) || validator.isEmpty(scholarship_type.trim()) || validator.isEmpty(qualification_type.trim()) || validator.isEmpty(residential_type.trim())) {
        console.log("no empty input allow")
        res.sendStatus(422)
        return
    }
  
    const schl_token = TokensGenerator(10)
    const createdAtTime = new Date().toLocaleTimeString()
    const createdAtDate = new Date().toLocaleDateString()

    const sql = "INSERT INTO Set_scholarship(scholarship_name, scholarship_type, qualification_type, resdential_type, will_pay, amount_to_pay, schl_token, scholarship_description,createdAtTime, createdAtDate) VALUES(?,?,?,?,?,?,?,?,?,?);"
    const list = [scholarship_name, scholarship_type, qualification_type, residential_type, will_pay, amount_to_pay, schl_token,scholarship_description, createdAtTime,createdAtDate]

    
    db.query(sql, list, (err, result) => {

        if (err) return console.log(err.message)

        res.send({
            statusText: "Done",
            status: true
        })


      })





}

module.exports = SetScholarship
