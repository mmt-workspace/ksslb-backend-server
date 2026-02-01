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
              loan.*,
               loan_step.*
          FROM 
              bio_table bt
          LEFT JOIN 
            sign_up su ON bt.user_token = su.user_token
          LEFT JOIN 
              edu_table et ON bt.user_token = et.user_token
          LEFT JOIN loan_steps loan_step ON bt.user_token = loan_step.user_token
          LEFT JOIN apply_loan loan ON bt.user_token = loan.user_token
              WHERE 
         su.verify_status = 'accepted' AND loan.apply_status = 'applied' AND loan_step.ut_letter IS NULL;`
//   insert into loan_steps(verification,approval,bank_review,user_token) values('verified','approved','accepted','7tKJJT30laTXN6g190');

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




        if(type === "disbursement"){
  
          // not working yet
          if(which === "Disbursement_sent"){
             sql = `SELECT 
                bt.*, 
                su.verify_status,
                et.*,
                loan.*,
                loan_step.*
            FROM 
                bio_table bt
            LEFT JOIN 
                sign_up su ON bt.user_token = su.user_token
            LEFT JOIN 
                edu_table et ON bt.user_token = et.user_token
            LEFT JOIN apply_loan loan ON bt.user_token = loan.user_token
            LEFT JOIN loan_steps loan_step ON bt.user_token = loan_step.user_token
            WHERE 
                su.verify_status = 'accepted' 
                AND loan.apply_status = 'applied' 
                AND loan_step.ut_letter = 'ut_letter_done' 
                AND loan_step.disbursment = 'approved_disbursement';`

          }else if(which === "disburs"){

            sql = `SELECT 
                bt.*, 
                su.verify_status,
                et.*,
                loan.*,
                loan_step.*
            FROM 
                bio_table bt
            LEFT JOIN 
                sign_up su ON bt.user_token = su.user_token
            LEFT JOIN 
                edu_table et ON bt.user_token = et.user_token
            LEFT JOIN apply_loan loan ON bt.user_token = loan.user_token
            LEFT JOIN loan_steps loan_step ON bt.user_token = loan_step.user_token
            WHERE 
                su.verify_status = 'accepted' 
                AND loan.apply_status = 'applied' 
                AND loan_step.ut_letter = 'ut_letter_done';`

 

          }else if(which === "rejected"){

                  // not working yet
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




     if(type === "dispute"){
  

          if(which === "get_dispute"){

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
               su.verify_status = 'disqualified' AND loan.apply_status = 'applied';`
  


          }


    }




    
    
    db.query(sql,(err,result)=>{
        if(err) return console.log(err.message)
         //    console.log(result)
        
       // console.log(result)
             res.send(result)
    })



    
}






Count_ApplicantBio_For_Qualification_type = (req,res)=>{


       

    // verified sql
    const  returned_by_approversql = `SELECT 
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


  const   returnedsql = `SELECT 
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





               // sql query function
            
        db.query(returnedsql,(err,result1)=>{


                if(err) console.log(err.message)



          db.query(returned_by_approversql,(err,result2)=>{


                if(err) console.log(err.message)


                    const Returned = result1.length
                    const returned_by_approver = result2.length

                    res.send({
                        Returned,
                        returned_by_approver
                    })



        })


        })

















}



module.exports = {GetApplicantBio_For_Qualification_type,Count_ApplicantBio_For_Qualification_type}