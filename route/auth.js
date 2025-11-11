const router = require('express').Router()
const RegisterAdministration = require("../app/dashbord/Administration/register")
// const GetPaidList = require("../app/dashbord/PaidData/GetPaidList")
const {GetAdminUsers,GetDataForSingleAdmin}= require("../app/dashbord/Administration/GetAdminUsers")
const CheckEmail = require("../app/dashbord/Administration/CheckEmail")
const CheckMobile = require("../app/dashbord/Administration/CheckMobile")
const SetScholarship = require("../app/dashbord/Scholarship/SetScholarship")
const get_scholarship_list_applicant = require("../app/dashbord/Scholarship/get_scholarship_list_applicant")
const GetLogs = require("../app/dashbord/TrackUser/GetLogs")
const GetBio = require("../app/applicants/GetData/GetApplicantData")
const DemographyUpdate = require("../app/applicants/SignUp/UpdateCredentials/Demography")
const ParentUpdate = require("../app/applicants/SignUp/UpdateCredentials/ParentUpdate")
const UpdateEdu = require("../app/applicants/SignUp/UpdateCredentials/UpdateEdu")
const UpdateBankDetails = require("../app/applicants/SignUp/UpdateCredentials/UpdateBankDetails")
const {UploadDoc,GetUploadDoc,GetUploadDocForApplicantSection,DeleteUploadDoc} = require("../app/dashbord/uploadDoc/UploadDoc")
const {ApplicantUplaod_Doc,GetUploadDocApplicant, RejectMssgApplicantDoc,GetRejectMssgApplicantDoc} = require("../app/applicants/SignUp/ApplicantUplaod_Doc")
const GetAllApplicant = require("../app/dashbord/GetApplicantData/GetAllApplicant")
const Get_By_Qualification_Type = require("../app/dashbord/GetApplicantData/Get_By_Qualification_Type")
const {UploadDocument,GetUploadDocumentByUserToken} = require("../app/applicants/SignUp/UploadDoc/UploadDocument")
const HandleDoc_uplaod = require("../handleFile/HandleDoc_uplaod")
const removeScholarship = require("../app/dashbord/Scholarship/Remove_Scholarship")
const ApplyScholarship = require("../app/applicants/SignUp/apply_scholarship/ApplyScholarship")
const {GetScholarshipAppliedList,GetScholarshipAppliedList_for_my_app} = require("../app/applicants/SignUp/apply_scholarship/GetScholarshipAppliedList")
const GetApplicantBio_For_Qualification_type = require("../app/applicants/GetData/GetApplicantBio_For_Qualification_type")
const {HandleVerify}  = require("../app/dashbord/handleverify/HandleVerify")
const HandleVerifyDone_Return = require("../app/dashbord/handleverify/HandleVerifyDone_Return")
const HandleSelect = require("../app/dashbord/handleverify/HandleSelect")
const GetList_for_award = require("../app/dashbord/award/GetList_for_award")
const RemoveApplicant = require("../app/applicants/delete/RemoveApplicant")
const {Logout} = require("../auth/jwt")
const {AddUniversity,GetUniversities,DeleteUniversity} = require("../app/dashbord/settings/AddUniversity")
const {LimitScholarship,GetLimitScholarship} = require("../app/dashbord/settings/LimitScholarship")
const {GetAppType,UpdateAppType} = require("../app/applicants/SignUp/application_type")
const SocialMedia = require("../app/applicants/SignUp/UpdateCredentials/SocialMedia")
const GetLoanData = require("../app/applicants/GetData/GetLoanData")
const {MssgNotfier,GetMssgNotfier} = require("../app/dashbord/handleverify/MssgNotfier")
const {Acknowledgment,GetAcknowledgment,CheckifAllinputFilled} = require("../app/applicants/SignUp/acknowledgment")
const HandlePicture = require("../handleFile/HandlePicture")
const {UploadPic} = require("../app/applicants/SignUp/Bio")
const SetLoan = require("../app/dashbord/loan/SetLoan")
const {AddBank,Get_Bank} = require("../app/dashbord/settings/bank/Bank")
const get_loan_list = require("../app/dashbord/loan/get_loan_list")
const Remove_Loan = require("../app/dashbord/loan/Remove_Loan")
const {ApplyLoan,GetloanAppliedList,GetLoanAppliedList_for_my_app} = require("../app/applicants/SignUp/applyloan/ApplyLoan")
const {GenerateCode,VerifyAccount,Check_if_Verify} = require("../app/applicants/SignUp/VerifyAccount")
const UpdateBio = require("../app/applicants/SignUp/UpdateCredentials/UpdateBio")
const Check_if_all_inputs_are_set = require("../app/applicants/SignUp/Check_if_all_inputs_are_set")
const {Check_if_fill_all_before_apply} = require("../app/applicants/SignUp/applyloan/Check_if_fill_all_before_apply")
const Check_If_all_files_are_provided = require("../app/applicants/SignUp/Check_If_all_files_are_provided")

 
// loan section
const updateloanRequest = require("../app/applicants/SignUp/loan/update/updateloanRequest")
const updateSponsorIdentification = require("../app/applicants/SignUp/loan/update/updateSponsorIdentification")
const updateResdentialAddress = require("../app/applicants/SignUp/loan/update/updateResdentialAddress")
const updateSpouseDetails  = require("../app/applicants/SignUp/loan/update/updateSpouseDetails")
const updateemploymentDetails = require("../app/applicants/SignUp/loan/update/updateemploymentDetails")
const updatesalaryBankDetails = require("../app/applicants/SignUp/loan/update/updatesalaryBankDetails")
const updatePersonelReference = require("../app/applicants/SignUp/loan/update/updatePersonelReference")
const updateGuarantorDetails  = require("../app/applicants/SignUp/loan/update/updateGuarantorDetails")



