const router = require('express').Router()
const RegisterAdministration = require("../app/dashbord/Administration/register")
// const GetPaidList = require("../app/dashbord/PaidData/GetPaidList")
const GetAdminUsers= require("../app/dashbord/Administration/GetAdminUsers")
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
const {UploadDoc,GetUploadDoc,DeleteUploadDoc} = require("../app/dashbord/uploadDoc/UploadDoc")
const {ApplicantUplaod_Doc,GetUploadDocApplicant} = require("../app/applicants/SignUp/ApplicantUplaod_Doc")
const GetAllApplicant = require("../app/dashbord/GetApplicantData/GetAllApplicant")
const Get_By_Qualification_Type = require("../app/dashbord/GetApplicantData/Get_By_Qualification_Type")
const {UploadDocument,GetUploadDocumentByUserToken} = require("../app/applicants/SignUp/UploadDoc/UploadDocument")
const HandleDoc_uplaod = require("../handleFile/HandleDoc_uplaod")
const removeScholarship = require("../app/dashbord/Scholarship/Remove_Scholarship")
const ApplyScholarship = require("../app/applicants/SignUp/apply_scholarship/ApplyScholarship")
const {GetScholarshipAppliedList,GetScholarshipAppliedList_for_my_app} = require("../app/applicants/SignUp/apply_scholarship/GetScholarshipAppliedList")
const GetApplicantBio_For_Qualification_type = require("../app/applicants/GetData/GetApplicantBio_For_Qualification_type")
const HandleVerify  = require("../app/dashbord/handleverify/HandleVerify")
const HandleVerifyDone_Return = require("../app/dashbord/handleverify/HandleVerifyDone_Return")
const HandleSelect = require("../app/dashbord/handleverify/HandleSelect")
const GetList_for_award = require("../app/dashbord/award/GetList_for_award")
const RemoveApplicant = require("../app/applicants/delete/RemoveApplicant")



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
// bank_details_update
router.put("/bank_details_update",UpdateBankDetails)
// UploadDoc
router.post("/upload_doc",UploadDoc)   
// applicant upload document
router.post("/applicant_upload_doc",ApplicantUplaod_Doc).get("/get_upload_doc/:user_token",GetUploadDoc)
// GetAllApplicant
router.get("/get_all_applicant",GetAllApplicant)
// get udergraduate or post graduate , , used the GetuploadDoc from uploadDoc
router.get("/get_by_qualification_type/:type",Get_By_Qualification_Type).get("/get_upload_doc",GetUploadDoc).delete("/delete_upload_doc/:id",DeleteUploadDoc)
// UploadDocument from applicant
router.post("/upload_document_applicant",HandleDoc_uplaod.single('file'),UploadDocument).get("/get_upload_document_by_user_token/:user_token/:qualification_type/:ref_doc_token",GetUploadDocumentByUserToken)
// apply_scholarship
router.post("/apply_scholarship",ApplyScholarship)
// GetScholarshipAppliedList
router.get("/get_cholarship_applied_list/:user_token/:token",GetScholarshipAppliedList)
 // GetScholarshipAppliedList_for_my_app
router.get("/get_cholarship_applied_list_for_my_app/:user_token",GetScholarshipAppliedList_for_my_app)
// GetApplicantBio_For_Undergraduate
router.get("/get_applicantBio_for_qualification_type/:qualificationType/:type",GetApplicantBio_For_Qualification_type)
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










module.exports = router