/* Database name */
CREATE DATABASE ksslb;

USE ksslb;

/* 
Computer password: ksslb@admin
server password : ksslb@Admin@@
 */

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
       passcode VARCHAR(200) DEFAULT "no",
       lock_acc BOOLEAN DEFAULT 0, 
       signupDate DATETIME DEFAULT CURRENT_TIMESTAMP
);


/* JWT Table */

CREATE TABLE jwt(

   jwt_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
   token VARCHAR(200),
   jwt text
);



/* Set Scholarship */
CREATE TABLE Set_scholarship(

       Set_scholarship_id int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
       scholarship_name VARCHAR(200) NOT NULL, 
       scholarship_type VARCHAR(200) NOT NULL, 
       qualification_type VARCHAR(200) NOT NULL, 
       resdential_type VARCHAR(200) NOT NULL, 
       scholarship_description TEXT,
       will_pay VARCHAR(50) NOT NULL,
       amount_to_pay DOUBLE DEFAULT 0.00,
       schl_token VARCHAR(200) NOT NULL,
       createdAtTime  VARCHAR(100),
       createdAtDate VARCHAR(100)
);


/* Set loan */

CREATE TABLE Set_loan(

       set_loan_id int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
       loan_name VARCHAR(200) NOT NULL, 
       loan_type VARCHAR(200) NOT NULL, 
       qualification_type VARCHAR(200) NOT NULL, 
       residential_type VARCHAR(200) NOT NULL, 
       loan_description TEXT,
       will_pay VARCHAR(50) NOT NULL,
       amount_to_pay DOUBLE DEFAULT 0.00,
       token VARCHAR(200) NOT NULL,
       bank_name VARCHAR(200) NOT NULL,
       createdAtTime  VARCHAR(100),
       createdAtDate VARCHAR(100)
);


/* add bank */

CREATE TABLE addbank(

        addbank_id int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
        bank_name VARCHAR(200) NOT NULL,
        bank_token VARCHAR(200) NOT NULL,   
        bank_address VARCHAR(200) NOT NULL, 
        bank_terms text NOT NULL,   
        bank_branch VARCHAR(200) NOT NULL,  
        agent_phone_number VARCHAR(200) NOT NULL,  
        bank_email  VARCHAR(200) NOT NULL,  
        createdAtTime  VARCHAR(100),
        createdAtDate VARCHAR(100)      

);

/*  Track and Record Login */
/* CREATE TABLE WatchSignSignOut(

        WatchSignSignOut_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
        user_token VARCHAR(200) NOT NULL,
        email VARCHAR(200) NOT NULL,
        login_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        logout_data VARCHAR(200)

); */



/* Register account */
/* CREATE TABLE register_list(

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
 */

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

/* CREATE TABLE amount_to_pay(
        
        amount_to_pay_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
        amount DOUBLE NOT NULL,
        qualification_type VARCHAR(200) NOT NULL,
        amount_token VARCHAR(200) NOT NULL,
        registerDate DATETIME DEFAULT CURRENT_TIMESTAMP
           
); */

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
        verify_status VARCHAR(100) DEFAULT "Not Verified",
        verifier_token VARCHAR(200),
        pswrd VARCHAR(200) NOT NULL,
        user_token VARCHAR(200) NOT NULL,
        signupDate DATETIME DEFAULT CURRENT_TIMESTAMP   

 );

 /* generate code */

 CREATE TABLE generateCode(
      generateCode_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
      user_token VARCHAR(200) NOT NULL,
      email VARCHAR(200) NOT NULL,
      generated_code VARCHAR(200) NOT NULL
 );

 /* loan steps */
CREATE TABLE loan_steps(

      loan_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
      verification VARCHAR(200),
      approval VARCHAR(200),
      bank_review VARCHAR(200),
      accept_offer VARCHAR(200),
      open_account VARCHAR(200),
      letter_status VARCHAR(200),
      ut_letter VARCHAR(200),
      ap_letter VARCHAR(200),
      disbursment VARCHAR(200),
      done VARCHAR(200),
      expiry VARCHAR(200),
      user_token VARCHAR(200),
      createdAtTime VARCHAR(100),
      createdAtDate VARCHAR(100)
);

/* scholarships steps */

CREATE TABLE scholarship_steps(
     
      scholarship_steps_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
      verification VARCHAR(200),
      reviewer VARCHAR(200),
      selection VARCHAR(200),
      award VARCHAR(200),
      disbursment VARCHAR(200),
      done VARCHAR(200),
      expiry VARCHAR(200),
      createdAtTime VARCHAR(100),
      createdAtDate VARCHAR(100)

);

