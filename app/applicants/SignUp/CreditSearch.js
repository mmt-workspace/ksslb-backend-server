const db = require('../../../database/db')
const TokensGenerator = require('../../../functions/TokensGenerator')
const {SetDateFomat,SetTimeFormat} = require('../../../functions/Date')








CreditSearch = (req,res)=>{



const {search_status,file,comments,user_tokens} = req.body
const token = TokensGenerator(10)

/* CREATE TABLE credit_search(

      credit_search_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
      user_token VARCHAR(200) NOT NULL,
      search_status VARCHAR(100) DEFAULT "not searched",
       credit_file VARCHAR(200),
       token VARCHAR(200) NOT NULL,
       credit_comment TEXT,
      createdAtTime VARCHAR(100),
      createdAtDate VARCHAR(100)

);
 */


        const sql = "INSERT INTO credit_search(user_token,search_status,credit_file,token,credit_comment,createdAtTime,createdAtDate) VALUES(?,?,?,?,?,?,?);"


        db.query(sql,[user_tokens,search_status,file,token,comments,SetTimeFormat(),SetDateFomat()],(err,result)=>{
            
            if(err) return console.log(err.message)




            res.send({  
                status:true,
                textStatus:"Credit Search Uploaded"
            })  

        })  









}


module.exports = CreditSearch