// Rigister admin users and admin
router.post("/register_administration",CheckEmail,CheckMobile,RegisterAdministration)
// Get all Admin user info
router.get("/get_admin_users",GetAdminUsers)
// Get All Payment
// router.get("/get_paid_list",GetPaidList)
// Amount 
router.post("/add_scholarship",SetScholarship)
// removeScholarship
router.delete("/remove_scholarship/:token",removeScholarship)  
// Get amount data
router.get("/get_scholarship_list_applicant",get_scholarship_list_applicant)
// Get Logs report data
router.get("/get_logs_report_data",GetLogs)
// Get Bio
router.get("/get_bio/:user_token",GetBio)
// Update Democratic form  
router.put("/demography_update",DemographyUpdate)
// Update Prent form
router.put("/parent_update",ParentUpdate)
// Update Education 
router.put("/edu_update",UpdateEdu)
// Update Social Media
router.put("/social_media_update",SocialMedia)
// bank_details_update
router.put("/bank_details_update",UpdateBankDetails)
// UploadDoc
router.post("/upload_doc",UploadDoc)   
// applicant upload document
router.post("/applicant_upload_doc",ApplicantUplaod_Doc).get("/get_upload_doc/:user_token",GetUploadDoc).get("/get_upload_doc_applicant_section/:document_for",GetUploadDocForApplicantSection)
// GetAllApplicant
router.get("/get_all_applicant",GetAllApplicant)
// get udergraduate or post graduate , , used the GetuploadDoc from uploadDoc
router.get("/get_by_qualification_type/:type",Get_By_Qualification_Type).get("/get_upload_doc",GetUploadDoc).delete("/delete_upload_doc/:id",DeleteUploadDoc)
// UploadDocument from applicant
router.post("/upload_document_applicant",HandleDoc_uplaod.single('file'),CheckDocument,UploadDocument).get("/get_upload_document_by_user_token/:user_token/:qualification_type/:ref_doc_token",GetUploadDocumentByUserToken)
// apply_scholarship
router.post("/apply_scholarship",ApplyScholarship)
// GetScholarshipAppliedList
router.get("/get_cholarship_applied_list/:user_token/:token",GetScholarshipAppliedList)
 // GetScholarshipAppliedList_for_my_app
