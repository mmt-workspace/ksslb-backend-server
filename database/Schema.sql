/* Database name */
CREATE DATABASE ksslb;



/* Administration account */
CREATE TABLE Administration(

       administration_id  int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL, 
       fname VARCHAR(200) NOT NULL,
       lname VARCHAR(200) NOT NULL,
       email VARCHAR(200) NOT NULL,
       passwrd VARCHAR(200) NOT NULL,
       mobileNumber VARCHAR(200) NOT NULL,
       acct_typ VARCHAR(100) NOT NULL,
       userToken VARCHAR(200) NOT NULL,
       acc_level VARCHAR(200) NOT NULL,
       lock_acc BOOLEAN DEFAULT 0, 
       signupDate DATETIME DEFAULT CURRENT_TIMESTAMP
);


/* JWT Table */

CREATE TABLE jwt(

   jwt_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
   token VARCHAR(200),
   jwt VARCHAR(300)


);



/* Set Amount for the payment */
CREATE TABLE SetAmount(

       set_amount_id int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
       qualification_type VARCHAR(200) NOT NULL, 
       amount DOUBLE NOT NULL,
       acct_typ VARCHAR(100) NOT NULL,
       user_token VARCHAR(200) NOT NULL,
       insertedDate  DATETIME DEFAULT CURRENT_TIMESTAMP
);



/*  Track and Record Login */
CREATE TABLE WatchSignSignOut(

        WatchSignSignOut_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
        user_token VARCHAR(200) NOT NULL,
        email VARCHAR(200) NOT NULL,
        login_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        logout_data VARCHAR(200)

);



/* Register account */
CREATE TABLE register_list(

     register_list_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
     fname VARCHAR(200) NOT NULL,
     lname VARCHAR(200) NOT NULL,
     email VARCHAR(200) NOT NULL,
     mobileNumber VARCHAR(200) NOT NULL,
     user_token VARCHAR(200) NOT NULL,
     Piadstatus BOOLEAN DEFAULT 1,
     amount DOUBLE NOT NULL,
     registerDateDATETIME DATETIME DEFAULT CURRENT_TIMESTAMP
);


/* Details */
CREATE TABLE details(
    
      details_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
      user_token VARCHAR(200) NOT NULL,
      qualification_type VARCHAR(200),
      resdential_Type VARCHAR(200),
      state_of_origin VARCHAR(100) NOT NULL,
      local_gov VARCHAR(200) NOT NULL,
      registerDateDATETIME DATETIME DEFAULT CURRENT_TIMESTAMP

);


/* Attempt register */
CREATE TABLE register_attempt_list(
 
     register_list_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
     fname VARCHAR(200) NOT NULL,
     lname VARCHAR(200) NOT NULL,
     email VARCHAR(200) NOT NULL,
     mobileNumber VARCHAR(200) NOT NULL,
     local_gov VARCHAR(200) NOT NULL,
     user_token VARCHAR(200) NOT NULL,
     Piadstatus BOOLEAN DEFAULT 0,
     amount DOUBLE NOT NULL,
     registerDate DATETIME DEFAULT CURRENT_TIMESTAMP

);

/*  Validation */
CREATE TABLE Validation(

    Validation_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    user_token VARCHAR(200),
    ID VARCHAR(200),
    email VARCHAR(200),
    generatedTokens VARCHAR(300)

);


/* Amount */

CREATE TABLE amount_to_pay(
        
        amount_to_pay_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
        amount DOUBLE NOT NULL,
        qualification_type VARCHAR(200) NOT NULL,
        amount_token VARCHAR(200) NOT NULL,
        registerDate DATETIME DEFAULT CURRENT_TIMESTAMP
           
);

/* Track */

CREATE TABLE track_activity(
        
        track_activity_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
        user_token VARCHAR(200) NOT NULL,
        user_email VARCHAR(200) NOT NULL,
        user_account_tpye VARCHAR(200) NOT NULL,
        message_activity VARCHAR(200) NOT NULL,
        recordedDate DATETIME DEFAULT CURRENT_TIMESTAMP       
);


/* Sign Up table */

CREATE TABLE sign_up(
        
        sign_up_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
        email VARCHAR(200) NOT NULL,
        mobileNumber VARCHAR(200) NOT NULL,
        pswrd VARCHAR(200) NOT NULL,
        user_token VARCHAR(200) NOT NULL,
        signupDate DATETIME DEFAULT CURRENT_TIMESTAMP   

 );


/* Bio */
 CREATE TABLE bio_table (

        bio_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
        fname VARCHAR(200) NOT NULL,
        lname VARCHAR(200) NOT NULL,
        mobileNumber VARCHAR(200) NOT NULL,
        gender VARCHAR(100) NOT NULL,
        d_o_b VARCHAR(100) NOT NULL,
        resdential_type VARCHAR(100) NOT NULL,
        picture VARCHAR(200),
        user_token VARCHAR(200) NOT NULL,
        valuePer int DEFAULT 0,
        signupDate DATETIME DEFAULT CURRENT_TIMESTAMP ,
        UpdateDate DATETIME      

);

/* Demography */
CREATE TABLE demography_table (
    
    demography_table_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    state_of_origin VARCHAR(100),
    local_gov VARCHAR(100),
    home_address VARCHAR(100),
    user_token VARCHAR(200) NOT NULL,
    valuePer int DEFAULT 0,
    signupDate DATETIME DEFAULT CURRENT_TIMESTAMP ,
    UpdateDate DATETIME

);

/* Parent bio */
CREATE TABLE parent_table (
    
    parent_table_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    father_full_name VARCHAR(100),
    mother_full_name VARCHAR(100),
    guardian_valid_mobile VARCHAR(100),
    user_token VARCHAR(200) NOT NULL,
    valuePer int DEFAULT 0,
    signupDate DATETIME DEFAULT CURRENT_TIMESTAMP ,
    UpdateDate DATETIME
);

/* Education Background */
CREATE TABLE edu_table (
    
     edu_table_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
     matric_num VARCHAR(100),
     faculty VARCHAR(100),
     deparment VARCHAR(100),
     gpa VARCHAR(100),
     user_token VARCHAR(200) NOT NULL,
     valuePer int DEFAULT 0,
     applying_for_type VARCHAR(100),
     signupDate DATETIME DEFAULT CURRENT_TIMESTAMP ,
     UpdateDate DATETIME

);


 CREATE TABLE IF NOT EXISTS applicant_credentials(

   applicant_credentials_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
   s_i_d int NOT NULL,
   user_token VARCHAR(200) NOT NULL

)

/* Applicant Doc */

CREATE TABLE applicant_doc(

    applicant_doc_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    document_file_name VARCHAR(200) NOT NULL,
    document_type_name VARCHAR(200) NOT NULL,
    upload_status VARCHAR(100),
    user_token VARCHAR(200),
    file_token VARCHAR(200),
    createdAtTime VARCHAR(100),
    createdAtDate VARCHAR(100)
);

/* Set Document  */

CREATE TABLE upload_doc(

          upload_doc_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
          document_type_name VARCHAR(200) NOT NULL,
          resdentialType VARCHAR(200) NOT NULL,
          documentType VARCHAR(200) NOT NULL,
          instrct VARCHAR(500) NOT NULL,
          upload_status VARCHAR(100),
          doc_token VARCHAR(200),
          createdAtTime VARCHAR(100),
          createdAtDate VARCHAR(100)

);

