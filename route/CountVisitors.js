const db = require("../database/db")
const validator = require("validator")
const {SetDateFomat,SetTimeFormat} = require("../functions/Date")







CountVisitor = (req,res)=>{


    const ip = req.clientIp
    const dateTime = SetDateFomat() + " Time:" +  SetTimeFormat()
 
      console.log(ip,dateTime,"visitor")
    if(validator.isEmpty(ip)){
        res.sendStatus(422)
        return
    }



    // First check if IP already exists
    db.query("SELECT COUNT(*) AS count FROM visitors WHERE ip_address = ?", [ip], (err, results) => {


        if (err) {
            console.error("Error checking IP:", err);
            return res.status(500).send("Error checking IP");
        }



        // If IP already exists, return success without inserting
        if (results[0].count > 0) {
            return res.sendStatus(200);
        }



        // If IP is unique, insert it
        db.query("INSERT INTO visitors (ip_address,visit_date) VALUES (?,?)", [ip,dateTime], (err) => {

            if (err) {
                console.error("Error logging visit:", err);
                return res.status(500).send("Error logging visit");
            }


            res.sendStatus(200);



        });





    });







}







GetCountVisitor = (req,res)=>{


    db.query("SELECT COUNT(*) AS count FROM visitors", (err, results) => {
        if (err) {
          console.error("Error fetching count:", err);
          return res.status(500).send("Error fetching count");
        }

       
        res.status(200)
      });


}


module.exports = {CountVisitor,GetCountVisitor}