router.get("/get_cholarship_applied_list_for_my_app/:user_token",GetScholarshipAppliedList_for_my_app)
// GetApplicantBio_For_Undergraduate
router.get("/get_applicantBio_for_qualification_type/:which/:type",GetApplicantBio_For_Qualification_type)
//HandleVerify
router.put("/handle_verify",HandleVerify)  
// HandleVerifyDone_Return
router.put("/handle_verify_done_return",HandleVerifyDone_Return)
// HandleSelect
router.put("/select_applicant",HandleSelect)
// GetList_for_award
router.get("/get_list_for_award/:qualificationType",GetList_for_award)
//RemoveApplicant
router.delete("/remove_applicant/:token",RemoveApplicant)
// add university
router.post("/add_uni",AddUniversity)
// get uni
router.get("/get_uni/:type",GetUniversities)
// delete
router.delete("/delete_uni/:token",DeleteUniversity)
// Logout
router.get("/logout",Logout)
// LimitScholarship
router.put("/limit_scholarship",LimitScholarship)
// GetLimitScholarship
router.get("/get_limit_scholarship",GetLimitScholarship)
// GetAppType
router.get("/get_app_type/:token",GetAppType)
// application_type
router.put("/update_application_type",UpdateAppType)

// RejectMssgApplicantDoc
router.put("/reject_mssg_applicant_doc",RejectMssgApplicantDoc)
// GetRejectMssgApplicantDoc
router.get("/get_reject_mssg_applicant_doc/:applicant_token/:document_token",GetRejectMssgApplicantDoc)
// GetUploadDocApplicant
router.get("/get_upload_doc_applicant/:user_token",GetUploadDocApplicant)
//MssgNotfier
router.post("/mssg_notfier",MssgNotfier)
// GetMssgNotfier
router.get("/get_mssg_notfier/:receiver_token",GetMssgNotfier)
// Acknowledgment
router.put("/acknowledgment",Acknowledgment).get("/acknowledgment/:user_token",GetAcknowledgment)
// UploadPic 
router.put("/upload_picture",HandlePicture.single('file'),UploadPic)
// CheckifAllinputFilled
// router.get("/check_if_all_inputs_fill/:user_token",CheckifAllinputFilled)
// SetLoan
router.post("/set_loan",SetLoan)
// AddBank
router.post("/add_bank",AddBank)
// Get_Bank
router.get("/get_gank",Get_Bank)
 // GetDataForSingleAdmin
router.get("/get_data_for_signle_admin/:user_token",GetDataForSingleAdmin)
 // get_loan_list
router.get("/get_loan_list",get_loan_list)
// Remove_Loan
router.delete("/remove_set_loan/:token",Remove_Loan)
// ApplyLoan
router.post("/apply_loan",ApplyLoan).get("/get_loan_applied_list/:user_token/:loan_card_token",GetloanAppliedList)
.get("/get_loan_applied_list_for_my_app/:user_token",GetLoanAppliedList_for_my_app)
// GenerateCode 
router.get("/generate_code/:usertoken",GenerateCode)
// VerifyAccount
router.get("/verify_code/:user_token/:code",VerifyAccount)
// Check_if_Verify
router.get("/check_if_verify/:user_token",Check_if_Verify)
// UpdateBio
router.put("/bio_update",UpdateBio)
// Check_if_all_inputs_are_set
router.get("/Check_if_all_inputs_are_set/:user_token/:section_list_name",Check_if_all_inputs_are_set)
// Check_if_fill_all_before_apply
router.put("/Check_if_fill_all_before_apply",Check_if_fill_all_before_apply)
// Check_If_all_files_are_provided
router.get("/check_If_all_files_are_provided/:user_token/:loan_category",Check_If_all_files_are_provided)
// loan section


// updateloanRequest
router.get("/get_loan_data/:user_token",GetLoanData)
router.put("/update_loan_request",updateloanRequest)
router.put("/update_sponsor_identification",updateSponsorIdentification)
router.put("/update_spouse_details",updateSpouseDetails)
router.put("/update_resdential_address", updateResdentialAddress)
router.put("/update_employment_details",updateemploymentDetails)
router.put("/update_salary_bank_details",updatesalaryBankDetails)
router.put("/update_personel_reference",updatePersonelReference)
router.put("/update_guarantor_details",updateGuarantorDetails)















module.exports = router