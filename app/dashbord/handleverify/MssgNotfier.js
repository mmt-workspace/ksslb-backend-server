const db = require('../../../database/db');
const SendMail = require("./../../../email/SendMail")



// insert for notes

PostMssgNote = (sender_token,receiver_token,mssg_subject,mssg_body)=> {



    if(!sender_token || !receiver_token || !mssg_subject || !mssg_body){
        return res.sendStatus(400)
    }

    const sql = "INSERT INTO send_mssg(sender_token,receiver_token,mssg_subject,mssg_body,createdAtTime,createdAtDate) VALUES(?,?,?,?,?,?);"
    const sql2 = "SELECT * FROM sign_up WHERE user_token = ?;"
    
    const time  = new Date().toLocaleTimeString()
    const date  = new Date().toLocaleDateString()




    db.query(sql2,[receiver_token],(err,result)=>{

        if(err) return console.log(err.message)

        
              
             if(result.length > 0){
                  
                 db.query(sql,[sender_token,receiver_token,mssg_subject,mssg_body,time,date],(err,result)=>{
             
                     if(err) return console.log(err.message)
             
                     res.send({
                         status:true,
                         textStatus:"Message Sent"
                     })
             
             
                 })
              
             }else{


                     res.send({
                         status:false,
                         textStatus:"Invalid token"
                     })

             }














    })
     





}



MssgNotfier = (req,res)=> {




    const {sender_token,receiver_token,mssg_subject,mssg_body} = req.body

    if(!sender_token || !receiver_token || !mssg_subject || !mssg_body){
        return res.sendStatus(400)
    }

    const sql = "INSERT INTO send_mssg(sender_token,receiver_token,mssg_subject,mssg_body,createdAtTime,createdAtDate) VALUES(?,?,?,?,?,?);"
    const sql2 = "SELECT * FROM sign_up WHERE user_token = ?;"
    
    const time  = new Date().toLocaleTimeString()
    const date  = new Date().toLocaleDateString()




    db.query(sql2,[receiver_token],(err,result)=>{

        if(err) return console.log(err.message)

        
              
             if(result.length > 0){
                  
                 db.query(sql,[sender_token,receiver_token,mssg_subject,mssg_body,time,date],(err,result)=>{
             
                     if(err) return console.log(err.message)
             
                     res.send({
                         status:true,
                         textStatus:"Message Sent"
                     })
             
             
                 })
                 // send mail to applicant
                SendMail(result[0].email,mssg_body)
                   
             }else{


                     res.send({
                         status:false,
                         textStatus:"Invalid token"
                     })

             }














    })
     





}

// Get MssgNotfier
GetMssgNotfier = (req,res)=> {

    const {receiver_token} = req.params

    if(!receiver_token){
        return res.sendStatus(400)
    }

    const sql = "SELECT * FROM send_mssg WHERE receiver_token = ? ORDER BY send_mssg_id DESC;"

    db.query(sql,[receiver_token],(err,result)=>{

        if(err) return console.log(err.message)

        res.send(result)

    })

}







module.exports = {MssgNotfier, GetMssgNotfier,PostMssgNote}