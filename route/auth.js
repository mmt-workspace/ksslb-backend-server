const router = require('express').Router()
const RegisterAdministration = require("../app/dashbord/Administration/register")
const GetPaidList = require("../app/dashbord/PaidData/GetPaidList")
const GetAdminUsers= require("../app/dashbord/Administration/GetAdminUsers")
const CheckEmail = require("../app/dashbord/Administration/CheckEmail")
const CheckMobile = require("../app/dashbord/Administration/CheckMobile")
const Amount = require("../app/dashbord/Amount/Amount")
const GetAmount = require("../app/dashbord/Amount/GetAmount")
const GetLogs = require("../app/dashbord/TrackUser/GetLogs")
const GetBio = require("../app/applicants/GetData/GetBio")
const DemographyUpdate = require("../app/applicants/SignUp/UpdateCredentials/Demography")
const ParentUpdate = require("../app/applicants/SignUp/UpdateCredentials/ParentUpdate")
const UpdateEdu = require("../app/applicants/SignUp/UpdateCredentials/UpdateEdu")





// Rigister admin users and admin
router.post("/register_administration",CheckEmail,CheckMobile,RegisterAdministration)
// Get all Admin user info
router.get("/get_admin_users",GetAdminUsers)
// Get All Payment
router.get("/get_paid_list",GetPaidList)
// Amount 
router.post("/send_amount",Amount)
// Get amount data
router.get("/get_amount",GetAmount)
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


















module.exports = router