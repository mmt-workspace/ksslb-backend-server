const db = require('../../../database/db');


const application_type = (application_type,token) => {



    const sql = "INSERT INTO application_type(application_type,token,createdAtTime,createdAtDate) VALUES(?,?,?,?)";

    const time  = new Date().toLocaleTimeString()
    const date  = new Date().toLocaleDateString()
   
    const list = [application_type,token,time,date];

    db.query(sql, list, (err, result) => {

        if (err) return console.log(err.message);


        console.log("applicationtype inserted");
    });

};


// Update Application Type

UpdateAppType = (req,res) => {   

    const {application_type,UserTokens} = req.body

    if(application_type.trim() === "" || UserTokens.trim() === "") return res.sendStatus(422)

    const sql = "UPDATE application_type SET application_type = ? WHERE token = ?;"

    db.query(sql,[application_type,UserTokens],(err,result)=>{

          if(err) return console.log(err.message)

          if(result.affectedRows > 0){

               res.send({
                    status:true,
                    textStatus:"Updated"
               })

          }else{
               res.send({
                    status:false,
                    textStatus:"Not Updated"
               })
          }
    })

}


GetAppType = (req,res)=>{

    const {token} = req.params

    if(token.trim() === "") return res.sendStatus(422)

    const sql = "SELECT * FROM application_type WHERE token = ?;"

    db.query(sql,[token],(err,result)=>{
          if(err) return console.log(err.message)

          if(result.length > 0){

               res.send(result)

          }else{
               res.send([])
          }
    })

}





module.exports = {application_type,GetAppType,UpdateAppType};