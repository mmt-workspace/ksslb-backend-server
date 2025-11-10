const db = require('../../../database/db');
const RandomID = require('../../../functions/RandomID')



Bio = (fname,lname,mobileNumber,gender,marital_status,d_o_b,resdential_type,user_token)=>{

          //   console.log(fname,lname,mobileNumber,gender,marital_status,d_o_b,resdential_type,user_token)

              let valuePer = 25
              
              const sql = "INSERT INTO bio_table(fname,md_name,lname,mobileNumber,gender,marital_status,d_o_b,resdential_type,valuePer,user_token) VALUES(?,?,?,?,?,?,?,?,?,?);"
            
              const list = [fname,md_name,lname,mobileNumber,gender,marital_status,d_o_b,resdential_type,valuePer,user_token]
            // Store hash in your password DB.
             db.query(sql,list,(err,result)=>{
                     console.log(err)
                    if(err) return console.log(err.message)
                    console.log("bio_table inserted")
            })
            

            
}



UploadPic = (req,res)=>{


          
            if (!req.file) return res.status(400).json({ message: "No file uploaded" });

            const {usertoken} = req.body
 
          
          const sql = "UPDATE bio_table SET picture = ? WHERE user_token = ?;"

          const file_name = req.file.filename; 

          db.query(sql,[file_name,usertoken],(err,result)=>{

                     if(err)  return console.log(err.message)

                        res.send({
                                 status:true,
                                 textStatus:"Photo uploaded"
                        })






          })






}



module.exports = {Bio,UploadPic}