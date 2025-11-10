const db = require("../../../database/db");
const validator = require("validator");
const TokensGenerator = require("../../../functions/TokensGenerator");
const {SetDateFomat,SetTimeFormat} = require("../../../functions/Date")

// Add University
AddUniversity = async (req, res) => {

    const { university_name, state_of_location, local_government, foreign_or_local,institutionCategory,phone_number,email,website,address,accreditation,courses_offered,about_institution,other_institution} = req.body;

    // Validate
    if (
        validator.isEmpty(university_name.trim()) ||
        validator.isEmpty(state_of_location.trim()) ||
        validator.isEmpty(local_government.trim()) ||
        validator.isEmpty(foreign_or_local.trim()) 

    ) {
        console.log("no empty input allowed");
        res.sendStatus(422);
        return;
    }
 
        // check if email already exists
    if(!validator.isEmail(email)){
        return res.send({
            statusText: "Invalid Email",
            status: false,
        });
    }

    // check if phone number is valid
    if(!validator.isMobilePhone(phone_number)){ 
        return res.send({
            statusText: "Invalid Phone Number",
            status: false,
        });
    }


    const sql = "INSERT INTO add_university(university_name, state_of_location, local_government, foreign_or_local,institutionCategory,phone_number,email,website,ins_address,accreditation,courses_offered,about_institution,other_institution, token,createdAtTime,createdAtDate) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
    const token = TokensGenerator(10);
    const createdAtTime = SetTimeFormat()
    const createdAtDate = SetDateFomat()
    const list = [university_name, state_of_location, local_government, foreign_or_local,institutionCategory,phone_number,email,website,address,accreditation,courses_offered,about_institution,other_institution, token,createdAtTime,createdAtDate];


    // check if university already exists
    const checkSql = "SELECT * FROM add_university WHERE university_name = ?;";
    db.query(checkSql, [university_name], (err, result) => {
        if (err) return console.log(err.message);


        if (result.length > 0) {

            return res.send({
                statusText: "University Already Exists",
                status: false,
            });

        }else{
             // check if email already exists
    const checkEmailSql = "SELECT * FROM add_university WHERE email = ?;";
    db.query(checkEmailSql, [email], (err, result) => {
        if (err) return console.log(err.message);



        if (result.length > 0) {
            return res.send({
                statusText: "Email Already Exists",
                status: false,
            });
        }else{


    // check if phone number already exists
    const checkPhoneSql = "SELECT * FROM add_university WHERE phone_number = ?;";
    db.query(checkPhoneSql, [phone_number], (err, result) => {
        if (err) return console.log(err.message);


        if (result.length > 0) {
            return res.send({
                statusText: "Phone Number Already Exists",
                status: false,
            });
        }else{

                  // insert institution
    db.query(sql, list, (err, result) => {
        if (err) return console.log(err.message);

        res.send({
            statusText: "University Added",
            status: true,
        });
    });


        }



    });




        }




    });
        }





    });




  



};

// Get Universities
GetUniversities = async (req, res) => {
      
      const type = req.params.type

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
      let sql
      if(type === "dash"){
  sql = "SELECT * FROM add_university;";

      }else{
          sql = "SELECT university_name FROM add_university;";
      }
   

    db.query(sql, (err, result) => {
        if (err) return console.log(err.message);

        res.send(result);
    });
};

// Delete University
DeleteUniversity = async (req, res) => {
    const { token } = req.params;
    const sql = "DELETE FROM add_university WHERE token = ?;";

    db.query(sql, [token], (err, result) => {
        if (err) return console.log(err.message);

        res.send({
            statusText: "University Deleted",
            status: true,
        });
    });
};

module.exports = {
    AddUniversity,
    GetUniversities,
    DeleteUniversity,
};
