const db = require('../../../../../database/db');



updateGuarantorDetails = (req,res)=>{
       
     
/* CREATE TABLE guarantor_details (

  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100),
  middle_name VARCHAR(100),
  surname VARCHAR(100),
  date_of_birth DATE,
  gender VARCHAR(10),
  phone_no_1 VARCHAR(20),
  phone_no_2 VARCHAR(20),
  marital_status VARCHAR(20),
  email VARCHAR(150),
  psn_no VARCHAR(100),
  mother_maiden_name VARCHAR(150),
  account_name VARCHAR(200),
  account_number VARCHAR(20) UNIQUE,
  bvn VARCHAR(20),
  nin_number VARCHAR(20),
  bank_name VARCHAR(150),
  tin_number VARCHAR(20),
  home_address TEXT,
  office_address TEXT,

  token VARCHAR(200),
  valuePer  int DEFAULT 0,

  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
 */
        
              const { first_name,middle_name,surname,date_of_birth,gender,phone_no_1,phone_no_2,marital_status,email,psn_no,mother_maiden_name,account_name,account_number,bvn,nin_number,bank_name,tin_number,home_address,office_address,user_token} = req.body
              const valuePer = 25

              const sql = "UPDATE guarantor_details SET first_name = ?,middle_name = ?, surname = ?,date_of_birth = ? , gender = ? ,  phone_no_1 = ?, phone_no_2 = ? ,marital_status =?,email = ?,psn_no = ?,mother_maiden_name = ?,account_name = ? ,account_number = ? ,bvn = ?,nin_number = ? ,bank_name = ? ,tin_number = ? ,home_address = ?,office_address = ?, valuePer = ? WHERE token = ?;";
              
              const checksql = "SELECT * FROM guarantor_details WHERE account_number = ?;"
        
              const list = [first_name,middle_name,surname,date_of_birth,gender,phone_no_1, phone_no_2,marital_status,email,psn_no,mother_maiden_name,account_name,account_number,bvn,nin_number,bank_name,tin_number,home_address,office_address
,valuePer,user_token]



               db.query(checksql,[account_number],(err,result)=>{
       
                    if(err) return console.log(err.message)
               /* 
                        if(result.length > 0){
                                 
                                 const usertoken  = result[0].token

                                 if(usertoken !== user_token){

                                         res.send({
                                          textStatus:"Account Number been used for another applicant",
                                          status:false,
                                          }) 
     
                                          return

                                 }


                                  



                        } 
 */





                        
                        db.query(sql,list,(err,result)=>{
                   
                                if(err) return console.log(err.message)
                           
                                     
                            res.send({
                                    textStatus:"Updated!!",
                                    status:true,
                            })
             
                        })





             
            })
          


}

module.exports = updateGuarantorDetails