/* Bio */
 CREATE TABLE bio_table (

        bio_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
        fname VARCHAR(200) NOT NULL,
        md_name VARCHAR(200),
        lname VARCHAR(200) NOT NULL,
        mobileNumber VARCHAR(200) NOT NULL,
        gender VARCHAR(100) NOT NULL,
        marital_status VARCHAR(100) NOT NULL,
        unread_status VARCHAR(100) DEFAULT "read",
        d_o_b VARCHAR(100) NOT NULL,
        resdential_type VARCHAR(100) NOT NULL,
        picture VARCHAR(200),
        user_token VARCHAR(200) NOT NULL,
        valuePer int DEFAULT 0,
        signupDate DATETIME DEFAULT CURRENT_TIMESTAMP ,
        UpdateDate DATETIME      

);

/* alter *//* 
alter table bio_table add column   unread_status VARCHAR(200) DEFAULT "read"; */

/* Demography */
CREATE TABLE demography_table (
    
    demography_table_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    state_of_origin VARCHAR(100),
    local_gov VARCHAR(100),
    home_address VARCHAR(100),
    city_town VARCHAR(100),
    user_token VARCHAR(200) NOT NULL,
    valuePer int DEFAULT 0,
    signupDate DATETIME DEFAULT CURRENT_TIMESTAMP ,
    UpdateDate DATETIME

);


CREATE TABLE social_media_table(

    social_media_table_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    facebook_handle VARCHAR(100),
    twitter_handle VARCHAR(100),
    instergram_handle VARCHAR(100),
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
     university VARCHAR(100),
     faculty VARCHAR(100),
     deparment VARCHAR(100),
     current_level VARCHAR(100),
     gpa VARCHAR(100),
     user_token VARCHAR(200) NOT NULL,
     valuePer int DEFAULT 0,
     applying_for_type VARCHAR(100),
     year_of_admission VARCHAR(100),
     year_of_graduation VARCHAR(100),
     course_of_study VARCHAR(100),
     nelfund_status VARCHAR(100),
     nelfund_indicator VARCHAR(100),
     signupDate DATETIME DEFAULT CURRENT_TIMESTAMP ,
     UpdateDate DATETIME

);


alter table edu_table add column  manual_university  VARCHAR(100);
alter table edu_table add column  manual_university_state VARCHAR(100);


/* Bank Details */
CREATE TABLE bank_details(

    bank_details_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    bank_name VARCHAR(100),
    account_name VARCHAR(100),
    account_number VARCHAR(100),
    nin_number VARCHAR(100),
    bvn_number VARCHAR(100),
    tin_number VARCHAR(100),
    user_token VARCHAR(200) NOT NULL,
    valuePer int DEFAULT 0,
    signupDate DATETIME DEFAULT CURRENT_TIMESTAMP ,
    UpdateDate DATETIME
);


 
 /*  */

 CREATE TABLE IF NOT EXISTS applicant_credentials(

   applicant_credentials_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
   s_i_d int NOT NULL,
   user_token VARCHAR(200) NOT NULL,
   verify_email VARCHAR(200) DEFAULT "not verify",
   verify_number VARCHAR(200) DEFAULT "not verify"

);

/* Applicant Doc */

CREATE TABLE applicant_doc(

    applicant_doc_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    document_type_name VARCHAR(200) NOT NULL,
    document_file_name VARCHAR(200) NOT NULL,
    residential_type VARCHAR(200),
    ref_doc_token VARCHAR(200),
    qualification_type VARCHAR(200),
    upload_status VARCHAR(100),
    verify_status VARCHAR(50),
    rejectionReason VARCHAR(200),
    user_token VARCHAR(200),
    file_token VARCHAR(200),
    createdAtTime VARCHAR(100),
    createdAtDate VARCHAR(100)
);

/* new 28  Nov */
alter table applicant_doc add column reupload_status VARCHAR(200) DEFAULT "new";

/* Reject Message */
CREATE TABLE IF NOT EXISTS rejectmsg (

    id INT AUTO_INCREMENT PRIMARY KEY,
    applicant_token VARCHAR(255) NOT NULL,
    document_token VARCHAR(255) NOT NULL,
    verifier_token VARCHAR(255),
    mssg TEXT,
    insertdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);


DELIMITER $$

CREATE TRIGGER after_applicant_doc_insert
AFTER INSERT ON applicant_doc
FOR EACH ROW
BEGIN
    INSERT INTO rejectmsg (applicant_token, document_token)
    VALUES (NEW.user_token, NEW.file_token);
END $$

