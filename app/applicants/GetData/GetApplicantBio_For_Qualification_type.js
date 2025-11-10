const db = require("../../../database/db")






GetApplicantBio_For_Qualification_type = (req,res)=>{

 
    let which = req.params.which
    let type = req.params.type
    let sql
    
    
    
    if(type === "selection"){

        sql = `SELECT 
        bt.*, 
        su.verify_status,
        asp.*,
        et.*
    FROM 
        bio_table bt
    LEFT JOIN 
      sign_up su ON bt.user_token = su.user_token
    LEFT JOIN 
        apply_scholarship asp ON bt.user_token = asp.user_token
    LEFT JOIN 
        edu_table et ON bt.user_token = et.user_token
        WHERE 
        et.applying_for_type = ? AND su.verify_status = 'verified' AND asp.apply_status = "applied";`
    }

    if(type === "verification"){
  

          if(which === "verify"){
              sql = `SELECT 
              bt.*, 
              su.verify_status,
              et.*,
              loan.*
          FROM 
              bio_table bt
          LEFT JOIN 
            sign_up su ON bt.user_token = su.user_token
          LEFT JOIN 
              edu_table et ON bt.user_token = et.user_token
          LEFT JOIN apply_loan loan ON bt.user_token = loan.user_token
              WHERE 
               su.verify_status = 'Not Verified' AND loan.apply_status = 'applied';`


          }else if(which === "verified"){

              sql = `SELECT 
              bt.*, 
              su.verify_status,
              et.*,
              loan.*
          FROM 
              bio_table bt
          LEFT JOIN 
            sign_up su ON bt.user_token = su.user_token
          LEFT JOIN 
              edu_table et ON bt.user_token = et.user_token
          LEFT JOIN apply_loan loan ON bt.user_token = loan.user_token
              WHERE 
               su.verify_status = 'verified' AND loan.apply_status = 'applied';`


          }else if(which === "return"){


               sql = `SELECT 
              bt.*, 
              su.verify_status,
              et.*,
              loan.*
          FROM 
              bio_table bt
          LEFT JOIN 
            sign_up su ON bt.user_token = su.user_token
          LEFT JOIN 
              edu_table et ON bt.user_token = et.user_token
          LEFT JOIN apply_loan loan ON bt.user_token = loan.user_token
              WHERE 
               su.verify_status = 'returned' AND loan.apply_status = 'applied';`

          }






    }

     if(type === "approval"){
  

          if(which === "approve"){
              sql = `SELECT 
              bt.*, 
              su.verify_status,
              et.*,
              loan.*
          FROM 
              bio_table bt
          LEFT JOIN 
            sign_up su ON bt.user_token = su.user_token
          LEFT JOIN 
              edu_table et ON bt.user_token = et.user_token
          LEFT JOIN apply_loan loan ON bt.user_token = loan.user_token
              WHERE 
               su.verify_status = 'verified' AND loan.apply_status = 'applied';`


          }else if(which === "approved"){

              sql = `SELECT 
              bt.*, 
              su.verify_status,
              et.*,
              loan.*
          FROM 
              bio_table bt
          LEFT JOIN 
            sign_up su ON bt.user_token = su.user_token
          LEFT JOIN 
              edu_table et ON bt.user_token = et.user_token
          LEFT JOIN apply_loan loan ON bt.user_token = loan.user_token
              WHERE 
               su.verify_status = 'approved' AND loan.apply_status = 'applied';`


          }else if(which === "return"){


               sql = `SELECT 
              bt.*, 
              su.verify_status,
              et.*,
              loan.*
          FROM 
              bio_table bt
          LEFT JOIN 
            sign_up su ON bt.user_token = su.user_token
          LEFT JOIN 
              edu_table et ON bt.user_token = et.user_token
          LEFT JOIN apply_loan loan ON bt.user_token = loan.user_token
              WHERE 
               su.verify_status = 'returned_by_approver' AND loan.apply_status = 'applied';`

          }





          
    }


      if(type === "bank"){
  

          if(which === "bank"){
              sql = `SELECT 
              bt.*, 
              su.verify_status,
              et.*,
              loan.*
          FROM 
              bio_table bt
          LEFT JOIN 
            sign_up su ON bt.user_token = su.user_token
          LEFT JOIN 
              edu_table et ON bt.user_token = et.user_token
          LEFT JOIN apply_loan loan ON bt.user_token = loan.user_token
              WHERE 
               su.verify_status = 'approved' AND loan.apply_status = 'applied';`


          }else if(which === "accepted"){

              sql = `SELECT 
              bt.*, 
              su.verify_status,
              et.*,
              loan.*
          FROM 
              bio_table bt
          LEFT JOIN 
            sign_up su ON bt.user_token = su.user_token
          LEFT JOIN 
              edu_table et ON bt.user_token = et.user_token
          LEFT JOIN apply_loan loan ON bt.user_token = loan.user_token
              WHERE 
               su.verify_status = 'accepted' AND loan.apply_status = 'applied';`


          }else if(which === "rejected"){


               sql = `SELECT 
              bt.*, 
              su.verify_status,
              et.*,
              loan.*
          FROM 
              bio_table bt
          LEFT JOIN 
            sign_up su ON bt.user_token = su.user_token
          LEFT JOIN 
              edu_table et ON bt.user_token = et.user_token
          LEFT JOIN apply_loan loan ON bt.user_token = loan.user_token
              WHERE 
               su.verify_status = 'rejected' AND loan.apply_status = 'applied';`

          }





          
    }

   // 

    
    /* 
CREATE TABLE application_type(

      application_type_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
      application_type VARCHAR(200) NOT NULL,
      token VARCHAR(200) NOT NULL,
      createdAtTime VARCHAR(100),
      createdAtDate VARCHAR(100)

);

  CREATE TABLE apply_loan(

    apply_loan_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    user_token VARCHAR(200) NOT NULL,
    loan_applied VARCHAR(200) NOT NULL,
    loan_type VARCHAR(200) NOT NULL,
    loan_card_token VARCHAR(200) NOT NULL,
    token VARCHAR(200) NOT NULL,
    apply_status VARCHAR(100),
    award_status VARCHAR(100),
    createdAtTime VARCHAR(100),
    createdAtDate VARCHAR(100)
);

 */
    
    db.query(sql,(err,result)=>{
        if(err) return console.log(err.message)
         //    console.log(result)
             res.send(result)
    })


    


}



module.exports = GetApplicantBio_For_Qualification_type