DELIMITER ;


  /* apply scholarship */
  CREATE TABLE apply_scholarship(

    apply_scholarship_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    user_token VARCHAR(200) NOT NULL,
    scholarship_applied VARCHAR(200) NOT NULL,
    scholarship_type VARCHAR(200) NOT NULL,
    schl_token VARCHAR(200) NOT NULL,
    token VARCHAR(200) NOT NULL,
    apply_status VARCHAR(100),
    award_status VARCHAR(100),
    createdAtTime VARCHAR(100),
    createdAtDate VARCHAR(100)
    
);

/* Loan SQL */



/* Loan request */
CREATE TABLE loan_requests (

  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  loan_amount DECIMAL(18,2) NOT NULL DEFAULT 0.00,
  tenor TINYINT UNSIGNED NOT NULL DEFAULT 1,
  net_monthly_income DECIMAL(18,2) NOT NULL DEFAULT 0.00,
  loan_category VARCHAR(100),
  token VARCHAR(200) NOT NULL,
  program_type VARCHAR(200) DEFAULT "not selected",
  valuePer int DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CHECK (tenor BETWEEN 1 AND 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/* Loan requests Dec 20 2025 done */
alter table loan_requests add column program_type VARCHAR(200) DEFAULT "not selected";


loan_requestsALTER TABLE loan_requests  MODIFY tenor TINYINT UNSIGNED NOT NULL DEFAULT 1;
ALTER TABLE loan_requests
DROP CONSTRAINT loan_requests_chk_1;

/* sponsor identification */

CREATE TABLE sponsorIdentification (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100),
  middle_name VARCHAR(100),
  surname VARCHAR(100),
  date_of_birth VARCHAR(100),
  gender ENUM('Male', 'Female','not selected'),
  marital_status VARCHAR(20),
  phone_no_1 VARCHAR(20),
  phone_no_2 VARCHAR(20),
  email VARCHAR(150),
  number_of_dependants INT,
  mother_maiden_name VARCHAR(150),
  bvn VARCHAR(20),
  nin_number VARCHAR(20),
  tin_number VARCHAR(20),
  token VARCHAR(200),
  valuePer  int DEFAULT 0,
  billing_address TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/* Spouse Details */


CREATE TABLE spouse_details (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100),
  middle_name VARCHAR(100),
  surname VARCHAR(100),
  office_address TEXT ,
  phone_no_1 VARCHAR(20),
  phone_no_2 VARCHAR(20),
  email VARCHAR(150),
  token VARCHAR(200),
  valuePer  int DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


/* resdential address */
CREATE TABLE residentialAddress (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  residential_address TEXT,
  residential_status  VARCHAR(150),
  years_in_apartment  VARCHAR(150),
  nearest_landmark VARCHAR(200),
  profession VARCHAR(150),
  profession_type  VARCHAR(150),
  position  VARCHAR(150),
  token VARCHAR(200),
  valuePer  int DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



/* employmentDetails */

CREATE TABLE employment_details (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  employer_name VARCHAR(200),
  employer_address TEXT,
  year_of_confirmation YEAR,
  gross_annual_income DECIMAL(18,2),
  psn_ippis VARCHAR(100),
  year_of_retirement YEAR,
  net_monthly_income DECIMAL(18,2),
  grade_level VARCHAR(50),
  salary_payment_date TINYINT UNSIGNED CHECK (salary_payment_date BETWEEN 1 AND 31),
  employee_id VARCHAR(100),
  qualification VARCHAR(150),
  token VARCHAR(200),
  valuePer  int DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;




/* salary bank details */

CREATE TABLE salary_bank_details (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  account_name VARCHAR(200),
  bank VARCHAR(150),
  account_number VARCHAR(20),
  account_type VARCHAR(50),
  token VARCHAR(200),
  valuePer  int DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;




/* Personel Reference */
CREATE TABLE personal_references (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,

  -- First Referee
  first_ref_first_name VARCHAR(100),
  first_ref_middle_name VARCHAR(100),
  first_ref_surname VARCHAR(100),
  first_ref_relationship VARCHAR(100),
  first_ref_address TEXT,
  first_ref_phone_no_1 VARCHAR(20),
  first_ref_phone_no_2 VARCHAR(20),
  first_ref_email VARCHAR(150),

  -- Second Referee
  second_ref_first_name VARCHAR(100),
  second_ref_middle_name VARCHAR(100),
  second_ref_surname VARCHAR(100),
  second_ref_relationship VARCHAR(100),
  second_ref_address TEXT,
  second_ref_phone_no_1 VARCHAR(20),
  second_ref_phone_no_2 VARCHAR(20),
  second_ref_email VARCHAR(150),

  token VARCHAR(200),
  valuePer  int DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



/* Guarantor details */
CREATE TABLE guarantor_details (

  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100),
  middle_name VARCHAR(100),
  surname VARCHAR(100),
  date_of_birth VARCHAR(100),
  gender VARCHAR(10),
  phone_no_1 VARCHAR(20),
  phone_no_2 VARCHAR(20),
  marital_status VARCHAR(20),
  email VARCHAR(150),
  psn_no VARCHAR(100),
  mother_maiden_name VARCHAR(150),
  account_name VARCHAR(200),
  account_number VARCHAR(20),
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



/* apply loan */
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

/* Credit Search */
CREATE TABLE credit_search(

      credit_search_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
      user_token VARCHAR(200) NOT NULL,
      search_status VARCHAR(100) DEFAULT "not searched",
       credit_file VARCHAR(200),
       token VARCHAR(200) NOT NULL,
       credit_comment TEXT,
      createdAtTime VARCHAR(100),
      createdAtDate VARCHAR(100)

);



/* Send mssg */

CREATE TABLE send_mssg(

      send_mssg_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
      sender_token VARCHAR(200) NOT NULL,
      receiver_token VARCHAR(200) NOT NULL,
      mssg_subject VARCHAR(200) NOT NULL,
      mssg_body TEXT NOT NULL,
      mssg_status VARCHAR(100) DEFAULT "unread",
      createdAtTime VARCHAR(100),
      createdAtDate VARCHAR(100)

);




/* acknowledgment */


CREATE TABLE acknowledgment (

      ack_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
      mssg VARCHAR(100),
      user_token VARCHAR(200) NOT NULL,
      ack_status VARCHAR(100) DEFAULT "unread",
      createdAtTime VARCHAR(100),
      createdAtDate VARCHAR(100)

);

/* inprinciple offer  continue on this offer section, dec 20 25 done */
CREATE TABLE inprinciple_offer (

     inprinciple_offer_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
     loan_processed_for VARCHAR(200),
     Sponsor   VARCHAR(200),
     Student  VARCHAR(200),
     Amount_Requested  VARCHAR(200),
     Amount_Requested_Tenor  VARCHAR(200),
     Amount_Offered  VARCHAR(200),
     Amount_Offered_Tenor  VARCHAR(200),
     Credit_Report  VARCHAR(200),
     Credit_Status VARCHAR(200),
     did_accept  VARCHAR(200) DEFAULT "not_yet",
     bank_reviewer_token  VARCHAR(200) not null ,
     offer_status  VARCHAR(200) DEFAULT "not_yet",
     user_token VARCHAR(200),
     token VARCHAR(200),
      createdAtTime VARCHAR(100),
      createdAtDate VARCHAR(100)
);

/* dec 20 25 done */
alter table inprinciple_offer add column guarantor VARCHAR(200);
alter table inprinciple_offer add column loan_category VARCHAR(200);
alter table inprinciple_offer add column program_type VARCHAR(200);
alter table inprinciple_offer add column reasons TEXT;

/* dec 30 25 done */
CREATE TABLE disbursement_requests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_token VARCHAR(255) UNIQUE NOT NULL,
    clientName VARCHAR(255),
    disbursementStudentName VARCHAR(255),
    disbursementAmountText VARCHAR(255),
    paymentType VARCHAR(50),
    isInternational BOOLEAN,
    hasOthers BOOLEAN,
    loanbank_account_number VARCHAR(255),
    a_studentName VARCHAR(255),
    a_accountName VARCHAR(255),
    a_amount VARCHAR(255),
    a_level VARCHAR(255),
    a_remita VARCHAR(255),
    b_studentName VARCHAR(255),
    b_amount VARCHAR(255),
    b_bank VARCHAR(255),
    b_course VARCHAR(255),
    b_level VARCHAR(255),
    b_matricNo VARCHAR(255),
    b_schoolAccountName VARCHAR(255),
    b_schoolName VARCHAR(255),
    c_studentName VARCHAR(255),
    c_bank VARCHAR(255),
    c_branch VARCHAR(255),
    c_course VARCHAR(255),
    c_iban VARCHAR(255),
    c_level VARCHAR(255),
    c_matricNo VARCHAR(255),
    c_schoolAccountName VARCHAR(255),
    c_schoolName VARCHAR(255),
    c_swift VARCHAR(255),
    oth_accNo VARCHAR(255),
    oth_amount VARCHAR(255),
    oth_bank VARCHAR(255),
    oth_name VARCHAR(255),
    sk_accNo VARCHAR(255),
    sk_amount VARCHAR(255),
    sk_bank VARCHAR(255),
    sk_centre VARCHAR(255),
    sk_centreAcc VARCHAR(255),
    up_accNo VARCHAR(255),
    up_amount VARCHAR(255),
    up_bank VARCHAR(255),
    up_name VARCHAR(255),
    createdAtTime VARCHAR(50),
    createdAtDate VARCHAR(50),
    updatedAtTime VARCHAR(50),
    updatedAtDate VARCHAR(50)
);


DELIMITER $$

CREATE TRIGGER after_applicant_bio_insert
AFTER INSERT ON bio_table
FOR EACH ROW
BEGIN
    INSERT INTO acknowledgment (user_token)
    VALUES (NEW.user_token);
END $$

DELIMITER ;



/* Set Document  */

CREATE TABLE upload_doc(

          upload_doc_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
          document_type_name VARCHAR(200) NOT NULL,
          resdentialType VARCHAR(200) NOT NULL,
          documentType VARCHAR(200) NOT NULL,
          document_for VARCHAR(200) NOT NULL,
          loan_category VARCHAR(200),
          upload_for VARCHAR(200),
          visibility VARCHAR(200),
          instrct VARCHAR(500) NOT NULL,
          upload_status VARCHAR(100),
          doc_token VARCHAR(200),
          createdAtTime VARCHAR(100),
          createdAtDate VARCHAR(100)

);


/* Add university */
/* 
 institutionCategory: "",
    phone_number: "",
    email: "",
    website: "",
    address: "",
    accreditation: "",
    courses_offered: "",
    about_institution: "",
    other_institution: ""
 */


CREATE TABLE add_university(
      
      add_university_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
      university_name VARCHAR(200) NOT NULL,
      state_of_location VARCHAR(200) ,
      local_government VARCHAR(200) ,
      foreign_or_local VARCHAR(200) ,
        institutionCategory VARCHAR(200) ,
        phone_number VARCHAR(200) ,
        email VARCHAR(200) ,
        website VARCHAR(200) ,
        ins_address VARCHAR(200) ,
        accreditation VARCHAR(200) ,
        courses_offered TEXT ,
        about_institution TEXT ,
        other_institution TEXT,
      token VARCHAR(200) ,
      createdAtTime VARCHAR(100),
      createdAtDate VARCHAR(100)
      
);



/* set_limit_scholarship  */
CREATE TABLE set_limit_scholarship(

      set_limit_scholarship_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
      set_limit  VARCHAR(200)
);

INSERT INTO set_limit_scholarship(set_limit) VALUES(0);

/* application_type */

CREATE TABLE application_type(

      application_type_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
      application_type VARCHAR(200) NOT NULL,
      token VARCHAR(200) NOT NULL,
      createdAtTime VARCHAR(100),
      createdAtDate VARCHAR(100)

);

/* count visitor */

 CREATE TABLE IF NOT EXISTS visitors (

    id INT AUTO_INCREMENT PRIMARY KEY,
    ip_address VARCHAR(45),
    visit_date  VARCHAR(45)

  );

/* new */

CREATE TABLE uploaded_files (

  id INT AUTO_INCREMENT PRIMARY KEY,
  file_token VARCHAR(255) NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  instructions TEXT NOT NULL,
  loan_category VARCHAR(255) NOT NULL,
  action VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  user_token VARCHAR(255) DEFAULT NULL
  
);


/* 
drop table  Set_scholarship ;
drop table  Set_loan ;
drop table  addbank ;
drop table  details ;
drop table  register_attempt_list ;
drop table  Validation ;
drop table  track_activity ;
drop table  sign_up ;
drop table  generateCode ;
drop table  loan_steps ;
drop table  scholarship_steps ;
drop table  bio_table ;
drop table  demography_table ;
drop table  social_media_table ;
drop table  parent_table ;
drop table  edu_table ;
drop table  bank_details ;
drop table  applicant_credentials ;
drop table  rejectmsg ;
drop table  apply_scholarship ;
drop table  loan_requests ;
drop table  sponsorIdentification ;
drop table  spouse_details ;
drop table  residentialAddress ;
drop table  employment_details ;
drop table  salary_bank_details ;
drop table  personal_references ;
drop table  guarantor_details ;
drop table  apply_loan ;
drop table  send_mssg ;
drop table  acknowledgment ;
drop table  upload_doc ;
drop table  add_university ;
drop table  set_limit_scholarship ;
drop table  application_type ;
drop table  visitors ;
 */